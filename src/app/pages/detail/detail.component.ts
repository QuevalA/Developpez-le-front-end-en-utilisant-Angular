import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {OlympicService} from '../../core/services/olympic.service';
import {OlympicViewModel} from '../../core/models/OlympicViewModel';
import {Subject, takeUntil} from "rxjs";
import {Participation} from "../../core/models/Participation";
import {ChartLineModel, ChartLineSeries} from "../../core/models/ChatLineModel";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  olympic: OlympicViewModel | undefined;
  multi: ChartLineModel[] | undefined;
  olympicId: string | undefined;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private olympicService: OlympicService,
  ) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((params: Params): void => {
        const olympicId = params['id'];

        if (olympicId) {
          this.olympicService.getOlympicById(olympicId)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((olympicData: OlympicViewModel | undefined): void => {

              if (olympicData) {
                this.olympic = new OlympicViewModel(olympicData);

                this.multi = [
                  {
                    name: olympicData.country,
                    series: olympicData.participations.map((participation: Participation) => {
                      return {
                        name: participation.year.toString(),
                        value: participation.medalsCount,
                      };
                    }) as ChartLineSeries[],
                  },
                ];
              } else {
                this.router.navigate(['/not-found']);
              }
            });
        }
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
