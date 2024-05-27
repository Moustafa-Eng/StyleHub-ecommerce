import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [

    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) { }


  loginForm:FormGroup;

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
    });
  }

  login() {
    if (this.loginForm.valid) {
      const {username, password} = this.loginForm.value;
      this.authService.login(username, password).subscribe(
        response => {
          //console.log('Login response:', response); // Debugging
          if (response.success) {
            this.router.navigate(['/products']);
          } else {
            alert('Login failed');
          }
        },
        error => {
          //console.error('Login error', error);
          alert('An error occurred during login. Please try again.');
        }
      );
    }
  }
}
