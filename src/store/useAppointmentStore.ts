
import { create } from 'zustand';
import { Doctor, TimeSlot, Appointment, Specialty } from '@/lib/types';
import { doctors, generateTimeSlots, specialties } from '@/lib/mock-data';

interface AppointmentState {
  // Data
  doctors: Doctor[];
  appointments: Appointment[];
  selectedDoctor: Doctor | null;
  selectedTimeSlot: TimeSlot | null;
  availableTimeSlots: TimeSlot[];
  
  // UI state
  isBookingModalOpen: boolean;
  activeSpecialtyFilter: Specialty | 'All';
  activeView: 'doctors' | 'appointments';
  
  // Actions
  setSelectedDoctor: (doctor: Doctor | null) => void;
  setSelectedTimeSlot: (timeSlot: TimeSlot | null) => void;
  openBookingModal: (doctor: Doctor) => void;
  closeBookingModal: () => void;
  bookAppointment: () => void;
  cancelAppointment: (appointmentId: string) => void;
  setActiveSpecialtyFilter: (specialty: Specialty | 'All') => void;
  setActiveView: (view: 'doctors' | 'appointments') => void;
  getAvailableTimeSlots: (doctorId: string, date: string) => TimeSlot[];
}

export const useAppointmentStore = create<AppointmentState>((set, get) => ({
  // Initial data
  doctors,
  appointments: [],
  selectedDoctor: null,
  selectedTimeSlot: null,
  availableTimeSlots: [],
  
  // Initial UI state
  isBookingModalOpen: false,
  activeSpecialtyFilter: 'All',
  activeView: 'doctors',
  
  // Actions
  setSelectedDoctor: (doctor) => set({ selectedDoctor: doctor }),
  
  setSelectedTimeSlot: (timeSlot) => set({ selectedTimeSlot: timeSlot }),
  
  openBookingModal: (doctor) => {
    const availableTimeSlots = doctor.availableDates.flatMap(date => 
      generateTimeSlots(doctor.id, date)
    );
    
    set({
      selectedDoctor: doctor,
      isBookingModalOpen: true,
      availableTimeSlots
    });
  },
  
  closeBookingModal: () => set({ 
    isBookingModalOpen: false,
    selectedDoctor: null,
    selectedTimeSlot: null,
    availableTimeSlots: []
  }),
  
  bookAppointment: () => {
    const { selectedDoctor, selectedTimeSlot, appointments } = get();
    
    if (!selectedDoctor || !selectedTimeSlot) return;
    
    const newAppointment: Appointment = {
      id: `appointment-${Date.now()}`,
      doctorId: selectedDoctor.id,
      timeSlotId: selectedTimeSlot.id,
      startTime: selectedTimeSlot.startTime,
      endTime: selectedTimeSlot.endTime,
      status: 'confirmed'
    };
    
    set({
      appointments: [...appointments, newAppointment],
      isBookingModalOpen: false,
      selectedDoctor: null,
      selectedTimeSlot: null
    });
  },
  
  cancelAppointment: (appointmentId) => {
    const { appointments } = get();
    set({
      appointments: appointments.filter(appointment => 
        appointment.id !== appointmentId
      )
    });
  },
  
  setActiveSpecialtyFilter: (specialty) => set({ activeSpecialtyFilter: specialty }),
  
  setActiveView: (view) => set({ activeView: view }),
  
  getAvailableTimeSlots: (doctorId, date) => {
    return generateTimeSlots(doctorId, date).filter(slot => !slot.isBooked);
  }
}));
