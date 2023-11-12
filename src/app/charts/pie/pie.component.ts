import {Component, Input, OnInit} from '@angular/core';
import {OlympicService} from "../../core/services/olympic.service";
import {Router} from "@angular/router";
import {Olympic} from "../../core/models/Olympic";

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {
  @Input()
  olympic: Olympic | undefined;
  completeData: any[] | undefined;

// Chart configuration
  single: any[] | undefined;
  view: [number, number];

// Chart options
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  constructor(private olympicService: OlympicService, private router: Router) {
    this.view = [1000, 600];
  }

  loadOlympicData() {
    this.olympicService.getOlympics().subscribe((olympicData: Olympic[]) => {
      if (olympicData) {
        const countryData = olympicData.map((country) => {
          return {
            id: country.id,
            name: country.country,
            totalMedals: country.totalMedals,
          };
        });

        this.completeData = countryData;

        // Extract the required information for the "single" variable
        this.single = countryData.map((item) => {
          return {
            name: item.name,
            value: item.totalMedals,
          };
        });
      }
    });
  }

  onSelect(data: any): void {
    this.olympicService.getOlympicByCountryName(data.name).subscribe((olympic) => {
      this.olympic = olympic;

      if (this.olympic && this.olympic.id && this.completeData) {
        const countryId = this.olympic.id;
        const countryData = this.completeData.find((item) => item.id === countryId);

        if (countryData) {
          this.router.navigate(['/country', countryId]).then(() => {
          }).catch((error) => {
            console.error('Navigation error:', error);
          });
        }
      }
    });
  }

  ngOnInit(): void {
    this.loadOlympicData();
  }
}
