import { computed, Injectable, signal } from '@angular/core';
import { Specialty } from '../services/appointment.service';

export interface BookingState {
  specialty: Specialty | null;
  date: string | null;
  time: string | null;
  step: number;
}

@Injectable({
  providedIn: 'root',
})
export class BookingStore {
  private readonly stateSignal = signal<BookingState>({
    specialty: null,
    date: null,
    time: null,
    step: 1,
  });

  readonly state = this.stateSignal.asReadonly();

  readonly currentStep = computed(() => this.state().step);
  readonly selectedSpecialty = computed(() => this.state().specialty);
  readonly selectedDate = computed(() => this.state().date);
  readonly selectedTime = computed(() => this.state().time);

  setSpecialty(specialty: Specialty) {
    this.stateSignal.update((s) => ({ ...s, specialty, step: 2 }));
  }

  setDate(date: string) {
    this.stateSignal.update((s) => ({ ...s, date, step: 3 }));
  }

  setTime(time: string) {
    this.stateSignal.update((s) => ({ ...s, time, step: 4 }));
  }

  reset() {
    this.stateSignal.set({
      specialty: null,
      date: null,
      time: null,
      step: 1,
    });
  }

  goBack() {
    this.stateSignal.update((s) => ({
      ...s,
      step: Math.max(1, s.step - 1),
    }));
  }
}
