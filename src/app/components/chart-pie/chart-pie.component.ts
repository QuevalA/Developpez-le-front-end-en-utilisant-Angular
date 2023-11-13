import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OlympicViewModel} from "../../core/models/OlympicViewModel";

@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.scss']
})
export class ChartPieComponent implements OnInit {
  @Input() olympicData: OlympicViewModel[] = [];
  completeData: any[] | undefined;

  // Chart configuration
  single: any[] | undefined;
  view: [number, number];

  // Chart options
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  @Output() countrySelected: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
    this.view = [1000, 600];
  }

  ngOnInit(): void {
    this.prepareChartData();
  }

  onSelect(data: any): void {
    const selectedOlympic = this.olympicData.find((item) => item.country === data.name);
    if (selectedOlympic) {
      this.countrySelected.emit(selectedOlympic.id);
    }
  }

  private prepareChartData(): void {
    const countryData = this.olympicData.map((country) => {
      return {
        id: country.id,
        name: country.country,
        totalMedals: country.totalMedals,
      };
    });

    this.completeData = countryData;

    // Extract data for the chart according to its requirements
    this.single = countryData.map((item) => {
      return {
        name: item.name,
        value: item.totalMedals,
      };
    });
  }
}
