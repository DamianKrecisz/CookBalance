import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {

  loginForm: FormGroup;
  registerForm: FormGroup;

  rightPanelActive: boolean = false;


  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
    this.registerForm = this.fb.group({
      usernameRegister: [null, [Validators.required]],
      passwordRegister: [null, [Validators.required]],
    });
  }

  changeMethodVisible() {
    if (this.rightPanelActive == false) {
      this.rightPanelActive = true;
    } else {
      this.rightPanelActive = false;
    }
  }

  temporarilyUnavailable() {
    this.createNotification('warning', 'Service temporary unavaliable  !', 'Sorry, the login method is currently unavailable. Please try another one. Sorry for the inconvenience.')
  }

  createNotification(type: string, title: string, description: string): void {
    this.notification.create(
      type,
      title,
      description
    );
  }

}
