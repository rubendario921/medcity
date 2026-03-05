import { Component, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService, AvailableSlot } from '../../../core/services/appointment.service';
import { BookingStore } from '../../../core/state/booking.store';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-datetime-step',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="step-container">
      <button class="back-btn" (click)="back()">← Volver</button>
      <h2>Selecciona Fecha y Hora</h2>
      <p class="subtitle">
        Especialidad: <strong>{{ specialty()?.name }}</strong>
      </p>

      <div class="date-selector">
        <label for="date">Fecha de atención:</label>
        <input
          type="date"
          id="date"
          [min]="minDate"
          (change)="onDateChange($event)"
          [value]="selectedDate()"
        />
      </div>

      @if (selectedDate()) {
        <div class="slots-grid">
          @for (slot of slots(); track slot.time) {
            <button
              class="slot-btn"
              [class.active]="selectedTime() === slot.time"
              (click)="selectTime(slot.time)"
            >
              {{ slot.time }}
            </button>
          } @empty {
            <div class="no-slots">No hay horarios disponibles para esta fecha.</div>
          }
        </div>
      }

      @if (selectedTime()) {
        <button class="next-btn" (click)="confirm()">Confirmar Cita</button>
      }
    </div>
  `,
  styles: [
    `
      .step-container {
        text-align: center;
        animation: fadeIn 0.5s ease-out;
        position: relative;
      }
      h2 {
        color: #1a237e;
      }
      .back-btn {
        position: absolute;
        left: 0;
        top: 0;
        background: none;
        border: none;
        color: #3f51b5;
        cursor: pointer;
        font-weight: bold;
      }
      .date-selector {
        margin: 2rem 0;
      }
      input[type='date'] {
        padding: 0.8rem;
        border-radius: 8px;
        border: 1px solid #ddd;
        font-size: 1rem;
        outline: none;
        transition: border-color 0.3s;
      }
      input[type='date']:focus {
        border-color: #3f51b5;
      }
      .slots-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 1rem;
        max-width: 600px;
        margin: 0 auto;
      }
      .slot-btn {
        padding: 1rem;
        background: #f5f5f5;
        border: 1px solid #eee;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s;
      }
      .slot-btn:hover {
        background: #e8eaf6;
        border-color: #3f51b5;
      }
      .slot-btn.active {
        background: #3f51b5;
        color: white;
        border-color: #1a237e;
        box-shadow: 0 4px 10px rgba(63, 81, 181, 0.3);
      }
      .next-btn {
        margin-top: 3rem;
        padding: 1rem 3rem;
        background: linear-gradient(135deg, #3f51b5 0%, #1a237e 100%);
        color: white;
        border: none;
        border-radius: 30px;
        font-size: 1.1rem;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(26, 35, 126, 0.2);
      }
    `,
  ],
})
export class DateTimeStepComponent {
  private readonly appointmentService = inject(AppointmentService);
  private readonly bookingStore = inject(BookingStore);

  minDate = new Date().toISOString().split('T')[0];
  specialty = this.bookingStore.selectedSpecialty;
  selectedDate = this.bookingStore.selectedDate;
  selectedTime = this.bookingStore.selectedTime;

  // We use effect style or toSignal with switchMap for slots
  slots = signal<AvailableSlot[]>([]);

  constructor() {
    effect(() => {
      const date = this.selectedDate();
      const spec = this.specialty();
      if (date && spec) {
        this.appointmentService
          .getAvailableSlots(spec.id, date)
          .subscribe((s) => this.slots.set(s));
      }
    });
  }

  onDateChange(event: any) {
    this.bookingStore.setDate(event.target.value);
  }

  selectTime(time: string) {
    this.bookingStore.setTime(time);
  }

  back() {
    this.bookingStore.goBack();
  }

  confirm() {
    // Navigate to next or call confirmation logic handled by parent
    this.bookingStore.setTime(this.selectedTime()!); // This updates step to 4 via Store logic
  }
}
