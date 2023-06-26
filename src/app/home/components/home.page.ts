import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ChartConfiguration } from 'chart.js';
import { Subscription } from 'rxjs';
import { HomeService } from '../services/home.service';
import { HomeInterface } from '../types/home.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
})

export class HomePage implements OnInit {

  home: HomeInterface = { count_animais: 1, count_funcionarios: 2, count_pessoas: 3 };
  subscriptions = new Subscription();

  title = 'ng2-charts-demo';
  public barChartLegend = true;
  public barChartPlugins = [];

  private datasets_private = [
    { data: [this.home.count_animais], label: 'Animais' },
    { data: [this.home.count_pessoas], label: 'Pessoas' },
    { data: [this.home.count_funcionarios], label: 'Funcionários' },
  ]

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [''],
    datasets: this.datasets_private
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };



  constructor(
    private homeService: HomeService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
  ) { }

  ionViewWillEnter(): void {
    this.getCount()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  async getCount() {
    const busyLoader = await this.loadingController.create({ spinner: 'circular' })
    busyLoader.present()

    const subscription = this.homeService.getInfoCount()
      .subscribe(async (home) => {
        this.home = home;
        this.barChartData = {
          labels: [''],
          datasets: [
            { data: [home.count_animais], label: 'Animais' },
            { data: [home.count_pessoas], label: 'Pessoas' },
            { data: [home.count_funcionarios], label: 'Funcionários' },
          ]
        };
        const toast = await this.toastController.create({
          color: 'success',
          message: 'Home carregado com sucesso!',
          duration: 3000,
          buttons: ['X']
        })
        toast.present()
        busyLoader.dismiss();
      }, async () => {
        const alerta = await this.alertController.create({
          header: 'Erro',
          message: 'Não foi possível os dados da home',
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
