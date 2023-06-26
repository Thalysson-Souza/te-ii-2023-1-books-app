import { AnimalInterface } from "src/app/animal/types/animal.interface"
import { FuncionarioInterface } from "src/app/funcionario/types/funcionario.interface"
import { PessoaInterface } from "src/app/pessoa/types/pessoa.interface"

export interface AtendimentoInterface {
    id: number
    animal: AnimalInterface
    funcionario: FuncionarioInterface
    data: string
    valor: number
    pago: boolean
}
