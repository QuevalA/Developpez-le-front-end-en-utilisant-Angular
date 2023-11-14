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
  private olympicUrl: string = './assets/mock/olympic.json';
  private olympics$: BehaviorSubject<OlympicViewModel[]> = new BehaviorSubject<OlympicViewModel[]>([]);

  constructor(private http: HttpClient) {
  }

  loadInitialData(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value: Olympic[]) => this.processOlympicData(value)),
      catchError((error) => {
        console.error(error);
        this.olympics$.next([]);
        return [];
      })
    );
  }

  getOlympics(): Observable<OlympicViewModel[]> {
    return this.olympics$.asObservable();
  }

  getOlympicById(id: string): Observable<OlympicViewModel | undefined> {
    const numericId: number = Number(id);

    return this.olympics$.asObservable().pipe(
      map((olympics: OlympicViewModel[]) => olympics.find((o: OlympicViewModel): boolean => o.id === numericId))
    );
  }

  private processOlympicData(data: Olympic[]): void {
    const viewModels: OlympicViewModel[] = data.map((olympic: Olympic) => new OlympicViewModel(olympic));
    this.olympics$.next(viewModels);
  }
}
