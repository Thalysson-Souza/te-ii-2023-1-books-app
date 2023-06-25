import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PessoaService } from '../pessoa/services/pessoa.service';
import { AnimalRoutingModule } from './animal-routing.module';
import { AnimalListPageComponent } from './components/animal-list-page/animal-list-page.component';
import { AnimalService } from './services/animal.service';
import { AnimalFormPageComponent } from './components/animal-form-page/animal-form-page.component';

@NgModule({
  imports: [CommonModule, HttpClientModule, IonicModule, FormsModule, ReactiveFormsModule, AnimalRoutingModule],
  declarations: [AnimalListPageComponent, AnimalFormPageComponent],
  providers: [AnimalService, PessoaService],
})
export class AnimalModule { }
