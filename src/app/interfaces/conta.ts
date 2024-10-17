import { Empresa } from "./empresa";

export interface Conta {
    usuario?: string,
    email?: string,
    senha?: string,
    empresa?: Empresa
}