import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-bmi',
  templateUrl: './client-bmi.component.html',
  styleUrls: ['./client-bmi.component.scss']
})
export class ClientBmiComponent implements OnInit {

  BMI:number;
  BMIdescription:String;
  listOfData = [];
  weight:number;
  height:number;
  
  constructor(
    public clientService: ClientService
  ) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(data => {
      this.listOfData = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } 
      })
      this.weight=this.listOfData[0].weight;
      this.height=this.listOfData[0].height;
      this.BMI= this.weight/(this.height/100*this.height/100);
    
    if(this.BMI <16){
      this.BMIdescription="wygłodzenie";
    }
    if(this.BMI >16 && this.BMI <16.99){
      this.BMIdescription="wychudzenie";
    }
    if(this.BMI >17 && this.BMI <18.49 ){
      this.BMIdescription="niedowaga";
    }
    if(this.BMI >18.5 && this.BMI <24.99 ){
      this.BMIdescription="wartość prawidłowa";
    }
    if(this.BMI >25 && this.BMI <29.99 ){
      this.BMIdescription="nadwaga";
    }
    if(this.BMI >30 && this.BMI <34.99 ){
      this.BMIdescription="I stopień otyłości";
    }
    if(this.BMI >35 && this.BMI <39.99 ){
      this.BMIdescription="II stopień otyłości";
    }
    if(this.BMI >40  ){
      this.BMIdescription="otyłość skrajna";
    }
  })
  }

}