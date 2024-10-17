import { Local } from "./local";
import { Representante } from "./representante";

export interface Empresa {
    cnpj?: string,
    nome?: string,
    receitaBruta?: number,
    qtdEmpregados?: number,
    representante?: Representante,
    local?: Local
}