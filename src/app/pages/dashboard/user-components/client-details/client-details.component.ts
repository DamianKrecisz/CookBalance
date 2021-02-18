import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  user$ = this.authService.user$;

  email: string;
  sex: string;
  sexOption: string;
  weight: number;
  weightOption: number;
  height: number;
  heightOption: number;
  dateOfBirthday: any;
  dateOfBirthdayOption: any;
  activity: string;
  activityOption: string;
  confirmPassword: string;
  uid: string;
  name;
  isVisibleSex = false;
  isVisibleWeight = false;
  isVisibleHeight = false;
  isVisibleDateOfBirthday = false;
  isVisibleActivity = false;
  bmi;
  bmi_description;
  calories;
  activitiesList;
  activityToDisplay;
  isVisibleDeleteAccount = false;
  registerType:string;
  bmiDescription:string;
  constructor(
    public authService: AuthService,
    public clientService: ClientService,
    public databaseService: DatabaseService,
    private nzMessageService: NzMessageService
  ) { }

  ngOnInit() {

    this.user$.subscribe(data => {
      this.uid = data.uid;
      this.email = data.email;
      this.sex = data.sex;
      this.weight = data.weight;
      this.height = data.height;
      this.dateOfBirthday = data.dateOfBirthday;
    })
    this.registerType=this.authService.userData.providerData[0].providerId
    const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
    let dataTemp;
    this.clientService.getCurrentClient(userFromLocalStorage.uid).subscribe(data => {
      dataTemp = data;
      this.uid = dataTemp.uid;
      this.email = dataTemp.email;
      this.sex = dataTemp.sex;
      this.weight = dataTemp.weight;
      this.height = dataTemp.height;
      this.dateOfBirthday = dataTemp.dateOfBirthday;
      this.name = dataTemp.name;
      if (this.weight != null && this.height != null) {
        this.bmi = ((this.weight) / ((this.height / 100) * (this.height / 100))).toPrecision(4);
        if(this.bmi<18.4){
            this.bmiDescription="Underweight";
        }else if(this.bmi>=18.5 && this.bmi < 24.9){
          this.bmiDescription="Normal and Healthy Weight";
        } else if(this.bmi >= 25 && this.bmi < 29.9){
          this.bmiDescription="Overweight";
        }else if(this.bmi >=30){
          this.bmiDescription="Obese";
        }
      }
      this.activity = dataTemp.activity;
      var today = new Date();
      var age = today.getFullYear() - (this.dateOfBirthday.toDate()).getFullYear()

      if (this.sex == "men") {
        this.calories = ((66.5 + (13.7 * this.weight) + (5 * this.height) - (6.8 * age)) * Number(this.activity)).toFixed(0);
      } else if (this.sex == "women") {
        this.calories = ((655 + (9.6 * this.weight) + (1.8 * this.height) - (4.7 * age)) * Number(this.activity)).toFixed(0);
      }


    })
    this.updateItem();
  }
  confirmDeleteGoogleAccount(){
    this.authService.deleteAccount();
  }
  updateItem() {
    this.databaseService.getAllActivities().subscribe(data => {
      this.activitiesList = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Object
        }
      })
      this.activitiesList.forEach(element => {
        if (element.value == this.activity) {
          this.activityToDisplay = element.details;
        }
      });
    })
  }

  showModalSex(): void {
    this.isVisibleSex = true;
  }
  handleOkSex(): void {
    this.isVisibleSex = false;
    this.clientService.updateSexClient(this.uid, this.sexOption);
  }
  handleCancelSex(): void {
    this.isVisibleSex = false;
  }

  showModalWeight(): void {
    this.isVisibleWeight = true;
  }
  handleOkWeight(): void {
    this.isVisibleWeight = false;
    this.clientService.updateWeightClient(this.uid, this.weightOption);
  }
  handleCancelWeight(): void {
    this.isVisibleWeight = false;
  }

  showModalHeight(): void {
    this.isVisibleHeight = true;
  }
  handleOkHeight(): void {
    this.isVisibleHeight = false;
    this.clientService.updateHeightClient(this.uid, this.heightOption);
  }
  handleCancelHeight(): void {
    this.isVisibleHeight = false;
  }

  showModalDateOfBirthday(): void {
    this.isVisibleDateOfBirthday = true;
  }
  handleOkDateOfBirthday(): void {
    this.isVisibleDateOfBirthday = false;
    this.clientService.updateDateOfBirthdayClient(this.uid, this.dateOfBirthdayOption);
  }
  handleCancelDateOfBirthday(): void {
    this.isVisibleDateOfBirthday = false;
  }


  showModalActivity(): void {
    this.isVisibleActivity = true;
  }
  handleOkActivity(): void {
    this.isVisibleActivity = false;
    this.clientService.updateActivityClient(this.uid, this.activityOption);
    this.updateItem();
    this.activity = this.activityOption;
  }
  handleCancelActivity(): void {
    this.isVisibleActivity = false;
  }


  confirmChangePassword(): void {
    this.nzMessageService.success('Reset link are send to your e-mail addres');
    this.authService.resetPassword(this.authService.userData.email);
  }
  showModalDeleteAccount() {
    this.isVisibleDeleteAccount = true;
  }
  handleOkDeleteAccount(): void {
    this.isVisibleDeleteAccount = false;
    this.authService.verifyPasswordAndDeleteUser(this.authService.userData.email, this.confirmPassword);

  }
  handleCancelDeleteAccount(): void {
    this.isVisibleDeleteAccount = false;
  }
}
