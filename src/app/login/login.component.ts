import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: any;
  hide = true;
  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router
  ) {
    document.cookie = 'authToken=' + '';
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  loginUser() {
    if (this.loginForm.valid) {
      let users = [];
      this.httpService.getUsers().subscribe((users) => {
        users.forEach((user: any) => {
          if (this.loginForm.controls.email.value == user.email) {
            document.cookie =
              'authToken=' + btoa(this.loginForm.controls.email.value);
            this.router.navigateByUrl('/');
          }
        });
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
