import { PessoaInterface } from "src/app/pessoa/types/pessoa.interface"

export interface AnimalInterface {
    id: number
    pessoa?: PessoaInterface
    nome: string
    dataNascimento: string
    descricao: string
    genero: string
}
