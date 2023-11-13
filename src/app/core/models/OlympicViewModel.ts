// ViewModel for presentations including calculated properties
import {Olympic} from './Olympic';

export class OlympicViewModel extends Olympic {
  totalMedals: number | undefined;
  totalAthletes: number = 0;

  constructor(olympic: Olympic) {
    super();
    this.id = olympic.id;
    this.country = olympic.country;
    this.participations = olympic.participations;
    this.totalMedals = this.calculateTotalMedals();
    this.totalAthletes = this.calculateTotalAthletes();
  }

  private calculateTotalMedals(): number {
    return this.participations.reduce((acc, participation) => acc + participation.medalsCount, 0);
  }

  private calculateTotalAthletes(): number {
    return this.participations.reduce((acc, participation) => acc + participation.athleteCount, 0);
  }
}
