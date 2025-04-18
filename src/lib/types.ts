
export interface Doctor {
  id: string;
  name: string;
  photo: string;
  specialty: string;
  rating: number;
  location: string;
  availableDates: string[]; // ISO date strings
}

export interface TimeSlot {
  id: string;
  doctorId: string;
  startTime: string; // ISO date string
  endTime: string; // ISO date string
  isBooked: boolean;
}

export interface Appointment {
  id: string;
  doctorId: string;
  timeSlotId: string;
  patientName?: string; // For a real app, this would come from user authentication
  startTime: string; // ISO date string
  endTime: string; // ISO date string
  status: 'confirmed' | 'cancelled' | 'completed';
}

export type Specialty = 
  | 'Cardiology' 
  | 'Dermatology' 
  | 'Family Medicine' 
  | 'Neurology' 
  | 'Pediatrics' 
  | 'Psychiatry' 
  | 'Orthopedics';
