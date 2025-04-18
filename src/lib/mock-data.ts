
import { Doctor, TimeSlot, Specialty } from './types';

// Mock doctor data
export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    photo: '/placeholder.svg',
    specialty: 'Cardiology',
    rating: 4.8,
    location: 'Medical Center, Building A',
    availableDates: [
      '2025-04-19T10:00:00.000Z',
      '2025-04-20T14:00:00.000Z',
      '2025-04-21T09:00:00.000Z',
    ],
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    photo: '/placeholder.svg',
    specialty: 'Dermatology',
    rating: 4.7,
    location: 'Health Pavilion, Suite 300',
    availableDates: [
      '2025-04-19T11:00:00.000Z',
      '2025-04-22T13:00:00.000Z',
      '2025-04-23T15:00:00.000Z',
    ],
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    photo: '/placeholder.svg',
    specialty: 'Family Medicine',
    rating: 4.9,
    location: 'Community Clinic, North Wing',
    availableDates: [
      '2025-04-19T09:00:00.000Z',
      '2025-04-19T15:00:00.000Z',
      '2025-04-21T10:00:00.000Z',
    ],
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    photo: '/placeholder.svg',
    specialty: 'Neurology',
    rating: 4.6,
    location: 'Neuroscience Center, Floor 2',
    availableDates: [
      '2025-04-20T10:00:00.000Z',
      '2025-04-22T11:00:00.000Z',
      '2025-04-24T14:00:00.000Z',
    ],
  },
  {
    id: '5',
    name: 'Dr. Aisha Patel',
    photo: '/placeholder.svg',
    specialty: 'Pediatrics',
    rating: 4.9,
    location: 'Children\'s Medical Center',
    availableDates: [
      '2025-04-19T13:00:00.000Z',
      '2025-04-21T11:00:00.000Z',
      '2025-04-23T09:00:00.000Z',
    ],
  },
  {
    id: '6',
    name: 'Dr. Robert Kim',
    photo: '/placeholder.svg',
    specialty: 'Psychiatry',
    rating: 4.7,
    location: 'Behavioral Health Building',
    availableDates: [
      '2025-04-20T09:00:00.000Z',
      '2025-04-22T15:00:00.000Z',
      '2025-04-24T11:00:00.000Z',
    ],
  },
  {
    id: '7',
    name: 'Dr. Lisa Thompson',
    photo: '/placeholder.svg',
    specialty: 'Orthopedics',
    rating: 4.8,
    location: 'Sports Medicine Center',
    availableDates: [
      '2025-04-19T14:00:00.000Z',
      '2025-04-21T13:00:00.000Z',
      '2025-04-23T10:00:00.000Z',
    ],
  },
  {
    id: '8',
    name: 'Dr. David Lee',
    photo: '/placeholder.svg',
    specialty: 'Family Medicine',
    rating: 4.6,
    location: 'Downtown Medical Office',
    availableDates: [
      '2025-04-20T13:00:00.000Z',
      '2025-04-22T09:00:00.000Z',
      '2025-04-24T15:00:00.000Z',
    ],
  }
];

// Generate time slots for each doctor
export const generateTimeSlots = (doctorId: string, date: string): TimeSlot[] => {
  const baseDate = new Date(date);
  const slots: TimeSlot[] = [];
  
  // Generate slots every 30 minutes from 9am to 5pm
  for (let hour = 9; hour < 17; hour++) {
    for (let minute of [0, 30]) {
      const startDateTime = new Date(baseDate);
      startDateTime.setHours(hour, minute, 0);
      
      const endDateTime = new Date(startDateTime);
      endDateTime.setMinutes(endDateTime.getMinutes() + 30);
      
      // Randomly mark some slots as already booked
      const isBooked = Math.random() > 0.7;
      
      slots.push({
        id: `${doctorId}-${startDateTime.toISOString()}`,
        doctorId,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        isBooked
      });
    }
  }
  
  return slots;
};

export const specialties: Specialty[] = [
  'Cardiology',
  'Dermatology',
  'Family Medicine',
  'Neurology',
  'Pediatrics',
  'Psychiatry',
  'Orthopedics'
];
