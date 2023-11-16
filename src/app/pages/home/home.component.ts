import {Component, OnInit} from '@angular/core';
import {OlympicService} from 'src/app/core/services/olympic.service';
import {Observable, Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {OlympicViewModel} from "../../core/models/OlympicViewModel";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$!: Observable<OlympicViewModel[]>;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private olympicService: OlympicService, private router: Router,) {
  }

  ngOnInit(): void {
    this.olympicService
      .loadInitialData()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((): void => {
        this.olympics$ = this.olympicService.getOlympics();
      });
  }

  //Navigate to Detail page about clicked country from pie chart
  onCountrySelected(countryId: number): void {
    this.olympicService.getOlympics().pipe(takeUntil(this.ngUnsubscribe)).subscribe((): void => {
      this.router.navigate(['/country', countryId]);
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
