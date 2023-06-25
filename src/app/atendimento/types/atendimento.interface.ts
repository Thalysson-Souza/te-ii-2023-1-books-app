import { FuncionarioInterface } from "src/app/funcionario/types/funcionario.interface"
import { PessoaInterface } from "src/app/pessoa/types/pessoa.interface"

export interface AtendimentoInterface {
    id: number
    pessoa: PessoaInterface
    funcionario: FuncionarioInterface
    data: string
    valor: number
    pago: string
}
