import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegexValidations, PasswordFormatting } from '../../shared/form-utilities';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  loginForm: FormGroup;

  constructor (private formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      cnpj: ['', [Validators.required, Validators.maxLength(18)]],
      senha: ['', Validators.required]
    });
  }

  validarFormatos(): void {
    RegexValidations.validarCNPJ();
  }

  ngOnInit(): void {
    this.validarFormatos();
    PasswordFormatting.formatarCampoSenha();
  }

  onSubmit(): void {

  }

}
