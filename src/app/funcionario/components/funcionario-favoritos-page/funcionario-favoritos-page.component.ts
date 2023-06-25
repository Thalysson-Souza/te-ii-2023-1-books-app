import { Component, OnInit } from "@angular/core";
import { FuncionarioInterface } from "../../types/funcionario.interface";

@Component({
  selector: 'app-funcionario-favoritos-page',
  templateUrl: './funcionario-favoritos-page.component.html',
})
export class FuncionariosFavoritosPageComponent implements OnInit {

  funcionarios: FuncionarioInterface[] = []

  ngOnInit(): void {
    const funcionariosFavoritesLocalStorage = window.localStorage.getItem('funcionariosBons')
    this.funcionarios = funcionariosFavoritesLocalStorage ? JSON.parse(funcionariosFavoritesLocalStorage) : [];
  }

  unfavorite(funcionario: FuncionarioInterface) {
    this.funcionarios = this.funcionarios.filter(a => a.id !== funcionario.id);
    window.localStorage.setItem('funcionariosBons', JSON.stringify(this.funcionarios));
  }
}
