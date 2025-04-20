
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';

const SpecializedCare = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">Specialized Care Services</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-600 mb-4">
              Our specialized care services offer advanced medical support with state-of-the-art equipment and highly trained medical professionals for critical situations.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
              <li>Advanced Life Support</li>
              <li>Critical Care Transport</li>
              <li>Specialized Medical Equipment</li>
              <li>Expert Medical Team</li>
              <li>Intensive Care Facilities</li>
            </ul>
            <Button variant="outline" className="mt-4">Book Now</Button>
          </div>
          <div className="bg-gray-100 rounded-lg p-8">
            <h2 className="text-xl font-bold mb-4">Service Highlights</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Advanced Equipment</h3>
                  <p className="text-gray-600">Latest medical technology and equipment</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Expert Team</h3>
                  <p className="text-gray-600">Specialized medical professionals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SpecializedCare;
