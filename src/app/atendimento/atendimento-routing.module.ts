import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AtendimentoFormPageComponent } from './components/atendimento-form-page/atendimento-form-page.component';
import { AtendimentoListPageComponent } from './components/atendimento-list-page/atendimento-list-page.component';
;

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'lista',
    pathMatch: 'full',
  },
  {
    path: 'lista',
    component: AtendimentoListPageComponent,
  },
  {
    path: 'cadastro',
    component: AtendimentoFormPageComponent,
  },
  {
    path: 'edicao/:id',
    component: AtendimentoFormPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtendimentoRoutingModule { }
