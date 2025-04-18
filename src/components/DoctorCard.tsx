
import React from 'react';
import { Star, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Doctor } from '@/lib/types';
import { useAppointmentStore } from '@/store/useAppointmentStore';
import { format } from 'date-fns';

interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const openBookingModal = useAppointmentStore(state => state.openBookingModal);
  
  const handleBookClick = () => {
    openBookingModal(doctor);
  };

  // Format next available date nicely
  const nextAvailableDate = doctor.availableDates[0] 
    ? format(new Date(doctor.availableDates[0]), 'EEE, MMM d')
    : 'No availability';

  return (
    <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
      <CardHeader className="pb-0">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 overflow-hidden rounded-full">
            <img
              src={doctor.photo}
              alt={`Dr. ${doctor.name}`}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold">{doctor.name}</h3>
            <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
            <div className="mt-1 flex items-center">
              <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
              <span className="text-sm" aria-label={`Rating: ${doctor.rating.toFixed(1)} out of 5`}>{doctor.rating.toFixed(1)}</span>
            </div>
            <div className="mt-1">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                {doctor.specialty}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-start text-sm">
          <MapPin className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
          <span className="text-left text-muted-foreground">{doctor.location}</span>
        </div>
        <div className="mt-2 flex items-start text-sm">
          <Calendar className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
          <span className="text-left text-muted-foreground">
            Next available: {nextAvailableDate}
          </span>
        </div>
      </CardContent>
      <CardFooter className="pt-1">
        <Button 
          onClick={handleBookClick}
          className="w-full bg-primary hover:bg-primary/90"
        >
          Book Appointment
        </Button>
      </CardFooter>
    </Card>
  );
};
