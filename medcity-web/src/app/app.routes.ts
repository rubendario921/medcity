import { Routes } from '@angular/router';
import { BookingWizardComponent } from './features/appointments/booking-wizard/booking-wizard.component';

export const routes: Routes = [
  { path: '', component: BookingWizardComponent },
  { path: 'book', component: BookingWizardComponent },
];
