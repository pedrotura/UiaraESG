import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-senha-reset',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './senha-reset.component.html',
  styleUrl: './senha-reset.component.css'
})
export class SenhaResetComponent {

  resetForm: FormGroup;
  constructor (private formBuilder: FormBuilder) {
    this.resetForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {

  }

  onSubmit(): void {

  }

}
