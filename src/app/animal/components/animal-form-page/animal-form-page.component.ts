import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PessoaService } from 'src/app/pessoa/services/pessoa.service';
import { PessoaInterface } from 'src/app/pessoa/types/pessoa.interface';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { AnimalService } from '../../services/animal.service';

@Component({
  selector: 'app-animal-form-page',
  templateUrl: './animal-form-page.component.html',
})

export class AnimalFormPageComponent implements OnInit, OnDestroy {
  animalForm!: FormGroup;
  subscription = new Subscription();
  createMode: boolean = false;
  editMode: boolean = false;
  id!: number;
  pessoas: PessoaInterface[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private animalService: AnimalService,
    private pessoaService: PessoaService,
    private alertController: AlertController,
    private loadingService: LoadingService,
  ) {
  }

  ngOnInit(): void {
    this.loadingService
    this.initializeForm();
    this.loadPessoas();
    this.loadAnimalOnEditMode()
  }

  private async loadPessoas() {
    this.loadingService.on();
    this.subscription.add(
      this.pessoaService.getPessoas().subscribe((response) => {
        this.pessoas = response;
        this.loadingService.off();
      })
    );
  }

  private loadAnimalOnEditMode() {
    const [url] = this.activatedRoute.snapshot.url;
    this.editMode = url.path === 'edicao';
    this.createMode = !this.editMode;

    if (this.editMode) {

      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.id = id ? parseInt(id) : -1;

      if (this.id !== -1) {
        this.loadingService.on()
        this.animalService.getAnimal(this.id).subscribe((animal) => {
          this.animalForm.patchValue({
            pessoa: animal.pessoa,
            nome: animal.nome,
            dataNascimento: animal.dataNascimento,
            descricao: animal.descricao,
          })
          this.loadingService.off()
        })
      }
    }
  }

  private initializeForm() {
    this.animalForm = this.formBuilder.group({
      pessoa: ["", [
        Validators.required
      ]],
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]
      ],
      dataNascimento: ['1980-01-01', [
        Validators.required,
        this.validaData()
      ]],
      genero: 'F',
      descricao: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(200),
      ]]
    })
  }

  validaData(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      const value = control.value;
      var date = new Date(value);
      var novaData = new Date();
      if (date > novaData) return { invalidData: 'teste' };

      return null;
    }
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  save(): void {
    if (this.createMode) {
      this.subscription.add(
        this.animalService.saveAnimal(this.animalForm.value).subscribe(
          () => {
            this.router.navigate(['./animal'])
          },
          async () => {
            const alerta = await this.alertController.create({
              header: 'Erro',
              message: 'Não foi possível salvar os dados do animal',
              buttons: ['Ok']
            })
            alerta.present()
          }
        )
      )
    } else {
      this.animalService.updateAnimal({
        ...this.animalForm.value,
        id: this.id
      }).subscribe({
        next: () => {
          this.router.navigate(['./animal'])
        },
        error: async () => {
          const alerta = await this.alertController.create({
            header: 'Erro',
            message: 'Não foi possível atualizar os dados do animal',
            buttons: ['Ok']
          })
          alerta.present()
        }
      })
    }
  }

  cancel(): void {
    this.router.navigate(['./animal'])
  }

  compareWith(o1: PessoaInterface, o2: PessoaInterface) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

}
