import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/', icon: 'home' },
    { title: 'Animal', url: '/animal', icon: 'fish' },
    { title: 'Atendimento', url: '/atendimento', icon: 'clipboard' },
    { title: 'Funcionário', url: '/funcionario', icon: 'id-card' },
    { title: 'Pessoa', url: '/pessoa', icon: 'people-circle' },
  ];
  constructor() { }
}
