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

  breadCrumbItems: Array<{}>;

  ordersData: Orders[];

  orders$: Observable<Orders[]>;
  total: Observable<number>;
  @ViewChildren(OrderSortableService) headers: QueryList<OrderSortableService>;

  constructor(public service: OrderService) {
    this.orders$ = service.orders$;
    this.total = service.total$;
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Crypto' }, { label: 'Orders', active: true }];

    this.ordersData = ordersData;
  }

  /**
  * Sort table data
  * @param param0 sort the column
  *
  */
  onSort({ column, direction }: SortEvent) {
  
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

}
