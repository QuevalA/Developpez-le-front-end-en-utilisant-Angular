import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Olympic} from "../../core/models/Olympic";
import {OlympicService} from "../../core/services/olympic.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  olympic: Olympic | undefined;
  olympicId = this.route.snapshot.params['id'];
  totalAthletes: number = 0;

  constructor(private route: ActivatedRoute, private olympicService: OlympicService) {
  }

  ngOnInit(): void {
    this.olympicService.getOlympicById(this.olympicId).subscribe(olympicData => {

      if (olympicData) {
        this.olympic = olympicData;

        // Calculate the total number of athletes
        this.totalAthletes = olympicData.participations.reduce((total, participation) => total + participation.athleteCount, 0);
      }
    });
  }
}
