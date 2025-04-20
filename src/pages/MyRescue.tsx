
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { MapPin, Phone, Clock } from 'lucide-react';

const MyRescuePage = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // This is a mock booking - in a real app, this would come from API/database
  const booking = {
    id: 'AMB-12345',
    status: 'On the way',
    ambulanceType: 'Advanced Life Support',
    numberPlate: 'KA01CD5678',
    driverName: 'Sunil Sharma',
    contactNumber: '+91 8765432109',
    pickupLocation: 'Current Location',
    destination: 'City Hospital',
    estimatedArrival: '7 minutes',
    bookedAt: new Date().toLocaleString(),
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">My Rescue</h1>

        {booking ? (
          <Card className="max-w-3xl mx-auto">
            <CardHeader className="bg-primary/10">
              <div className="flex items-center justify-between">
                <CardTitle>Booking #{booking.id}</CardTitle>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {booking.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-lg mb-4">Ambulance Details</h3>
                  <div className="space-y-3">
                    <p><span className="font-medium">Type:</span> {booking.ambulanceType}</p>
                    <p><span className="font-medium">Number Plate:</span> {booking.numberPlate}</p>
                    <p><span className="font-medium">Driver Name:</span> {booking.driverName}</p>
                    <p className="flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      <span className="font-medium mr-2">Contact:</span> 
                      <a href={`tel:${booking.contactNumber}`} className="text-primary">
                        {booking.contactNumber}
                      </a>
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-lg mb-4">Rescue Information</h3>
                  <div className="space-y-3">
                    <p className="flex items-start">
                      <MapPin className="h-4 w-4 mr-1 mt-1" />
                      <span>
                        <span className="font-medium">Pickup:</span> {booking.pickupLocation}
                      </span>
                    </p>
                    {booking.destination && (
                      <p className="flex items-start">
                        <MapPin className="h-4 w-4 mr-1 mt-1" />
                        <span>
                          <span className="font-medium">Destination:</span> {booking.destination}
                        </span>
                      </p>
                    )}
                    <p className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>
                        <span className="font-medium">Estimated Arrival:</span> {booking.estimatedArrival}
                      </span>
                    </p>
                    <p><span className="font-medium">Booked At:</span> {booking.bookedAt}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t">
                <h3 className="font-medium text-lg mb-4">Live Tracking</h3>
                <div className="bg-gray-100 rounded-md h-64 flex items-center justify-center">
                  <p className="text-gray-500">Map view will be available here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl">You don't have any active rescues</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default MyRescuePage;
