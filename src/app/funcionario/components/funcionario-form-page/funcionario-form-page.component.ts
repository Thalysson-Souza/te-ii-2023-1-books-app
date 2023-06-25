import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PessoaService } from 'src/app/pessoa/services/pessoa.service';
import { PessoaInterface } from 'src/app/pessoa/types/pessoa.interface';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { FuncionarioService } from '../../services/funcionario.service';
import { FuncionarioInterface } from '../../types/funcionario.interface';

@Component({
  selector: 'app-funcionario-form-page',
  templateUrl: './funcionario-form-page.component.html',
})

export class FuncionarioFormPageComponent implements OnInit, OnDestroy {
  funcionarioForm!: FormGroup;
  subscription = new Subscription();
  createMode: boolean = false;
  editMode: boolean = false;
  id!: number;
  pessoas: PessoaInterface[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private funcionarioService: FuncionarioService,
    private pessoaService: PessoaService,
    private alertController: AlertController,
    private loadingService: LoadingService,
  ) {
  }

  ionViewWillEnter(): void {
    console.log('ionViewWillEnter')
  }
  ionViewDidEnter(): void {
    console.log('ionViewDidEnter')
  }
  ionViewWillLeave(): void {
    console.log('ionViewWillLeave')
  }
  ionViewDidLeave(): void {
    console.log('ionViewDidLeave')
  }

  ngOnInit(): void {
    this.loadingService
    this.initializeForm();
    this.loadPessoas();
    this.loadFuncionarioOnEditMode()
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

  private loadFuncionarioOnEditMode() {
    const [url] = this.activatedRoute.snapshot.url;
    this.editMode = url.path === 'edicao';
    this.createMode = !this.editMode;

    if (this.editMode) {

      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.id = id ? parseInt(id) : -1;

      if (this.id !== -1) {
        this.loadingService.on()
        this.funcionarioService.getFuncionario(this.id).subscribe((funcionario) => {
          this.funcionarioForm.patchValue({
            pessoa: funcionario.pessoa,
            salario: funcionario.salario,
            funcao: funcionario.funcao
          })
          this.loadingService.off()
        })
      }
    }
  }

  private initializeForm() {
    this.funcionarioForm = this.formBuilder.group({

      salario: [1000, [
        Validators.required,
        Validators.min(1000)
      ]],
      funcao: ["", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]],
      pessoa: ["", [
        Validators.required
      ]]
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  save(): void {
    if (this.createMode) {
      this.subscription.add(
        this.funcionarioService.saveFuncionario(this.funcionarioForm.value).subscribe(
          () => {
            this.router.navigate(['./funcionario'])
          },
          async () => {
            const alerta = await this.alertController.create({
              header: 'Erro',
              message: 'Não foi possível salvar os dados do funcionario',
              buttons: ['Ok']
            })
            alerta.present()
          }
        )
      )
    } else {
      this.funcionarioService.updateFuncionario({
        ...this.funcionarioForm.value,
        id: this.id
      }).subscribe({
        next: () => {
          this.router.navigate(['./funcionario'])
        },
        error: async () => {
          const alerta = await this.alertController.create({
            header: 'Erro',
            message: 'Não foi possível atualizar os dados do funcionario',
            buttons: ['Ok']
          })
          alerta.present()
        }
      })
    }
  }

  cancel(): void {
    this.router.navigate(['./funcionario'])
  }

  compareWith(o1: FuncionarioInterface, o2: FuncionarioInterface) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

}
