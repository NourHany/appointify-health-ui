import React, { useEffect } from "react";
import { DoctorDirectory } from "@/components/DoctorDirectory";
import { AppointmentsList } from "@/components/AppointmentsList";
import { BookingModal } from "@/components/BookingModal";
import { useAppointmentStore } from "@/store/useAppointmentStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const AppointmentsLayout: React.FC = () => {
  const { activeView, setActiveView, appointments } = useAppointmentStore();

  useEffect(() => {
    console.log(activeView);
  }, [activeView]);

  return (
    <div className="min-h-screen bg-pattern pb-10">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary md:text-3xl">
              Appointify Health
            </h1>
            <div className="flex items-center">
              <span className="sr-only">User profile</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4">
        <Tabs
          value={activeView}
          onValueChange={(value) =>
            setActiveView(value as "doctors" | "appointments")
          }
          className="mt-6"
        >
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="doctors">Find Doctors</TabsTrigger>
              <TabsTrigger value="appointments">
                My Appointments
                {appointments.length > 0 && (
                  <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-white">
                    {appointments.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="doctors" className="mt-6">
            <DoctorDirectory />
          </TabsContent>

          <TabsContent value="appointments" className="mt-6">
            <AppointmentsList />
          </TabsContent>
        </Tabs>
      </main>

      {/* Booking Modal */}
      <BookingModal />
    </div>
  );
};
