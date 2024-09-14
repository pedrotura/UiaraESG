import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from '../interfaces/empresa';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private urlEmpresa = '';
  private urlEndereco = '';

  constructor(private http: HttpClient) { }

  buscarEmpresa(cnpjValor: any):Observable<any> {
    this.urlEmpresa = `https://api-publica.speedio.com.br/buscarcnpj?cnpj=${cnpjValor}`;
    return this.http.get<any>(this.urlEmpresa) as Observable<any>;
  }

  buscarEndereco(cepValor: any):Observable<any> {
    this.urlEndereco = `https://viacep.com.br/ws/${cepValor}/json/`;
    return this.http.get<any>(this.urlEndereco) as Observable<any>;
  }

}
