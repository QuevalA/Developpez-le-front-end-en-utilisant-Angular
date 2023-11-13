import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {OlympicService} from '../../core/services/olympic.service';
import {OlympicViewModel} from '../../core/models/OlympicViewModel';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  olympic: OlympicViewModel | undefined;
  multi: any[] = [];
  olympicId: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private olympicService: OlympicService,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const olympicId = params['id'];
      if (olympicId) {
        this.olympicService.getOlympicById(olympicId).subscribe((olympicData) => {
          if (olympicData) {
            this.olympic = new OlympicViewModel(olympicData);

            this.multi = [
              {
                name: olympicData.country,
                series: olympicData.participations.map((participation) => {
                  return {
                    name: participation.year,
                    value: participation.medalsCount,
                  };
                }),
              },
            ];
          } else {
            console.log('Country not found, redirecting to NotFoundComponent');
            this.router.navigate(['/not-found']);
          }
        });
      }
    });
  }
}
