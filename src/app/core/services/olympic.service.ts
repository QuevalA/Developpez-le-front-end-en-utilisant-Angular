import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Olympic} from "../models/Olympic";
import {OlympicViewModel} from "../models/OlympicViewModel";

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<OlympicViewModel[]>([]);

  constructor(private http: HttpClient) {
  }

  loadInitialData(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.processOlympicData(value)),
      catchError((error) => {
        console.error(error);
        this.olympics$.next([]);
        return [];
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  getOlympicById(id: string): Observable<OlympicViewModel | undefined> {
    const numericId = Number(id);

    return this.olympics$.asObservable().pipe(
      map((olympics: OlympicViewModel[]) => olympics.find((o) => o.id === numericId))
    );
  }


  getOlympicByCountryName(countryName: string): Observable<OlympicViewModel | undefined> {
    return this.olympics$.asObservable().pipe(
      map((olympics: OlympicViewModel[]) => olympics.find((o) => o.country === countryName))
    );
  }

  private processOlympicData(data: Olympic[]): void {
    const viewModels = data.map((olympic) => new OlympicViewModel(olympic));
    this.olympics$.next(viewModels);
  }
}
