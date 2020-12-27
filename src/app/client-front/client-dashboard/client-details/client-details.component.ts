import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  user$ = this.authService.user$;

  email:string;
  sex:string;
  sexOption:string;
  weight:number;
  weightOption:number;
  height:number;
  heightOption:number;
  dateOfBirthday:Date;
  dateOfBirthdayOption:Date;
  activity:string;
  activityOption:string;
  uid:string;

  isVisibleSex = false;
  isVisibleWeight =false;
  isVisibleHeight =false;
  isVisibleDateOfBirthday=false;
  isVisibleActivity=false;
  listOfData: User[];

  constructor(
    public authService: AuthService,
    public clientService: ClientService
  ) { }

  ngOnInit() {
    
    this.user$.subscribe(data=>{
      this.uid=data.uid;
      this.email=data.email;
      this.sex=data.sex;
      this.weight=data.weight;
      this.height=data.height;
    })
    this.clientService.getClients().subscribe(data => {
      this.listOfData = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } 
      })
      this.uid=this.listOfData[0].uid;
      this.email=this.listOfData[0].email;
      this.sex=this.listOfData[0].sex;
      this.weight=this.listOfData[0].weight;
      this.height=this.listOfData[0].height;
      this.dateOfBirthday=this.listOfData[0].dateOfBirthday;
      this.activity=this.listOfData[0].activity;
    })
    
  }

  

  showModalSex(): void {
    this.isVisibleSex = true;
  }
  handleOkSex(): void {
    this.isVisibleSex = false;
    this.clientService.updateSexClient(this.uid,this.sexOption);
  }
  handleCancelSex(): void {
    this.isVisibleSex = false;
  }

  showModalWeight(): void {
    this.isVisibleWeight = true;
  }
  handleOkWeight(): void {
    this.isVisibleWeight = false;
    this.clientService.updateWeightClient(this.uid,this.weightOption);
  }
  handleCancelWeight(): void {
    this.isVisibleSex = false;
  }

  showModalHeight(): void {
    this.isVisibleHeight = true;
  }
  handleOkHeight(): void {
    this.isVisibleHeight = false;
    this.clientService.updateHeightClient(this.uid,this.heightOption);
  }
  handleCancelHeight(): void {
    this.isVisibleSex = false;
  }

  showModalDateOfBirthday(): void {
    this.isVisibleDateOfBirthday = true;
  }
  handleOkDateOfBirthday(): void {
    this.isVisibleDateOfBirthday = false;
    console.log(this.dateOfBirthdayOption)
    this.clientService.updateDateOfBirthdayClient(this.uid,this.dateOfBirthdayOption);
  }
  handleCancelDateOfBirthday(): void {
    this.isVisibleSex = false;
  }
 

  showModalActivity(): void {
    this.isVisibleActivity = true;
  }
  handleOkActivity(): void {
    this.isVisibleActivity = false;
    console.log(this.activityOption)
    this.clientService.updateActivityClient(this.uid,this.activityOption);
  }
  handleCancelActivity(): void {
    this.isVisibleSex = false;
  }

}
