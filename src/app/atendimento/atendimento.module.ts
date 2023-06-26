import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FuncionarioService } from '../funcionario/services/funcionario.service';
import { PessoaService } from '../pessoa/services/pessoa.service';
import { AtendimentoRoutingModule } from './atendimento-routing.module';
import { AtendimentoFormPageComponent } from './components/atendimento-form-page/atendimento-form-page.component';
import { AtendimentoListPageComponent } from './components/atendimento-list-page/atendimento-list-page.component';
import { AtendimentoService } from './services/atendimento.service';
import { AnimalService } from '../animal/services/animal.service';

@NgModule({
  imports: [CommonModule, HttpClientModule, IonicModule, FormsModule, ReactiveFormsModule, AtendimentoRoutingModule],
  declarations: [AtendimentoListPageComponent, AtendimentoFormPageComponent],
  providers: [AtendimentoService, AnimalService, FuncionarioService],
})
export class AtendimentoModule { }
