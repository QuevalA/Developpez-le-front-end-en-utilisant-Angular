import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {Olympic} from '../models/Olympic';
import {OlympicViewModel} from '../models/OlympicViewModel';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl: string = './assets/mock/olympic.json';
  private olympics$: BehaviorSubject<OlympicViewModel[]> = new BehaviorSubject<OlympicViewModel[]>([]);
  private dataLoaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }

  loadInitialData(): Observable<void> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value: Olympic[]): void => {
        this.processOlympicData(value);
        this.dataLoaded$.next(true);
      }),
      catchError((error) => {
        console.error(error);
        this.olympics$.next([]);
        this.dataLoaded$.next(true); // Mark as loaded even in case of an error
        return throwError(() => new Error('Error loading initial data'));
      }),
      switchMap(() => of(void 0))
    );
  }

  getOlympics(): Observable<OlympicViewModel[]> {
    return this.olympics$.asObservable();
  }

  // Those 2 "getOlympicById" methods allow the Detail page to load properly when accessed via direct URL
  getOlympicById(id: string): Observable<OlympicViewModel | undefined> {

    return this.dataLoaded$.pipe(
      switchMap((isLoaded: boolean): Observable<OlympicViewModel | undefined> => {
        if (!isLoaded) {
          return this.loadInitialData().pipe(
            switchMap(() => this.getOlympicByIdFromData(id))
          );
        } else {
          return this.getOlympicByIdFromData(id);
        }
      })
    );
  }

  private getOlympicByIdFromData(id: string): Observable<OlympicViewModel | undefined> {
    return this.olympics$.pipe(
      switchMap((olympics: OlympicViewModel[]) => of(olympics.find((o: OlympicViewModel): boolean => o.id === Number(id)))),
      catchError(() => of(undefined))
    );
  }

  private processOlympicData(data: Olympic[]): void {
    const viewModels: OlympicViewModel[] = data.map((olympic: Olympic) => new OlympicViewModel(olympic));
    this.olympics$.next(viewModels);
  }
}
