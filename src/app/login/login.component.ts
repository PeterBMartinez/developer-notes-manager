import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: Boolean = false;

  constructor(private formBuilder: FormBuilder, private user: UserService, private router: Router) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    this.submitted = true;
    const {email, password} = this.loginForm.value;
    if (this.loginForm.invalid) {
      return;
    }
    this.user.login({user: {email, password}}).subscribe(() => 
      {
        this.router.navigateByUrl('/new-note');
      }
    );
  }
  
}
