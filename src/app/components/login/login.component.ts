import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public loginForm!: FormGroup;

  public constructor(private fb: FormBuilder) {
    this.loginForm = fb.group({
      user: ['', Validators.required, Validators.email],
      password: ['', Validators.required]
    });
  }

  
}
