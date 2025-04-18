
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAppointmentStore } from '@/store/useAppointmentStore';
import { TimeSlot } from '@/lib/types';

export const BookingModal: React.FC = () => {
  const { 
    isBookingModalOpen, 
    closeBookingModal, 
    selectedDoctor,
    bookAppointment,
    selectedTimeSlot,
    setSelectedTimeSlot,
    availableTimeSlots
  } = useAppointmentStore();

  const [selectedDate, setSelectedDate] = useState<string | null>(
    selectedDoctor?.availableDates[0] || null
  );

  // Group timeslots by date
  const timeSlotsByDate: Record<string, TimeSlot[]> = {};
  
  if (selectedDoctor) {
    availableTimeSlots.forEach(slot => {
      const date = format(new Date(slot.startTime), 'yyyy-MM-dd');
      if (!timeSlotsByDate[date]) {
        timeSlotsByDate[date] = [];
      }
      timeSlotsByDate[date].push(slot);
    });
  }

  const availableDates = Object.keys(timeSlotsByDate).sort();

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotSelect = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleConfirm = () => {
    bookAppointment();
  };

  if (!selectedDoctor) {
    return null;
  }

  return (
    <Dialog open={isBookingModalOpen} onOpenChange={(open) => !open && closeBookingModal()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Book an Appointment with {selectedDoctor.name}</DialogTitle>
          <DialogDescription>
            {selectedDoctor.specialty} • {selectedDoctor.location}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 grid gap-6">
          {/* Available Dates */}
          <div>
            <h3 className="mb-3 font-medium">Select a Date</h3>
            <div className="flex flex-wrap gap-2">
              {availableDates.map((date) => (
                <Button
                  key={date}
                  variant={selectedDate === date ? "default" : "outline"}
                  onClick={() => handleDateChange(date)}
                  className="flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(date), 'EEE, MMM d')}</span>
                </Button>
              ))}
            </div>
          </div>
          
          {/* Available Time Slots */}
          {selectedDate && (
            <div>
              <h3 className="mb-3 font-medium">Select a Time</h3>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {timeSlotsByDate[selectedDate]
                  ?.filter(slot => !slot.isBooked)
                  .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
                  .map((slot) => (
                    <Button
                      key={slot.id}
                      variant={selectedTimeSlot?.id === slot.id ? "default" : "outline"}
                      onClick={() => handleTimeSlotSelect(slot)}
                      className="text-sm"
                      aria-label={`Select time slot at ${format(new Date(slot.startTime), 'h:mm a')}`}
                    >
                      {format(new Date(slot.startTime), 'h:mm a')}
                    </Button>
                  ))}
                  
                {timeSlotsByDate[selectedDate]?.filter(slot => !slot.isBooked).length === 0 && (
                  <p className="col-span-full text-sm text-muted-foreground">
                    No available time slots for this date.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter className="mt-6 flex justify-between gap-2 sm:justify-end">
          <Button variant="outline" onClick={closeBookingModal}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={!selectedTimeSlot}
            className="bg-primary hover:bg-primary/90"
          >
            Confirm Appointment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
