import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'pessoa',
    loadChildren: () => import('./pessoa/pessoa.module').then(m => m.PessoaModule)
  },
  {
    path: 'funcionario',
    loadChildren: () => import('./funcionario/funcionario.module').then(m => m.FuncionarioModule)
  },
  {
    path: 'animal',
    loadChildren: () => import('./animal/animal.module').then(m => m.AnimalModule)
  },
  {
    path: 'atendimento',
    loadChildren: () => import('./atendimento/atendimento.module').then(m => m.AtendimentoModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
