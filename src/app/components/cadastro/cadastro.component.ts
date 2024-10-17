import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RegexValidations, PasswordFormatting } from '../../shared/form-utilities';
import { CadastroService } from '../../services/cadastro/cadastro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  requirements: Array<any> = [
    { id: 1, mensagem: 'A sua senha deve conter ao menos 8 caracteres', padrao: /.{8,}/ },
    { id: 2, mensagem: 'Digite pelo menos 1 letra maiúscula', padrao: /[A-Z]+/ },
    { id: 3, mensagem: 'Digite pelo menos 1 número', padrao: /\d+/ },
    { id: 4, mensagem: 'Digite pelo menos 1 caractere especial', padrao: /[$&+,:;=?@#|'<>.^*()%!-]+/ },
  ];
  cadastroForm: FormGroup;

  constructor(private cadastroService: CadastroService, private formBuilder: FormBuilder, private router: Router) {
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
        telefone: ['', [Validators.required, Validators.maxLength(15)]]
      }),
      conta: this.formBuilder.group({
        nomeUsuario: ['', [Validators.required, Validators.maxLength(25)]],
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required, this.senhaValidator]],
        senhaConfirma: ['', Validators.required],
        concordarTermos: [false, Validators.pattern(/true/)],
        aceitarEmails: [false]
      })
    }, { validators: this.senhaConfirmaValidator }
    );
  }

  validarFormatos(): void {
    RegexValidations.validarCNPJ();
    RegexValidations.validarCEP();
    RegexValidations.validarCPF();
    RegexValidations.validarEndereco();
    RegexValidations.validarTelefone();
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
      } else {
        this.cadastroForm.patchValue({
          nomeEmpresa: ''
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
              estado: data.uf || ''
            }
          });
        });
      } else {
        this.cadastroForm.patchValue({
          local: {
            endereco: '',
            cidade: '',
            estado: ''
          }
        });
      }
    });
  }

  //TODO: implementar validação da senha
  tratarSenha(): void {
    const senha = document.querySelector('#senha') as HTMLInputElement;
    const reqIcon = document.querySelectorAll('.requirement-icon') as NodeListOf<HTMLElement>;
    const reqText = document.querySelectorAll('.requirement-text') as NodeListOf<HTMLElement>;

    senha.addEventListener('input', () => {

      reqIcon.forEach(req => {
        if (!req.classList.contains('requirement-confirm')) {
          req.style.display = 'block';
        }
      });

      reqText.forEach(req => {
        if (!req.classList.contains('requirement-confirm')) {
          req.style.display = 'block';
        }
      });

      if (senha.value === '' || senha.value == null) {
        reqIcon.forEach(req => {
          if (!req.classList.contains('requirement-confirm')) {
            req.style.display = 'none';
          }
        });

        reqText.forEach(req => {
          if (!req.classList.contains('requirement-confirm')) {
            req.style.display = 'none';
          }
        });
      }

      for (let i = 0; i < this.requirements.length; i++) {
        if (this.requirements[i].padrao.test(senha.value)) {
          reqIcon[i].style.color = 'var(--verde-principal)';
          reqIcon[i].classList.remove('bi-x');
          reqIcon[i].classList.add('bi-check');
          reqText[i].style.color = 'var(--verde-principal)';
        } else {
          reqIcon[i].style.color = 'var(--vermelho)';
          reqIcon[i].classList.remove('bi-check');
          reqIcon[i].classList.add('bi-x');
          reqText[i].style.color = 'var(--vermelho)';
        }
      }

      if (senhaConfirma.value !== '') {
        if (senha.value === senhaConfirma.value) {
          reqConfirma.forEach(req => {
            req.style.display = 'none';
          });
        } else {
          reqConfirma.forEach(req => {
            req.style.display = 'block';
          });
        }
      }

    });

    const senhaConfirma = document.querySelector('#senhaConfirma') as HTMLInputElement;
    const reqConfirma = document.querySelectorAll('.requirement-confirm') as NodeListOf<HTMLElement>;

    senhaConfirma.addEventListener('input', () => {

      reqConfirma.forEach(req => {
        req.style.display = 'block';
      });

      if (senhaConfirma.value === '' || senhaConfirma.value == null) {
        reqConfirma.forEach(req => {
          req.style.display = 'none';
        });
      }

      if (senha.value !== senhaConfirma.value) {
        reqConfirma[0].style.color = 'var(--vermelho)';
        reqConfirma[0].classList.remove('bi-check');
        reqConfirma[0].classList.add('bi-x');
        reqConfirma[1].style.color = 'var(--vermelho)';
      } else {
        reqConfirma.forEach(req => {
          req.style.display = 'none';
        });
      }
    });

  }

  senhaValidator(control: FormControl) {

    if (!control.root || !(<FormGroup>control.root).controls) {
      return null;
    }

    const isValid = /.{8,}/.test(control.value) &&
      /[A-Z]+/.test(control.value) &&
      /\d+/.test(control.value) &&
      /[$&+,:;=?@#|'<>.^*()%!-]+/.test(control.value);

    return isValid ? null : { required: true };

  }

  senhaConfirmaValidator(form: FormGroup) {

    const senha = form.get('conta.senha')?.value;
    const senhaConfirma = form.get('conta.senhaConfirma')?.value;

    if (!form || !form.controls) {
      return null;
    }

    return senha === senhaConfirma ? null : { required: true };

  }

  cadastrarEmpresa(): void {
    
  }

  ngOnInit(): void {
    this.validarFormatos();
    this.buscarEmpresa();
    this.buscarEndereco();
    PasswordFormatting.formatarCampoSenha();
    this.tratarSenha();
  }

  //TODO: enviar dados do formulário para o servidor
  onSubmit(): void {
    alert('Formulário enviadoo :3');
    alert(this.cadastroForm.valid);
    console.log(JSON.stringify(this.cadastroForm.value));
    if (this.cadastroForm.valid) {
      this.cadastrarEmpresa();
    }
  }

}
