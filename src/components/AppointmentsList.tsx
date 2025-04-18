
import React from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppointmentStore } from '@/store/useAppointmentStore';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export const AppointmentsList: React.FC = () => {
  const { appointments, doctors, cancelAppointment } = useAppointmentStore();

  if (appointments.length === 0) {
    return (
      <div className="mx-auto max-w-3xl py-10 text-center">
        <h2 className="mb-2 text-2xl font-bold">My Appointments</h2>
        <p className="mt-6 text-muted-foreground">
          You don't have any appointments scheduled.
        </p>
        <Button 
          onClick={() => useAppointmentStore.getState().setActiveView('doctors')} 
          className="mt-4 bg-primary hover:bg-primary/90"
        >
          Find a Doctor
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl py-6">
      <h2 className="mb-6 text-xl font-bold sm:text-2xl">My Appointments</h2>
      
      <div className="space-y-4">
        {appointments.map((appointment) => {
          const doctor = doctors.find(d => d.id === appointment.doctorId);
          if (!doctor) return null;
          
          const appointmentDate = new Date(appointment.startTime);
          
          return (
            <Card key={appointment.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
                  <div>
                    <h3 className="text-lg font-medium">{doctor.name}</h3>
                    <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {format(appointmentDate, 'EEEE, MMMM d, yyyy')}
                        </span>
                      </div>
                      
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {format(new Date(appointment.startTime), 'h:mm a')} - 
                          {format(new Date(appointment.endTime), ' h:mm a')}
                        </span>
                      </div>
                      
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{doctor.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => cancelAppointment(appointment.id)}
                      aria-label="Cancel appointment"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex-col items-start gap-2 bg-muted/50 px-6 py-3">
                <p className="text-sm font-medium">Appointment ID: {appointment.id.substring(0, 8)}</p>
                <p className="text-xs text-muted-foreground">
                  Status: <span className="font-medium capitalize text-green-600">{appointment.status}</span>
                </p>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
