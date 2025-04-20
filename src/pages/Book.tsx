
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { MapPin, Clock, Calendar, CreditCard, Banknote } from 'lucide-react';
import { toast } from 'sonner';

const BookPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Simulate nearby ambulances
  const ambulances = [
    { 
      id: 1, 
      type: 'Basic Ambulance',
      numberPlate: 'KA01AB1234',
      driverName: 'Rahul Kumar',
      contactNumber: '+91 9876543210',
      estimatedTime: '5 mins',
      price: 500
    },
    { 
      id: 2, 
      type: 'Advanced Life Support',
      numberPlate: 'KA01CD5678',
      driverName: 'Sunil Sharma',
      contactNumber: '+91 8765432109',
      estimatedTime: '7 mins',
      price: 1500
    },
    { 
      id: 3, 
      type: 'Patient Transport',
      numberPlate: 'KA01EF9012',
      driverName: 'Amit Singh',
      contactNumber: '+91 7654321098',
      estimatedTime: '10 mins',
      price: 800
    }
  ];

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    if (!location) {
      toast.error('Please enter your pickup location');
      return;
    }
    setStep(2);
  };

  const handleAmbulanceSelect = (ambulance) => {
    setSelectedAmbulance(ambulance);
    setStep(3);
  };

  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);
    if (method === 'cash') {
      handleBookingComplete();
    } else {
      // Simulate redirect to payment gateway
      toast.info('Redirecting to payment gateway...');
      setTimeout(() => {
        handleBookingComplete();
      }, 2000);
    }
  };

  const handleBookingComplete = () => {
    toast.success('Your ambulance has been booked successfully!');
    setTimeout(() => {
      navigate('/my-rescue');
    }, 2000);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Book an Ambulance</h1>
        
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>1</div>
            <div className={`h-1 w-16 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>2</div>
            <div className={`h-1 w-16 ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>3</div>
          </div>
          <div className="flex justify-center text-sm">
            <span className="w-24 text-center">Location</span>
            <span className="w-24 text-center">Select Ambulance</span>
            <span className="w-24 text-center">Payment</span>
          </div>
        </div>
        
        {/* Step 1: Location */}
        {step === 1 && (
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Enter Your Location</CardTitle>
              <CardDescription>Please provide your pickup location and destination</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLocationSubmit} className="space-y-4">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium mb-1">Pickup Location</label>
                  <div className="flex gap-2">
                    <input 
                      id="location" 
                      type="text" 
                      className="w-full p-2 border border-gray-300 rounded-md" 
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter your current location"
                    />
                    <Button type="button" variant="outline" size="icon" onClick={() => {
                      setLocation('Current Location');
                      toast.info('Using your current location');
                    }}>
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <label htmlFor="destination" className="block text-sm font-medium mb-1">Destination (Optional)</label>
                  <input 
                    id="destination" 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded-md" 
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Enter your destination"
                  />
                </div>
                <Button type="submit" className="w-full">Continue</Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Select Ambulance */}
        {step === 2 && (
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Select an Ambulance</CardTitle>
              <CardDescription>Choose from available ambulances near {location}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {ambulances.map((ambulance) => (
                  <Card key={ambulance.id} className="cursor-pointer hover:border-primary transition-all" onClick={() => handleAmbulanceSelect(ambulance)}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold">{ambulance.type}</h3>
                          <p className="text-sm text-gray-500">Number Plate: {ambulance.numberPlate}</p>
                          <div className="flex items-center mt-1 text-sm">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{ambulance.estimatedTime} away</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">₹{ambulance.price}</p>
                          <Button size="sm" className="mt-2">Select</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 3: Payment */}
        {step === 3 && selectedAmbulance && (
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Choose Payment Method</CardTitle>
              <CardDescription>Complete your booking by selecting a payment method</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 border border-gray-200 rounded-md p-4 bg-gray-50">
                <h3 className="font-medium mb-2">Booking Summary</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p>Ambulance Type:</p>
                  <p className="font-medium">{selectedAmbulance.type}</p>
                  
                  <p>Number Plate:</p>
                  <p className="font-medium">{selectedAmbulance.numberPlate}</p>
                  
                  <p>Driver:</p>
                  <p className="font-medium">{selectedAmbulance.driverName}</p>
                  
                  <p>Amount:</p>
                  <p className="font-medium">₹{selectedAmbulance.price}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="cursor-pointer hover:border-primary transition-all" onClick={() => handlePaymentSelect('cash')}>
                  <CardContent className="p-4 flex items-center">
                    <Banknote className="h-6 w-6 mr-3 text-primary" />
                    <div>
                      <h3 className="font-medium">Cash</h3>
                      <p className="text-sm text-gray-500">Pay directly to driver</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="cursor-pointer hover:border-primary transition-all" onClick={() => handlePaymentSelect('online')}>
                  <CardContent className="p-4 flex items-center">
                    <CreditCard className="h-6 w-6 mr-3 text-primary" />
                    <div>
                      <h3 className="font-medium">Online Payment</h3>
                      <p className="text-sm text-gray-500">Cards, UPI, Net Banking</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default BookPage;
