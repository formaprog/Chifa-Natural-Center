import { Appointment, TreatmentInquiry } from '../types';

const APPOINTMENTS_KEY = 'shifa_appointments_v1';
const INQUIRIES_KEY = 'shifa_inquiries_v1';
const FAVORITE_HERBS_KEY = 'shifa_favorite_herbs_v1';

export function getSavedAppointments(): Appointment[] {
  try {
    const data = localStorage.getItem(APPOINTMENTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveAppointment(appointment: Appointment): Appointment[] {
  try {
    const list = getSavedAppointments();
    const updated = [appointment, ...list];
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [appointment];
  }
}

export function cancelAppointment(id: string): Appointment[] {
  try {
    const list = getSavedAppointments();
    const updated = list.map(item => item.id === id ? { ...item, status: 'cancelled' as const } : item);
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function getSavedInquiries(): TreatmentInquiry[] {
  try {
    const data = localStorage.getItem(INQUIRIES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveInquiry(inquiry: TreatmentInquiry): TreatmentInquiry[] {
  try {
    const list = getSavedInquiries();
    const updated = [inquiry, ...list];
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [inquiry];
  }
}

export function getFavoriteHerbs(): string[] {
  try {
    const data = localStorage.getItem(FAVORITE_HERBS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function toggleFavoriteHerb(herbId: string): string[] {
  try {
    const current = getFavoriteHerbs();
    const exists = current.includes(herbId);
    const updated = exists ? current.filter(id => id !== herbId) : [...current, herbId];
    localStorage.setItem(FAVORITE_HERBS_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}
