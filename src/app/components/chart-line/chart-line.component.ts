import {Component, Input} from '@angular/core';
import {ChartLineModel} from "../../pages/detail/detail.component";

@Component({
  selector: 'app-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.scss']
})
export class ChartLineComponent {
  @Input() olympicId: string | undefined;
  @Input() multi: ChartLineModel[] = [];

  // Chart options
  legend: boolean = false;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dates';
  timeline: boolean = false;

  constructor() {
  }

  // Format years on chart
  xAxisTickFormatting(val: string): string {
    return parseInt(val, 10).toString();
  }
}
