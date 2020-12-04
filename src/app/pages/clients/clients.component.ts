import { Component, OnInit } from '@angular/core';
import { FirebaseCrudService } from 'src/app/services/firebase-crud.service';
import { client } from 'src/app/interfaces/client';
import { NzModalService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})

export class ClientsComponent implements OnInit {

  isVisible:boolean = false;
  addClientModal:boolean = false;
  isOkLoading:boolean = false;

  validateForm: FormGroup;
  listOfData: client[];
  clientsCollecton: AngularFirestoreCollection<client>;
  editCache: { [key: string]: { edit: boolean; data: client } } = {};
  
  constructor(
    private firebaseService: FirebaseCrudService,
    private modalService: NzModalService,
    private fb: FormBuilder,
    private afs: AngularFirestore) {
    this.clientsCollecton = afs.collection<client>('clients');
  }

  ngOnInit() {
    this.firebaseService.getClients().subscribe(data => {
      this.listOfData = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as client;
      })
      this.updateEditCache();

    })
    this.validateForm = this.fb.group({
      clientName: [null, [Validators.required]],
      address: [null, [Validators.required]],
      tax: [null, [Validators.required]]
    })
  }

  deleteClient(id: string): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure delete this client?',
      nzOkText: 'Yes',
      nzOkType: 'warning',
      nzOnOk: () => this.firebaseService.deleteClient(id),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    })
  }

  
  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  saveEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;
    this.firebaseService.updateItem(this.editCache[id].data.id, this.editCache[id].data);
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }


  handleAddOk(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.isOkLoading = true;
    setTimeout(() => {
      this.isOkLoading = false;
    }, 500);
    if (this.validateForm.valid) {
      this.clientsCollecton.add(this.validateForm.value);
      this.validateForm.reset();
      this.addClientModal = false;

    } 
  }

  handleCancel(): void {
    this.isVisible = false;
    this.addClientModal = false;

  }

  addNewClient(): void{
    this.addClientModal = true;
  }

  search(e): void {
    if (e == '') {
      this.firebaseService.getClients().subscribe(data => {
        this.listOfData = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as client;
        })
      });
    } else {
      this.listOfData = this.listOfData.filter(
        item => item.clientName.indexOf(e) !== -1
      );
    }
  }
  
}
