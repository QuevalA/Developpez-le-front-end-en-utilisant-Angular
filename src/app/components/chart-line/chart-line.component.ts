import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.scss']
})
export class ChartLineComponent implements OnInit {
  @Input() olympicId: string | undefined;
  @Input() multi: any[] = [];

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

  xAxisTickFormatting(val: any): string {
    return parseInt(val, 10).toString();
  }

  ngOnInit(): void {
  }
}
