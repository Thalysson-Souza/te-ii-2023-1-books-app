import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AnimalService } from 'src/app/animal/services/animal.service';
import { AnimalInterface } from 'src/app/animal/types/animal.interface';
import { FuncionarioService } from 'src/app/funcionario/services/funcionario.service';
import { FuncionarioInterface } from 'src/app/funcionario/types/funcionario.interface';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { AtendimentoService } from '../../services/atendimento.service';

@Component({
  selector: 'app-atendimento-form-page',
  templateUrl: './atendimento-form-page.component.html',
})

export class AtendimentoFormPageComponent implements OnInit, OnDestroy {
  atendimentoForm!: FormGroup;
  subscription = new Subscription();
  createMode: boolean = false;
  editMode: boolean = false;
  id!: string;
  animais: AnimalInterface[] = [];
  funcionarios: FuncionarioInterface[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private atendimentoService: AtendimentoService,
    private animalService: AnimalService,
    private funcionarioService: FuncionarioService,
    private alertController: AlertController,
    private loadingService: LoadingService,
  ) {
  }

  ngOnInit(): void {
    this.loadingService;
    this.loadAnimais();
    this.loadFuncionarios();
    this.initializeForm();
    this.loadAtendimentoOnEditMode()
  }

  private async loadAnimais() {
    this.loadingService.on();
    this.subscription.add(
      this.animalService.getAnimais().subscribe((response) => {
        this.animais = response;
        this.loadingService.off();
      })
    );
  }

  private async loadFuncionarios() {
    this.loadingService.on();
    this.subscription.add(
      this.funcionarioService.getFuncionarios().subscribe((response) => {
        this.funcionarios = response;
        this.loadingService.off();
      })
    );
  }

  private loadAtendimentoOnEditMode() {
    const [url] = this.activatedRoute.snapshot.url;
    this.editMode = url.path === 'edicao';
    this.createMode = !this.editMode;

    if (this.editMode) {

      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.id = id ? id : '-1';

      if (this.id !== '-1') {
        this.loadingService.on()
        this.atendimentoService.getAtendimento(this.id).subscribe((atendimento) => {
          this.atendimentoForm.patchValue({
            data: atendimento.data,
            funcionario: atendimento.funcionario,
            animal: atendimento.animal,
            valor: atendimento.valor,
            pago: atendimento.pago,
          })
          this.loadingService.off()
        })
      }
    }
  }

  private initializeForm() {
    this.atendimentoForm = this.formBuilder.group({
      funcionario: ["", [
        Validators.required,
        // this.validaFuncionario()
      ]],
      animal: ["", [
        Validators.required
      ]],
      data: ['2000-01-01', [
        Validators.required
      ]],
      valor: [100, [
        Validators.required,
        // Validators.min(0),
      ]],
      pago: false
    })
  }

  // validaFuncionario(): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     if (this.atendimentoForm?.value?.pessoa?.id === control.value.pessoa?.id) return { invalidFunc: 'teste' };
  //     return null;
  //   }
  // };

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  save(): void {
    if (this.createMode) {
      this.subscription.add(
        this.atendimentoService.saveAtendimento(this.atendimentoForm.value).subscribe(
          () => {
            this.router.navigate(['./atendimento'])
          },
          async (e) => {
            const alerta = await this.alertController.create({
              header: 'Erro',
              message: e.error?.statusCode != 500 ? e.error.message : 'Não foi possível salvar os dados do atendimento',
              buttons: ['Ok']
            })
            alerta.present()
          }
        )
      )
    } else {
      this.atendimentoService.updateAtendimento({
        ...this.atendimentoForm.value,
        id: this.id
      }).subscribe({
        next: () => {
          this.router.navigate(['./atendimento'])
        },
        error: async (e) => {
          const alerta = await this.alertController.create({
            header: 'Erro',
            message: e.error?.statusCode != 500 ? e.error.message : 'Não foi possível atualizar os dados do atendimento',
            buttons: ['Ok']
          })
          alerta.present()
        }
      })
    }
  }

  cancel(): void {
    this.router.navigate(['./atendimento'])
  }

  compareWithAnimal(o1: AnimalInterface, o2: AnimalInterface) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  compareWithFuncionario(o1: FuncionarioInterface, o2: FuncionarioInterface) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

}
