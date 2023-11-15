import {Component, HostListener, Input} from '@angular/core';
import {ChartLineModel} from "../../pages/detail/detail.component";

@Component({
  selector: 'app-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.scss']
})
export class ChartLineComponent {
  @Input() olympicId: string | undefined;
  @Input() multi: ChartLineModel[] = [];

  // Chart configuration
  view: [number, number];

  // Chart options
  legend: boolean = false;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dates';
  timeline: boolean = false;

  constructor() {
    this.view = [1000, 600];
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.resizeChart((event.target as Window).innerWidth);
  }

  public resizeChart(width: any): void {
    this.view = [width, 320];
  }

  xAxisTickFormatting(val: string): string {
    return parseInt(val, 10).toString();
  }
}
