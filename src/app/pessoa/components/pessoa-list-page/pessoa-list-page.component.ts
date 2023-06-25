import { Component, OnDestroy } from '@angular/core';
import { AlertController, LoadingController, ToastController, ViewDidLeave, ViewWillEnter } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PessoaService } from '../../services/pessoa.service';
import { PessoaInterface } from '../../types/pessoa.interface';

@Component({
  selector: 'app-pessoa-list-page',
  templateUrl: './pessoa-list-page.component.html',
})
export class PessoaListPageComponent implements ViewWillEnter, ViewDidLeave, OnDestroy {
  pessoas: PessoaInterface[] = [];
  subscriptions = new Subscription();

  constructor(
    private pessoaService: PessoaService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
  ) { }

  ionViewDidLeave(): void {
    this.pessoas = [];
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

    const subscription = this.pessoaService.getPessoas()
      .subscribe(async (pessoas) => {
        this.pessoas = pessoas;
        const toast = await this.toastController.create({
          color: 'success',
          message: 'Lista de pessoas carregada com sucesso!',
          duration: 5000,
          buttons: ['X']
        })
        toast.present()
        busyLoader.dismiss();
      }, async () => {
        const alerta = await this.alertController.create({
          header: 'Erro',
          message: 'Não foi possível carregar a lista de pessoas',
          buttons: ['Ok']
        })
        alerta.present()
        busyLoader.dismiss();
      });
    this.subscriptions.add(subscription);
  }

  async remove(pessoa: PessoaInterface) {
    const alert = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir a pessoa ${pessoa.nome}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.subscriptions.add(
              this.pessoaService.removePessoa(pessoa).subscribe(() => this.listar())
            );
          },
        },
        'Não',
      ],
    });
    alert.present();
  }

  // favorite(autor: AutorInterface) {
  //   const autoresFavoritesLocalStorage = window.localStorage.getItem('autoresFavoritos');
  //   let arrayAutoresFavoritos = autoresFavoritesLocalStorage ? JSON.parse(autoresFavoritesLocalStorage) : [];

  //   const contain = arrayAutoresFavoritos.some((a: AutorInterface) => a.id === autor.id);
  //   arrayAutoresFavoritos = contain ? arrayAutoresFavoritos : [...arrayAutoresFavoritos, autor]

  //   window.localStorage.setItem('autoresFavoritos', JSON.stringify(arrayAutoresFavoritos))
  // }
}
