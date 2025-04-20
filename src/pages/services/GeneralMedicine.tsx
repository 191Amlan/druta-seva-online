
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';

const GeneralMedicine = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">General & Medicine Services</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-600 mb-4">
              Our general medical services provide comprehensive emergency care for all types of illnesses and injuries. We ensure quick response times and professional medical attention when you need it most.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
              <li>24/7 Emergency Response</li>
              <li>Qualified Medical Staff</li>
              <li>Basic Life Support</li>
              <li>First Aid Services</li>
              <li>Medical Equipment</li>
            </ul>
            <Button variant="outline" className="mt-4">Book Now</Button>
          </div>
          <div className="bg-gray-100 rounded-lg p-8">
            <h2 className="text-xl font-bold mb-4">Service Highlights</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Quick Response Time</h3>
                  <p className="text-gray-600">Average response time of 10-15 minutes</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Professional Care</h3>
                  <p className="text-gray-600">Experienced medical professionals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default GeneralMedicine;
