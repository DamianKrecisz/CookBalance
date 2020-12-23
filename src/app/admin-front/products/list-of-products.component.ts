import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { ItemData } from 'src/app/interfaces/product';
import { FirebaseCrudService } from 'src/app/services/firebase-crud.service';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-list-of-products',
  templateUrl: './list-of-products.component.html',
  styleUrls: ['./list-of-products.component.scss']
})
export class ListOfProductsComponent implements OnInit {
  
  validateForm: FormGroup;
  productsCollecton: AngularFirestoreCollection<ItemData>;

  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {};
  listOfData: ItemData[] = [];

  isVisible:boolean = false;
  isOkLoading:boolean = false;

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private firebaseService: FirebaseCrudService,
    private modalService: NzModalService,

  ) {
    this.productsCollecton = afs.collection<ItemData>('items');
  }

  ngOnInit(): void {

    this.validateForm = this.fb.group({
      product: [null, [Validators.required]],
      qty: [null, [Validators.required]],
      warehouse: [null, [Validators.required]]
    })

    this.firebaseService.getItems().subscribe(data => {
      this.listOfData = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as ItemData;
      })
      this.updateEditCache();
    })

  }

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  deleteItem(id: string): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure delete this item?',
      nzOkText: 'Yes',
      nzOkType: 'warning',
      nzOnOk: () => this.firebaseService.deleteItem(id),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    })
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
    this.firebaseService.updateItem(this.editCache[id].data.id,this.editCache[id].data);
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {  
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 500);
    this.productsCollecton.add(this.validateForm.value);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  search(e): void {
    if (e == '') {
      this.firebaseService.getItems().subscribe(data => {
        this.listOfData = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as ItemData;
        })
  
      })
    } else {
      this.listOfData = this.listOfData.filter(
        item => item.product.indexOf(e) !== -1 || item.warehouse.indexOf(e) !== -1
      );

    }
  }

}
