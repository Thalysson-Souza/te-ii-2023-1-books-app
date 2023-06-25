import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { FuncionarioService } from './services/funcionario.service';
import { FuncionarioListPageComponent } from './components/funcionario-list-page/funcionario-list-page.component';
import { FuncionarioFormPageComponent } from './components/funcionario-form-page/funcionario-form-page.component';
import { PessoaService } from '../pessoa/services/pessoa.service';
import { FuncionariosFavoritosPageComponent } from './components/funcionario-favoritos-page/funcionario-favoritos-page.component';

@NgModule({
  imports: [CommonModule, HttpClientModule, IonicModule, FormsModule, ReactiveFormsModule, FuncionarioRoutingModule],
  declarations: [FuncionarioListPageComponent, FuncionarioFormPageComponent, FuncionariosFavoritosPageComponent],
  providers: [FuncionarioService, PessoaService],
})
export class FuncionarioModule { }
