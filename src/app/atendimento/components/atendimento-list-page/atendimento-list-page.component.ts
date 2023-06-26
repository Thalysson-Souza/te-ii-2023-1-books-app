import { Component, OnDestroy } from '@angular/core';
import { AlertController, LoadingController, ToastController, ViewDidLeave, ViewWillEnter } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AtendimentoInterface } from '../../types/atendimento.interface';
import { AtendimentoService } from '../../services/atendimento.service';

@Component({
  selector: 'app-atendimento-list-page',
  templateUrl: './atendimento-list-page.component.html',
})
export class AtendimentoListPageComponent implements ViewWillEnter, ViewDidLeave, OnDestroy {
  atendimentos: AtendimentoInterface[] = [];
  subscriptions = new Subscription();

  constructor(
    private atendimentoService: AtendimentoService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
  ) { }

  ionViewDidLeave(): void {
    this.atendimentos = [];
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

    const subscription = this.atendimentoService.getAtendimentos()
      .subscribe(async (atendimentos) => {
        this.atendimentos = atendimentos;
        const toast = await this.toastController.create({
          color: 'success',
          message: 'Lista de atendimentos carregada com sucesso!',
          duration: 3000,
          buttons: ['X']
        })
        toast.present()
        busyLoader.dismiss();
      }, async () => {
        const alerta = await this.alertController.create({
          header: 'Erro',
          message: 'Não foi possível carregar a lista de atendimentos',
          buttons: ['Ok']
        })
        alerta.present()
        busyLoader.dismiss();
      });
    this.subscriptions.add(subscription);
  }

  async remove(atendimento: AtendimentoInterface) {
    const alert = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o atendimento ${atendimento.id}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.subscriptions.add(
              this.atendimentoService.removeAtendimento(atendimento).subscribe(
                {
                  next: () => {
                    this.listar()
                  },
                  error: async (e) => {
                    const alerta = await this.alertController.create({
                      header: 'Erro',
                      message: e.error?.statusCode != 500 ? e.error.message : 'Não foi possível excluir o atendimento.',
                      buttons: ['Ok']
                    })
                    alerta.present()
                  }
                }
              )
            );
          },
        },
        'Não',
      ],
    });
    alert.present();
  }
}
