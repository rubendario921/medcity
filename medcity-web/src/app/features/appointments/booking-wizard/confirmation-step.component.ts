import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../../core/services/appointment.service';
import { BookingStore } from '../../../core/state/booking.store';

@Component({
  selector: 'app-confirmation-step',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="step-container">
      @if (!success()) {
        <h2>Resumen de tu Cita</h2>
        <div class="summary-card">
          <div class="summary-item">
            <span class="label">Especialidad:</span>
            <span class="value">{{ specialty()?.name }}</span>
          </div>
          <div class="summary-item">
            <span class="label">Fecha:</span>
            <span class="value">{{ date() }}</span>
          </div>
          <div class="summary-item">
            <span class="label">Hora:</span>
            <span class="value">{{ time() }}</span>
          </div>
          <div class="summary-item">
            <span class="label">Doctor:</span>
            <span class="value italic">Asignación automática inmediata</span>
          </div>
        </div>

        <div class="actions">
          <button class="back-btn" (click)="back()">Modificar</button>
          <button class="confirm-btn" (click)="confirm()">Confirmar y Agendar</button>
        </div>
      } @else {
        <div class="success-screen">
          <div class="check-icon">✓</div>
          <h2>¡Cita Agendada con Éxito!</h2>
          <p>Tu doctor ha sido asignado. Recibirás un correo con los detalles.</p>
          <button class="finish-btn" (click)="reset()">Agendar otra cita</button>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .step-container {
        animation: slideIn 0.5s ease;
        max-width: 500px;
        margin: 0 auto;
      }
      h2 {
        color: #1a237e;
        margin-bottom: 2rem;
      }
      .summary-card {
        background: #f8f9fa;
        padding: 2rem;
        border-radius: 12px;
        margin-bottom: 2rem;
        border-left: 5px solid #3f51b5;
      }
      .summary-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        border-bottom: 1px solid #eee;
        padding-bottom: 0.5rem;
      }
      .label {
        color: #888;
      }
      .value {
        font-weight: bold;
        color: #333;
      }
      .italic {
        font-style: italic;
        color: #3f51b5;
      }
      .actions {
        display: flex;
        gap: 1rem;
      }
      button {
        flex: 1;
        padding: 1rem;
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
        transition: 0.3s;
      }
      .back-btn {
        background: white;
        border: 1px solid #ddd;
        color: #666;
      }
      .confirm-btn {
        background: #3f51b5;
        color: white;
        border: none;
      }
      .confirm-btn:hover {
        background: #1a237e;
      }
      .success-screen {
        text-align: center;
      }
      .check-icon {
        font-size: 5rem;
        color: #4caf50;
        margin-bottom: 1rem;
      }
      .finish-btn {
        margin-top: 2rem;
        background: #3f51b5;
        color: white;
        border: none;
        padding: 1rem 3rem;
        border-radius: 30px;
      }

      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateX(30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
    `,
  ],
})
export class ConfirmationStepComponent {
  private readonly appointmentService = inject(AppointmentService);
  private readonly bookingStore = inject(BookingStore);

  specialty = this.bookingStore.selectedSpecialty;
  date = this.bookingStore.selectedDate;
  time = this.bookingStore.selectedTime;
  success = signal(false);

  back() {
    this.bookingStore.goBack();
  }

  confirm() {
    const request = {
      patientId: 'patient-test-uuid', // Simulated patient
      specialtyId: this.specialty()!.id,
      scheduledAt: new Date(`${this.date()}T${this.time()}`),
    };

    this.appointmentService.createAppointment(request).subscribe({
      next: () => this.success.set(true),
      error: (err) => alert('Error al agendar: ' + err.message),
    });
  }

  reset() {
    this.bookingStore.reset();
  }
}
