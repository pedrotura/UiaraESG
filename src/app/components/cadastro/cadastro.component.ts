import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CadastroService } from '../../services/cadastro.service';
import { Empresa } from '../../interfaces/empresa';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  empresa: Empresa = {};
  cadastroForm: FormGroup;

  constructor (private cadastroService: CadastroService, private formBuilder: FormBuilder, private router: Router) {
    this.cadastroForm = formBuilder.group({
      cnpj: ['', [Validators.required, Validators.maxLength(18)]],
      nomeEmpresa: ['', Validators.required],
      receitaBruta: ['', Validators.required],
      qtdEmpregados: ['', Validators.required],
      local: this.formBuilder.group({
        cep: ['', [Validators.required, Validators.maxLength(9)]],
        endereco: ['', Validators.required],
        numeroEndereco: ['', [Validators.required, Validators.maxLength(4)]],
        complemento: [''],
        cidade: ['', Validators.required],
        estado: ['', Validators.required]
      }),
      representante: this.formBuilder.group({
        cpf: ['', [Validators.required, Validators.maxLength(14)]],
        nomeRepresentante: ['', Validators.required],
        sobrenomeRepresentante: ['', Validators.required],
        telefone: ['', [Validators.required, Validators.maxLength(15)]],
        email: ['', [Validators.required, Validators.email]]
      }),
      senha: ['', Validators.required],
      senhaConfirma: ['', Validators.required]
    });
  }
  
  validarFormatos(): void {
    const cnpj = document.querySelector('#cnpj') as HTMLInputElement;

    cnpj.addEventListener('input', function () {
      cnpj.value = cnpj.value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    });

    const cep = document.querySelector('#cep') as HTMLInputElement;

    cep.addEventListener('input', function () {
      cep.value = cep.value
        .replace(/\D/g, "")
        .replace(/(\d{5})(\d)/, "$1-$2");
    });

    const cpf = document.querySelector('#cpf') as HTMLInputElement;

    cpf.addEventListener('input', function () {
      cpf.value = cpf.value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    });

    const numeroEndereco = document.querySelector('#numeroEndereco') as HTMLInputElement;

    numeroEndereco.addEventListener('input', function () {
      numeroEndereco.value = numeroEndereco.value
        .replace(/\D/, "");
    });

    const telefone = document.querySelector('#telefone') as HTMLInputElement;

    telefone.addEventListener('input', function () {
      telefone.value = telefone.value
        .replace(/\D/g, "")
        .replace(/(\d)/, "($1")
        .replace(/(\d{2})(\d)/, "$1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .replace(/^(\(\d{2}\) )(\d{4})-(\d)(\d{4})/, "$1$2$3-$4");
    });
  }

  buscarEmpresa(): void {
    let cnpjValor;
    const cnpj = document.querySelector('#cnpj') as HTMLInputElement;

    cnpj.addEventListener('input', () => {
      let cnpjValidacao = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;

      if (cnpjValidacao.test(cnpj.value)) {
        cnpjValor = cnpj.value
          .replace(/\./g, "")
          .replace(/\//, "")
          .replace(/\-/, "");
        this.cadastroService.buscarEmpresa(cnpjValor).subscribe((data) => {
          this.cadastroForm.patchValue({
            nomeEmpresa: data['RAZAO SOCIAL'] || ''
          });
        });
      }
    });
  }

  buscarEndereco(): void {
    let cepValor;
    const cep = document.querySelector('#cep') as HTMLInputElement;

    cep.addEventListener('input', () => {
      let cepValidacao = /^\d{5}\-\d{3}/;

      if (cepValidacao.test(cep.value)) {
        cepValor = cep.value
            .replace(/\-/, "");
        this.cadastroService.buscarEndereco(cepValor).subscribe((data) => {
          this.cadastroForm.patchValue({
            local: {
              endereco: `${data.logradouro}, ${data.bairro}` || '',
              cidade: data.localidade || '',
              estado: data.estado || ''
            }
          });

        });
      }
    });
  }

  //TODO: implementar validação da senha
  validarSenha(): void {

    const senha = document.querySelector('#senha');
    const iconeSenha = document.querySelector('#iconeSenha');

    const senhaConfirma = document.querySelector('#senhaConfirma');
    const iconeSenhaConfirma = document.querySelector('#iconeSenhaConfirma');

    alterarTipoTexto(senha, iconeSenha);
    alterarTipoTexto(senhaConfirma, iconeSenhaConfirma);

    function alterarTipoTexto(icone: any, texto: any) {
      icone.addEventListener('click', function () {
        if (texto.type == 'password') {
          texto.type = 'text';
          icone.classList.remove('bi-eye-slash');
          icone.classList.add('bi-eye');
        } else {
          texto.type = 'password';
          icone.classList.remove('bi-eye');
          icone.classList.add('bi-eye-slash');
        }
      });
    }
  }

  ngOnInit(): void {
    this.buscarEmpresa();
    this.buscarEndereco();
    this.validarFormatos();
    this.validarSenha();
  }

  //TODO: enviar dados do formulário para o servidor
  onSubmit(): void {
    alert('Formulário enviadoo :3');
    alert(this.cadastroForm.valid);
    console.log(this.cadastroForm);
    if (this.cadastroForm.valid) {
      this.router.navigate(['/perguntas']);
    }
  }

}
