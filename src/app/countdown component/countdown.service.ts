import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  private endDate = new BehaviorSubject<Date | null>(null);
  endDate$ = this.endDate.asObservable();

  setEndDate(date: Date) {
    this.endDate.next(date);
    localStorage.setItem('endDate', date.toISOString());
  }

  getEndDate(): Date | null {
    const storedDate = localStorage.getItem('endDate');
    return storedDate ? new Date(storedDate) : null;
  }

  constructor() {
    const storedDate = this.getEndDate();
    if (storedDate) {
      this.setEndDate(storedDate);
    }
  }
}
