import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PessoaService } from './services/pessoa.service';
import { PessoaRoutingModule } from './pessoa-routing.module';
import { PessoaFormPageComponent } from './components/pessoa-form-page/pessoa-form-page.component';
import { PessoaListPageComponent } from './components/pessoa-list-page/pessoa-list-page.component';

@NgModule({
  imports: [CommonModule, HttpClientModule, IonicModule, FormsModule, ReactiveFormsModule, PessoaRoutingModule],
  declarations: [PessoaListPageComponent, PessoaFormPageComponent],
  providers: [PessoaService,],
})
export class PessoaModule { }
