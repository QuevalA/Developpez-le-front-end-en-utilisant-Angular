import {Component, OnInit} from '@angular/core';
import {Olympic} from "../../core/models/Olympic";
import {ActivatedRoute} from "@angular/router";
import {OlympicService} from "../../core/services/olympic.service";

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit {
  olympic: Olympic | undefined;
  olympicId = this.route.snapshot.params['id'];

// Chart configuration
  multi: any[] = [];

// Chart options
  legend: boolean = false;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dates';
  timeline: boolean = false;

  constructor(private route: ActivatedRoute, private olympicService: OlympicService) {
  }

  xAxisTickFormatting(val: any): string {
    // Assuming val is a year in the format "2,015"
    return parseInt(val, 10).toString(); // This will remove the comma
  }

  ngOnInit(): void {
    this.olympicService.getOlympicById(this.olympicId).subscribe(olympicData => {

      if (olympicData) {
        this.olympic = olympicData;

        this.multi = [{
          name: olympicData.country,
          series: olympicData.participations.map(participation => {
            return {
              name: participation.year,
              value: participation.medalsCount
            };
          })
        }];
      }
    });
  }
}
