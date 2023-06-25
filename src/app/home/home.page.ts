import { Component, OnInit } from '@angular/core';
import { FuncionarioInterface } from '../funcionario/types/funcionario.interface';
import { AnimalInterface } from '../animal/types/animal.interface';
import { PessoaInterface } from '../pessoa/types/pessoa.interface';
import { AnimalService } from '../animal/services/animal.service';
import { PessoaService } from '../pessoa/services/pessoa.service';
import { FuncionarioService } from '../funcionario/services/funcionario.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  funcionarios: FuncionarioInterface[] = [];
  animais: AnimalInterface[] = [];
  pessoas: PessoaInterface[] = [];
  subscriptions = new Subscription();

  constructor(
    private funcionarioService: FuncionarioService,
    private animalService: AnimalService,
    private pessoaService: PessoaService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
  ) { }


  ionViewDidLeave(): void {
    this.funcionarios = [];
    this.pessoas = [];
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


  ngOnInit() {
  }

}
