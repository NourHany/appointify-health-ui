
import React, { useState, useMemo } from 'react';
import { useAppointmentStore } from '@/store/useAppointmentStore';
import { DoctorCard } from '@/components/DoctorCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { specialties } from '@/lib/mock-data';
import { Specialty } from '@/lib/types';

export const DoctorDirectory: React.FC = () => {
  const { doctors, activeSpecialtyFilter, setActiveSpecialtyFilter } = useAppointmentStore();
  
  const filteredDoctors = useMemo(() => {
    if (activeSpecialtyFilter === 'All') {
      return doctors;
    }
    return doctors.filter(doctor => doctor.specialty === activeSpecialtyFilter);
  }, [doctors, activeSpecialtyFilter]);

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-xl font-bold sm:text-2xl lg:text-3xl">Find a Doctor</h1>
        <div className="max-w-xs">
          <Select 
            value={activeSpecialtyFilter}
            onValueChange={(value) => setActiveSpecialtyFilter(value as Specialty | 'All')}
          >
            <SelectTrigger aria-label="Filter by specialty" className="bg-white shadow-sm">
              <SelectValue placeholder="Filter by specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Specialties</SelectItem>
              {specialties.map((specialty) => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredDoctors.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground">No doctors found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  );
};
