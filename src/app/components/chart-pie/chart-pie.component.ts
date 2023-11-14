import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OlympicViewModel} from "../../core/models/OlympicViewModel";
import {ChartPieModel} from "../../core/models/ChatPieModel";

@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.scss']
})
export class ChartPieComponent implements OnInit {
  @Input() olympicData: OlympicViewModel[] = [];

  // Chart configuration
  single: ChartPieModel[] | undefined;
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

  onSelect(data: ChartPieModel): void {
    const selectedOlympic: OlympicViewModel | undefined = this.olympicData.find((item: OlympicViewModel): boolean => item.country === data.name);
    if (selectedOlympic) {
      this.countrySelected.emit(selectedOlympic.id);
    }
  }
  
  private prepareChartData(): void {
    // Extract data for the chart according to its requirements
    this.single = this.olympicData.map((country: OlympicViewModel) => {
      return {
        name: country.country,
        value: country.totalMedals || 0,
      };
    });
  }
}
