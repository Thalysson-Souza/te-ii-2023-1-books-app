import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AnimalFormPageComponent } from './components/animal-form-page/animal-form-page.component';
import { AnimalListPageComponent } from './components/animal-list-page/animal-list-page.component';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'lista',
    pathMatch: 'full',
  },
  {
    path: 'lista',
    component: AnimalListPageComponent,
  },
  {
    path: 'cadastro',
    component: AnimalFormPageComponent,
  },
  {
    path: 'edicao/:id',
    component: AnimalFormPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimalRoutingModule { }
