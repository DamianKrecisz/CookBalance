import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseCrudService } from 'src/app/services/firebase-crud.service';
import { client } from 'src/app/interfaces/client';
import { ItemData } from 'src/app/interfaces/product'
@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {

  validateForm: FormGroup;
  client: string;
  ItemData: string;
  ItemsData: ItemData[];
  clients: client[];
  listOfControl: Array<{ id: number; controlInstance: string,  }> = [];
  @Output() order = new EventEmitter();
  action = "Save";
  
  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;
    
    const control = {
      id,
      controlInstance: `item${id}`,
    };
    const index = this.listOfControl.push(control);
    this.validateForm.addControl(
      this.listOfControl[index - 1].controlInstance,
      new FormControl(null, Validators.required));

  }

  removeField(i: { id: number; items:string; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      this.validateForm.removeControl(i.controlInstance);
    }

  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if ((this.validateForm.status) === "VALID") {
      this.action = "Saved"
      this.order.emit(this.validateForm.value);
    } else {
      this.action = "Save";
    }

  }

  constructor(private fb: FormBuilder, private firebaseService: FirebaseCrudService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      client: [null, [Validators.required]]

    });
    this.addField();

    this.firebaseService.getClients().subscribe(data => {
      this.clients = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as client;
      })
    });

    this.firebaseService.getItems().subscribe(data => {
      this.ItemsData = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as ItemData
      })
    })
  }

}

