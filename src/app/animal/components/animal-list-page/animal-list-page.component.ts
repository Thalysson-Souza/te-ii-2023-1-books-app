import { Component, OnDestroy } from '@angular/core';
import { AlertController, LoadingController, ToastController, ViewDidLeave, ViewWillEnter } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AnimalService } from '../../services/animal.service';
import { AnimalInterface } from '../../types/animal.interface';

@Component({
  selector: 'app-animal-list-page',
  templateUrl: './animal-list-page.component.html',
})
export class AnimalListPageComponent implements ViewWillEnter, ViewDidLeave, OnDestroy {
  animais: AnimalInterface[] = [];
  subscriptions = new Subscription();

  constructor(
    private animalService: AnimalService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
  ) { }

  ionViewDidLeave(): void {
    this.animais = [];
  }

  ionViewWillEnter(): void {
    this.listar();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  async listar() {
    const busyLoader = await this.loadingController.create({ spinner: 'circular' })
    busyLoader.present()

    const subscription = this.animalService.getAnimais()
      .subscribe(async (animais) => {
        this.animais = animais;
        const toast = await this.toastController.create({
          color: 'success',
          message: 'Lista de animais carregada com sucesso!',
          duration: 3000,
          buttons: ['X']
        })
        toast.present()
        busyLoader.dismiss();
      }, async () => {
        const alerta = await this.alertController.create({
          header: 'Erro',
          message: 'Não foi possível carregar a lista de animais',
          buttons: ['Ok']
        })
        alerta.present()
        busyLoader.dismiss();
      });
    this.subscriptions.add(subscription);
  }

  async remove(animal: AnimalInterface) {
    const alert = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o animal ${animal.nome}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.subscriptions.add(
              this.animalService.removeAnimal(animal).subscribe(() => this.listar())
            );
          },
        },
        'Não',
      ],
    });
    alert.present();
  }
}
