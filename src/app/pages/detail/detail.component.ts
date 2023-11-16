import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {OlympicService} from '../../core/services/olympic.service';
import {OlympicViewModel} from '../../core/models/OlympicViewModel';
import {concatMap, Subject, take, takeUntil, throwError} from "rxjs";
import {tap} from "rxjs/operators";
import {Participation} from "../../core/models/Participation";

export interface ChartLineModel {
  name: string;
  series: ChartLineSeries[];
}

export interface ChartLineSeries {
  name: string;
  value: number;
}

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
      .pipe(
        concatMap((params: Params) => {
          const olympicId = params['id'];

          // Check if the initial data has been loaded before proceeding
          if (olympicId) {
            return this.olympicService.getOlympicById(olympicId).pipe(
              tap((olympicData: OlympicViewModel | undefined): void => {
                if (!olympicData) {
                  this.router.navigate(['/not-found']);
                }
              }),
              take(1) // Complete the observable after the first emission
            );
          } else {
            return throwError('Olympic ID not present' as never);
          }
        }),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe({
        next: (olympicData: OlympicViewModel | undefined): void => {

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
                }),
              },
            ];
          }
        },
        error: (error): void => {
          console.error('Error fetching data:', error);
        }
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
