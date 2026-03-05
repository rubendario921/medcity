import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService, Specialty } from '../../../core/services/appointment.service';
import { BookingStore } from '../../../core/state/booking.store';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-specialty-step',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="step-container">
      <h2>Selecciona una Especialidad</h2>
      <p class="subtitle">Elige la rama médica para tu consulta</p>

      <div class="grid">
        @for (specialty of specialties(); track specialty.id) {
          <div class="card" (click)="select(specialty)">
            <div class="icon-placeholder">🩺</div>
            <h3>{{ specialty.name }}</h3>
            <p>{{ specialty.description }}</p>
          </div>
        } @empty {
          <div class="loading">Cargando especialidades...</div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .step-container {
        text-align: center;
        animation: fadeIn 0.5s ease-out;
      }
      h2 {
        color: #1a237e;
        font-size: 2rem;
        margin-bottom: 0.5rem;
      }
      .subtitle {
        color: #666;
        margin-bottom: 2rem;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1.5rem;
        padding: 1rem;
      }
      .card {
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        border-radius: 16px;
        padding: 2rem;
        border: 1px solid rgba(255, 255, 255, 0.3);
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .card:hover {
        transform: translateY(-10px);
        box-shadow: 0 15px 45px 0 rgba(31, 38, 135, 0.15);
        background: #fff;
        border-color: #3f51b5;
      }
      .icon-placeholder {
        font-size: 3rem;
        margin-bottom: 1rem;
      }
      h3 {
        margin: 0 0 1rem;
        color: #303f9f;
      }
      p {
        font-size: 0.9rem;
        color: #777;
        line-height: 1.4;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
  ],
})
export class SpecialtyStepComponent {
  private readonly appointmentService = inject(AppointmentService);
  private readonly bookingStore = inject(BookingStore);

  specialties = toSignal(this.appointmentService.getSpecialties(), {
    initialValue: [] as Specialty[],
  });

  select(specialty: Specialty) {
    this.bookingStore.setSpecialty(specialty);
  }
}
