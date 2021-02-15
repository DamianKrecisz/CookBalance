import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: User;
  userEmail:string;
  hamburgerOpen=false;
  constructor(
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user;
      this.userEmail=user.email
    })
  }

  logout() {
    this.authService.SignOut();
  }
  hamburger(){
    if(this.hamburgerOpen==false){
      this.hamburgerOpen=true
    }else{
      this.hamburgerOpen=false;
    }
  }
  hideHamburger(){
    this.hamburgerOpen=false;

  }
}
