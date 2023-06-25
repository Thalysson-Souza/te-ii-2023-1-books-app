import { PessoaInterface } from "src/app/pessoa/types/pessoa.interface"

export interface FuncionarioInterface {
    id: number
    salario: number
    funcao: string
    pessoa?: PessoaInterface
}
