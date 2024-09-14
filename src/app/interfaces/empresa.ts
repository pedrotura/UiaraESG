import { Local } from "./local";

export interface Empresa {
    cnpj?: string,
    nome?: string,
    receitaBruta?: number,
    qtdEmpregados?: number,
    local?: Local
}