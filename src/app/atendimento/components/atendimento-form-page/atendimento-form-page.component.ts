import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { FuncionarioInterface } from 'src/app/funcionario/types/funcionario.interface';
import { PessoaInterface } from 'src/app/pessoa/types/pessoa.interface';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { AtendimentoService } from '../../services/atendimento.service';
import { FuncionarioService } from 'src/app/funcionario/services/funcionario.service';
import { PessoaService } from 'src/app/pessoa/services/pessoa.service';

@Component({
  selector: 'app-atendimento-form-page',
  templateUrl: './atendimento-form-page.component.html',
})

export class AtendimentoFormPageComponent implements OnInit, OnDestroy {
  atendimentoForm!: FormGroup;
  subscription = new Subscription();
  createMode: boolean = false;
  editMode: boolean = false;
  id!: number;
  pessoas: PessoaInterface[] = [];
  funcionarios: FuncionarioInterface[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private atendimentoService: AtendimentoService,
    private pessoaService: PessoaService,
    private funcionarioService: FuncionarioService,
    private alertController: AlertController,
    private loadingService: LoadingService,
  ) {
  }

  ngOnInit(): void {
    this.loadingService
    this.initializeForm();
    this.loadPessoas();
    this.loadFuncionarios();
    this.loadAtendimentoOnEditMode()
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
      this.id = id ? parseInt(id) : -1;

      if (this.id !== -1) {
        this.loadingService.on()
        this.atendimentoService.getAtendimento(this.id).subscribe((atendimento) => {
          this.atendimentoForm.patchValue({
            data: atendimento.data,
            funcionario: atendimento.funcionario,
            pessoa: atendimento.pessoa,
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
        this.validaFuncionario()
      ]],
      pessoa: ["", [
        Validators.required
      ]],
      data: ['2000-01-01', [
        Validators.required
      ]],
      valor: [100, [
        Validators.required,
        Validators.min(80),
      ]],
      pago: 'N'
    })
  }

  validaFuncionario(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      if (this.atendimentoForm?.value?.pessoa?.id === control.value.pessoa?.id) return { invalidFunc: 'teste' };

      return null;
    }
  };

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
          async () => {
            const alerta = await this.alertController.create({
              header: 'Erro',
              message: 'Não foi possível salvar os dados do atendimento',
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
        error: async () => {
          const alerta = await this.alertController.create({
            header: 'Erro',
            message: 'Não foi possível atualizar os dados do atendimento',
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

  compareWithPessoa(o1: PessoaInterface, o2: PessoaInterface) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  compareWithFuncionario(o1: FuncionarioInterface, o2: FuncionarioInterface) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

}
