import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent {

  loginForm: FormGroup;
  error = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);

  }

  onSubmit() {
    const { email, password } = this.loginForm.value;
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.find((u: any) => u.email === email);

    if (!userExists) {
      this.error = 'User not registered. Redirecting to register...';
      setTimeout(() => this.router.navigate(['/register']), 2000); // 2s delay to show message
    } else if (this.auth.login(email, password)) {
      this.router.navigate(['/profile']);
    } else {
      this.error = 'Invalid credentials';
    }
  }
}
