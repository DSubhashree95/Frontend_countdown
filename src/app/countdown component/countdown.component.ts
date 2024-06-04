import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { CountdownService } from './countdown.service';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],  
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatCardModule, MatDatepickerModule, MatNativeDateModule ],
   providers: [DatePipe]
})
 export class CountdownComponent {
  eventName: string = '';
  eventTitle: string = '';
  endDate: Date | null = null;
  formattedEndDate: string = '';
  remainingTime: string = '';

  constructor(
    private countdownService: CountdownService, 
    private datePipe: DatePipe) {}

    ngOnInit(): void {
      this.endDate = this.countdownService.getEndDate();
      this.eventName = localStorage.getItem('eventName') || '';
      this.eventTitle = localStorage.getItem('eventTitle') || '';
      if (this.endDate) {
        this.formattedEndDate = this.formatDate(this.endDate);
        this.startCountdown();
      } 
    }

    onSetEndDate(eventNameInput: HTMLInputElement, dateInput: Date | null) {
      this.eventName = eventNameInput.value;
      if (dateInput) {
        this.endDate = dateInput;
        this.formattedEndDate = this.formatDate(this.endDate);
        this.countdownService.setEndDate(this.endDate);
        localStorage.setItem('eventName', this.eventName);
        localStorage.setItem('eventTitle', this.eventTitle);
        this.startCountdown();
      }
    }

    formatDate(date: Date | null): string {
      return date ? this.datePipe.transform(date, 'yyyy-MM-dd') || '' : '';
    }

  startCountdown() {
    setInterval(() => {
      if (this.endDate) {
        const now = new Date().getTime();
        const distance = this.endDate.getTime() - now;

        if (distance < 0) {
          this.remainingTime = 'Event has passed';
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          this.remainingTime = `${days} days, ${hours} h, ${minutes} m, ${seconds} s`;
        }
      }
    }, 1000);
  }
 }