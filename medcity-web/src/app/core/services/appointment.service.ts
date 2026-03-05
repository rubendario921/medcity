import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Specialty {
  id: string;
  name: string;
  description: string;
}

export interface AvailableSlot {
  time: string;
  available: boolean;
}

export interface CreateAppointmentRequest {
  patientId: string;
  specialtyId: string;
  scheduledAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000'; // Adjust as needed

  getSpecialties(): Observable<Specialty[]> {
    return this.http.get<Specialty[]>(`${this.apiUrl}/specialties`);
  }

  getAvailableSlots(specialtyId: string, date: string): Observable<AvailableSlot[]> {
    return this.http.get<AvailableSlot[]>(`${this.apiUrl}/appointments/slots`, {
      params: { specialtyId, date },
    });
  }

  createAppointment(request: CreateAppointmentRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/appointments`, request);
  }
}
