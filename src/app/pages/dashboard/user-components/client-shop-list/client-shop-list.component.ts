import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-client-shop-list',
  templateUrl: './client-shop-list.component.html',
  styleUrls: ['./client-shop-list.component.scss']
})
export class ClientShopListComponent implements OnInit {

  shopList = [];
  shopListTemp;
  shopListToDisplay = [];
  itemToDisplay;
  showList = false;

  constructor(
    private databaseService: DatabaseService,
    private authService: AuthService,
    private nzMessageService: NzMessageService
  ) { }

  ngOnInit() {
    this.databaseService.getAllShopList().subscribe(data => {
      this.shopList = [];
      this.shopListTemp = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Object
        }
      })
      this.shopListTemp.forEach(el => {
        if (el.userID == this.authService.userData.uid) {
          this.shopList.push(el);
        }
      });
    })
  }
  showCheckList(item) {
    this.itemToDisplay = item;
    this.shopListToDisplay = item.itemList;
    this.showList = true;
  }

  deleteShopList() {
    this.nzMessageService.info('Pomyślnie usunięto');
    this.databaseService.deleteShopList(this.itemToDisplay.id);
  }
  
  dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }

  checkItem(item, index) {
    let elementToUpdate;
    if (item.checked == true) {
      this.itemToDisplay.itemList[index].checked = false;
    } else {
      this.itemToDisplay.itemList[index].checked = true;
    }
    (this.itemToDisplay.itemList).sort(this.dynamicSort("checked"))
    elementToUpdate = this.itemToDisplay;
    this.databaseService.updateList(elementToUpdate);
  }

}
