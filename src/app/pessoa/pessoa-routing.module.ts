import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { PessoaListPageComponent } from './components/pessoa-list-page/pessoa-list-page.component';
import { PessoaFormPageComponent } from './components/pessoa-form-page/pessoa-form-page.component';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'lista',
    pathMatch: 'full',
  },
  {
    path: 'lista',
    component: PessoaListPageComponent,
  },
  {
    path: 'cadastro',
    component: PessoaFormPageComponent,
  },
  {
    path: 'edicao/:id',
    component: PessoaFormPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PessoaRoutingModule { }
