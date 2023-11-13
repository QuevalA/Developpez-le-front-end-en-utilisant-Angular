import {Component, OnInit} from '@angular/core';
import {OlympicService} from 'src/app/core/services/olympic.service';
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> | undefined;

  constructor(private olympicService: OlympicService, private router: Router,) {
  }

  ngOnInit(): void {
    this.olympicService.loadInitialData().subscribe(() => {
      this.olympics$ = this.olympicService.getOlympics();
    });
  }

  onCountrySelected(countryId: number): void {
    this.router.navigate(['/country', countryId]);
  }
}
