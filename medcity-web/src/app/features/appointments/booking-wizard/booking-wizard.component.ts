import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingStore } from '../../../core/state/booking.store';
import { SpecialtyStepComponent } from './specialty-step.component';
import { DateTimeStepComponent } from './datetime-step.component';
import { ConfirmationStepComponent } from './confirmation-step.component';

@Component({
  selector: 'app-booking-wizard',
  standalone: true,
  imports: [CommonModule, SpecialtyStepComponent, DateTimeStepComponent, ConfirmationStepComponent],
  template: `
    <div class="wizard-wrapper">
      <div class="progress-bar">
        <div class="progress" [style.width]="progress()"></div>
      </div>

      <main class="wizard-content">
        @switch (currentStep()) {
          @case (1) {
            <app-specialty-step></app-specialty-step>
          }
          @case (2) {
            <app-datetime-step></app-datetime-step>
          }
          @case (3) {
            <app-datetime-step></app-datetime-step>
          }
          @case (4) {
            <app-confirmation-step></app-confirmation-step>
          }
        }
      </main>
    </div>
  `,
  styles: [
    `
      .wizard-wrapper {
        max-width: 1000px;
        margin: 2rem auto;
        padding: 0 1rem;
      }
      .progress-bar {
        height: 6px;
        background: #eee;
        border-radius: 3px;
        margin-bottom: 3rem;
        overflow: hidden;
      }
      .progress {
        height: 100%;
        background: linear-gradient(90deg, #3f51b5 0%, #00d4ff 100%);
        transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .wizard-content {
        min-height: 500px;
        background: rgba(255, 255, 255, 0.5);
        padding: 2rem;
        border-radius: 20px;
      }
    `,
  ],
})
export class BookingWizardComponent {
  private readonly bookingStore = inject(BookingStore);
  currentStep = this.bookingStore.currentStep;

  progress = () => `${(this.currentStep() / 4) * 100}%`;
}
