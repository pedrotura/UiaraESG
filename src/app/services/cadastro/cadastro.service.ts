import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from '../../interfaces/empresa';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private urlEmpresa = '';
  private urlEndereco = '';
  private urlLocal = '';
  private urlRepresentante = '';
  private urlConta = '';

  constructor(private http: HttpClient) { }

  buscarEmpresa(cnpjValor: any): Observable<any> {
    this.urlEmpresa = `https://api-publica.speedio.com.br/buscarcnpj?cnpj=${cnpjValor}`;
    return this.http.get<any>(this.urlEmpresa) as Observable<any>;
  }

  inserirLocal(form: any): Observable<any> {
    this.urlLocal = `http://localhost:3000/locais`;
    return this.http.post<any>(this.urlLocal, form) as Observable<any>;
  }

  inserirRepresentante(form: any): Observable<any> {
    this.urlRepresentante = `http://localhost:3000/representantes`;
    return this.http.post<any>(this.urlRepresentante, form) as Observable<any>;
  }

  cadastrarEmpresa(form: any): Observable<any> {
    this.urlEmpresa = `http://localhost:3000/empresas`;
    return this.http.post(this.urlEmpresa, form) as Observable<any>;
  }

  registrarConta(form: any): Observable<any> {
    this.urlConta = `http://localhost:3000/contas`;
    return this.http.post<any>(this.urlConta, form) as Observable<any>;
  }

  buscarEndereco(cepValor: any): Observable<any> {
    this.urlEndereco = `https://viacep.com.br/ws/${cepValor}/json/`;
    return this.http.get<any>(this.urlEndereco) as Observable<any>;
  }

}
