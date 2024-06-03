import { Component, QueryList, ViewChildren } from '@angular/core';
import { ordersData } from '../crypto/orders/data';
import { OrderService } from '../crypto/orders/orders.service';
import { Observable } from 'rxjs';
import { OrderSortableService, SortEvent } from '../crypto/orders/orders-sortable.directive';
import { Orders } from '../crypto/orders/orders.model';

@Component({
  selector: 'app-campagnes',
  templateUrl: './campagnes.component.html',
  styleUrls: ['./campagnes.component.scss']
})
export class CampagnesComponent {
  selectedTab: string = 'profil'


  changeTab(tab: string) {
    this.selectedTab = tab;
  }

  isTabActive(tab: string): boolean {
    return this.selectedTab === tab;
  }

}
