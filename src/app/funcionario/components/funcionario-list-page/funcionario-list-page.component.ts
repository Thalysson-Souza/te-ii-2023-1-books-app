import { Component, OnDestroy } from '@angular/core';
import { AlertController, LoadingController, ToastController, ViewDidLeave, ViewWillEnter } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { FuncionarioService } from '../../services/funcionario.service';
import { FuncionarioInterface } from '../../types/funcionario.interface';

@Component({
  selector: 'app-funcionario-list-page',
  templateUrl: './funcionario-list-page.component.html',
})
export class FuncionarioListPageComponent implements ViewWillEnter, ViewDidLeave, OnDestroy {
  funcionarios: FuncionarioInterface[] = [];
  subscriptions = new Subscription();

  constructor(
    private funcionarioService: FuncionarioService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
  ) { }

  ionViewDidLeave(): void {
    this.funcionarios = [];
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

    const subscription = this.funcionarioService.getFuncionarios()
      .subscribe(async (funcionarios) => {
        this.funcionarios = funcionarios;
        const toast = await this.toastController.create({
          color: 'success',
          message: 'Lista de funcionarios carregada com sucesso!',
          duration: 3000,
          buttons: ['X']
        })
        toast.present()
        busyLoader.dismiss();
      }, async () => {
        const alerta = await this.alertController.create({
          header: 'Erro',
          message: 'Não foi possível carregar a lista de funcionarios',
          buttons: ['Ok']
        })
        alerta.present()
        busyLoader.dismiss();
      });
    this.subscriptions.add(subscription);
  }

  async remove(funcionario: FuncionarioInterface) {
    const alert = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o funcionário ${funcionario.id}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.subscriptions.add(
              this.funcionarioService.removeFuncionario(funcionario).subscribe(() => this.listar())
            );
          },
        },
        'Não',
      ],
    });
    alert.present();
  }

  favorite(funcionario: FuncionarioInterface) {
    const funcionariosFavoritesLocalStorage = window.localStorage.getItem('funcionariosBons');
    let arrayAutoresFavoritos = funcionariosFavoritesLocalStorage ? JSON.parse(funcionariosFavoritesLocalStorage) : [];

    const contain = arrayAutoresFavoritos.some((a: FuncionarioInterface) => a.id === funcionario.id);
    arrayAutoresFavoritos = contain ? arrayAutoresFavoritos : [...arrayAutoresFavoritos, funcionario]

    window.localStorage.setItem('funcionariosBons', JSON.stringify(arrayAutoresFavoritos))
  }
}
