import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgApexchartsModule } from 'ng-apexcharts';
import { NgChartsModule } from 'ng2-charts';
import { ChartistModule } from "ng-chartist";
import { NgxEchartsModule } from 'ngx-echarts';

import { UIModule } from '../../shared/ui/ui.module';
import { ChartRoutingModule } from './chart-routing.module';

import { StatistiquesComponent } from './statistiques/statistiques.component';


@NgModule({
  declarations: [StatistiquesComponent],
  imports: [
    CommonModule,
    ChartRoutingModule,
    UIModule,
    NgApexchartsModule,
    NgChartsModule,
    ChartistModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChartModule { }
