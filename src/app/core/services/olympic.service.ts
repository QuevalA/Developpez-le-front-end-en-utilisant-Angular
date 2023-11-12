import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Olympic} from "../models/Olympic";

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<any>(undefined);

  constructor(private http: HttpClient) {
  }

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => {
        // Calculate totalMedals for each Olympic and update the list
        value = value.map((olympic) => {
          olympic.totalMedals = olympic.participations.reduce((acc, participation) => acc + participation.medalsCount, 0);
          return olympic;
        });

        this.olympics$.next(value);
      }),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  getOlympicById(id: string): Observable<Olympic | undefined> {
    // Convert the passed id (string) to a number
    const numericId = Number(id);

    return this.olympics$.asObservable().pipe(
      map((olympics: Olympic[] | null) => {
        if (olympics && !isNaN(numericId)) {
          return olympics.find((o) => o.id === numericId);
        }
        return undefined;
      })
    );
  }

  getOlympicByCountryName(countryName: string): Observable<Olympic | undefined> {
    return this.olympics$.asObservable().pipe(
      map((olympics: Olympic[] | null) => {
        if (olympics) {
          return olympics.find((o) => o.country === countryName);
        }
        return undefined;
      })
    );
  }
}
