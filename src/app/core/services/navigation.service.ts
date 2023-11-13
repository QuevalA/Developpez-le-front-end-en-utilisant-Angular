import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {OlympicService} from './olympic.service';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router, private olympicService: OlympicService) {
  }
}
