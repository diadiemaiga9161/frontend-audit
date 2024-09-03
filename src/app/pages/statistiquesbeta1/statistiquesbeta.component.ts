import { Component, OnInit } from '@angular/core';
import {
  linewithDataChart, basicColumChart, columnlabelChart, lineColumAreaChart,
  basicRadialBarChart, simplePieChart, donutChart, barChart, splineAreaChart, dashedLineChart,dumbbellTimelineCharts,funnelCharts,dumbbellcolumnCharts,rangeareaChart
} from './data';
import { ChartType } from './apex.model';
@Component({
  selector: 'app-statistiquesbeta',
  templateUrl: './statistiquesbeta.component.html',
  styleUrls: ['./statistiquesbeta.component.scss']
})
export class StatistiquesbetaComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  
  linewithDataChart: ChartType;
  basicColumChart: ChartType;
  columnlabelChart: ChartType;
  lineColumAreaChart: ChartType;
  basicRadialBarChart: ChartType;
  simplePieChart: ChartType;
  donutChart: ChartType;
  barChart: ChartType;
  splineAreaChart: ChartType;
  dashedLineChart: ChartType;
  dumbbellTimelineCharts: ChartType;
  funnelCharts: ChartType;
  dumbbellcolumnCharts: ChartType;
  rangeareaChart: ChartType;

  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Charts' }, { label: 'Apex charts', active: true }];

    /**
     * Fethches the chart data
     */
    this._fetchData();
  }

  /**
   * Fetches the chart data
   */
  private _fetchData() {
    this.linewithDataChart = linewithDataChart;
    this.basicColumChart = basicColumChart;
    this.columnlabelChart = columnlabelChart;
    this.lineColumAreaChart = lineColumAreaChart;
    this.basicRadialBarChart = basicRadialBarChart;
    this.simplePieChart = simplePieChart;
    this.donutChart = donutChart;
    this.barChart = barChart;
    this.splineAreaChart = splineAreaChart;
    this.dashedLineChart = dashedLineChart;
    this.dumbbellTimelineCharts = dumbbellTimelineCharts;
    this.funnelCharts = funnelCharts;
    this.dumbbellcolumnCharts = dumbbellcolumnCharts;
    this.rangeareaChart = rangeareaChart;
  }
}
