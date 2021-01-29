import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss']
})
export class ClientDashboardComponent implements OnInit {

  name;


  constructor(
    public databaseService: DatabaseService,
    public authService: AuthService,
    public clientService: ClientService

  ) { 
  }

  ngOnInit() {
    const myData = JSON.parse(localStorage.getItem('user'));
    this.clientService.getCurrentClient(myData.uid).subscribe(data=>{
      let x;
      x=data;
      this.name=x.name;
    })
  }
 
  logout(){
    console.log("logout")
    this.authService.SignOut();
  }

}
