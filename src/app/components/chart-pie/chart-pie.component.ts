import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OlympicViewModel} from "../../core/models/OlympicViewModel";

export interface ChartPieModel {
  name: string;
  value: number;
}

@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.scss']
})
export class ChartPieComponent implements OnInit {
  @Input() olympicData: OlympicViewModel[] = [];
  @Output() countrySelected: EventEmitter<number> = new EventEmitter<number>();

  // Chart configuration
  single: ChartPieModel[] | undefined;

  // Chart options
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    this.prepareChartData();
  }

  onSelect(data: ChartPieModel): void {
    const selectedOlympic: OlympicViewModel | undefined = this.olympicData.find(
      (item: OlympicViewModel): boolean => item.country === data.name);
    if (selectedOlympic) {
      this.countrySelected.emit(selectedOlympic.id);
    }
  }

  // Extract data for the chart according to its requirements
  private prepareChartData(): void {
    this.single = this.olympicData.map((country: OlympicViewModel) => {
      return {
        name: country.country,
        value: country.totalMedals || 0,
      };
    });
  }
}
