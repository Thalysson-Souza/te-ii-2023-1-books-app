import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertController, LoadingController, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { PessoaService } from '../../services/pessoa.service';

@Component({
  selector: 'app-pessoa-form-page',
  templateUrl: './pessoa-form-page.component.html',
})
export class PessoaFormPageComponent implements OnInit, OnDestroy {

  pessoaForm!: FormGroup;
  subscription = new Subscription()
  createMode: boolean = false;
  editMode: boolean = false;
  id!: number

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private pessoaService: PessoaService,
    private alertController: AlertController,
    private loadingService: LoadingService,
  ) {
  }

  ngOnInit(): void {
    this.loadingService
    this.initializeForm();
    this.loadPessoaOnEditMode()
  }

  private loadPessoaOnEditMode() {
    const [url] = this.activatedRoute.snapshot.url;
    this.editMode = url.path === 'edicao';
    this.createMode = !this.editMode;

    if (this.editMode) {

      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.id = id ? parseInt(id) : -1;

      if (this.id !== -1) {
        this.loadingService.on()
        this.pessoaService.getPessoa(this.id).subscribe((pessoa) => {
          this.pessoaForm.patchValue({
            nome: pessoa.nome,
            dataNascimento: pessoa.dataNascimento,
            cpf: pessoa.cpf,
            genero: pessoa.genero,
            telefone: pessoa.telefone,
          })
          this.loadingService.off()
        })
      }
    }
  }

  private initializeForm() {
    this.pessoaForm = this.formBuilder.group({
      nome: [
        'Nome qualquer',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),

        ]
      ],
      dataNascimento: '1970-01-01',
      genero: 'F',
      cpf: ['', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        this.validaCPF(),
      ]],
      telefone: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(11),
      ]]
    })
  }

  validaCPF(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      const value = control.value;
      var Soma = 0;

      if (value === undefined) {
        return { invalidCpf: 'teste' }
      }

      var strCPF = value.replace('.', '').replace('.', '').replace('-', '');
      if (strCPF === '00000000000' || strCPF === '11111111111' || strCPF === '22222222222' || strCPF === '33333333333' ||
        strCPF === '44444444444' || strCPF === '55555555555' || strCPF === '66666666666' || strCPF === '77777777777' || strCPF === '88888888888' ||
        strCPF === '99999999999' || strCPF.length !== 11) {
        return { invalidCpf: 'teste' }
      }

      for (let i = 1; i <= 9; i++) {
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
      }

      var Resto = (Soma * 10) % 11;
      if ((Resto === 10) || (Resto === 11)) {
        Resto = 0;
      }

      if (Resto !== parseInt(strCPF.substring(9, 10))) {
        return { invalidCpf: 'teste' }
      }

      Soma = 0;
      for (let k = 1; k <= 10; k++) {
        Soma = Soma + parseInt(strCPF.substring(k - 1, k)) * (12 - k)
      }

      Resto = (Soma * 10) % 11;
      if ((Resto === 10) || (Resto === 11)) {
        Resto = 0;
      }

      if (Resto !== parseInt(strCPF.substring(10, 11))) {
        return { invalidCpf: 'teste' }
      }
      return null;
    }
  };


  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  save(): void {
    if (this.createMode) {
      console.log(this.pessoaForm.value)
      this.subscription.add(
        this.pessoaService.savePessoa(this.pessoaForm.value).subscribe(
          () => {
            this.router.navigate(['./pessoa'])
          },
          async () => {
            const alerta = await this.alertController.create({
              header: 'Erro',
              message: 'Não foi possível salvar os dados da pessoa',
              buttons: ['Ok']
            })
            alerta.present()
          }
        )
      )
    } else {
      this.pessoaService.updatePessoa({
        ...this.pessoaForm.value,
        id: this.id
      }).subscribe({
        next: () => {
          this.router.navigate(['./pessoa'])
        },
        error: async () => {
          const alerta = await this.alertController.create({
            header: 'Erro',
            message: 'Não foi possível atualizar os dados da pessoa',
            buttons: ['Ok']
          })
          alerta.present()
        }
      })
    }
  }

  cancel(): void {
    this.router.navigate(['./pessoa'])
  }

  // compareWith(o1: NacionalidadeInterface, o2: NacionalidadeInterface) {
  //   return o1 && o2 ? o1.id === o2.id : o1 === o2;
  // }


}
