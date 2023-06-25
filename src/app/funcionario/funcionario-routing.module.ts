import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FuncionarioListPageComponent } from './components/funcionario-list-page/funcionario-list-page.component';
import { FuncionarioFormPageComponent } from './components/funcionario-form-page/funcionario-form-page.component';
import { FuncionariosFavoritosPageComponent } from './components/funcionario-favoritos-page/funcionario-favoritos-page.component';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'lista',
    pathMatch: 'full',
  },
  {
    path: 'lista',
    component: FuncionarioListPageComponent,
  },
  {
    path: 'cadastro',
    component: FuncionarioFormPageComponent,
  },
  {
    path: 'edicao/:id',
    component: FuncionarioFormPageComponent,
  },
  {
    path: 'favoritos',
    component: FuncionariosFavoritosPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuncionarioRoutingModule { }
