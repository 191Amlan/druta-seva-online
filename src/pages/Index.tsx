
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import AuthModal from '@/components/auth/AuthModal';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleBookNow = () => {
    if (!isAuthenticated) {
      setAuthModalOpen(true);
    } else {
      // Navigate to booking page
      navigate('/book');
    }
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 z-10"></div>
        <img 
          src="/lovable-uploads/5bd7b118-721b-45e9-8578-189fb4a96aed.png" 
          alt="Ambulance on the road at night" 
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="container mx-auto px-6 py-32 relative z-20">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Lifesaving care, anytime, anywhere.
            </h1>
            <p className="text-xl mb-8">
              We are committed to providing swift, professional, and compassionate emergency medical services when you need them most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleBookNow}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
              >
                Book Online
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <h3 className="text-4xl font-bold text-primary mb-2">24/7</h3>
              <p className="text-gray-600">Emergency Service</p>
            </div>
            <div className="p-6">
              <h3 className="text-4xl font-bold text-primary mb-2">10k+</h3>
              <p className="text-gray-600">Successful Rescues</p>
            </div>
            <div className="p-6">
              <h3 className="text-4xl font-bold text-primary mb-2">100%</h3>
              <p className="text-gray-600">Patient Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Our Services</h2>
            <p className="text-gray-600">Specialized & Professional Emergency Medical Services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* General & Medicine */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="bg-red-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg className="text-primary w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18"></path>
                    <path d="M7 13v4"></path>
                    <path d="M13 13v4"></path>
                    <path d="M19 7v10"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">General & Medicine</h3>
                <p className="text-gray-600 mb-4">Emergency medical care for all general illnesses and injuries</p>
                <Link to="/services/general-medicine" className="text-primary hover:underline inline-flex items-center">
                  Learn more →
                </Link>
              </div>
            </div>

            {/* Specialized Care */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="bg-red-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg className="text-primary w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Specialized Care</h3>
                <p className="text-gray-600 mb-4">Critical care transport with specialized equipment and staff</p>
                <Link to="/services/specialized-care" className="text-primary hover:underline inline-flex items-center">
                  Learn more →
                </Link>
              </div>
            </div>

            {/* Scheduled Transport */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="bg-red-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg className="text-primary w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                    <path d="M16 3l0 4"></path>
                    <path d="M8 3l0 4"></path>
                    <path d="M4 11l16 0"></path>
                    <path d="M8 15h2v2h-2z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Scheduled Transport</h3>
                <p className="text-gray-600 mb-4">Pre-arranged medical transport for appointments or transfers</p>
                <Link to="/services/scheduled-transport" className="text-primary hover:underline inline-flex items-center">
                  Learn more →
                </Link>
              </div>
            </div>

            {/* Professional Care */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="bg-red-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg className="text-primary w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 20l-12 -12m19 12v-4h-12a4 4 0 0 1 0 -8h4"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Professional Care</h3>
                <p className="text-gray-600 mb-4">Advanced life support with trained medical staff</p>
                <Link to="/services/professional-care" className="text-primary hover:underline inline-flex items-center">
                  Learn more →
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">How It Works</h2>
            <p className="text-gray-600">Our streamlined process ensures reliable medical help is instantly available when you need it.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="text-primary w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Request Service</h3>
              <p className="text-gray-600">Call our emergency number or use our online booking form to request an ambulance.</p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="text-primary w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
                  <path d="M9 17h6"></path>
                  <path d="M9 13h6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Provide Details</h3>
              <p className="text-gray-600">Give us the necessary information about the patient and the medical situation.</p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="text-primary w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                  <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                  <path d="M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Ambulance Dispatch</h3>
              <p className="text-gray-600">Our nearest ambulance will be immediately dispatched to your location.</p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="text-primary w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l4 0"></path>
                  <path d="M7 3l0 6"></path>
                  <path d="M13 3l0 18"></path>
                  <path d="M13 13l8 -4"></path>
                  <path d="M13 7l8 4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Medical Facility</h3>
              <p className="text-gray-600">We'll transport the patient safely to the appropriate medical facility.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2 bg-primary text-white p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-6">Ambulance for emergencies</h2>
              <p className="mb-6">Call our 24/7 hotline for immediate ambulance service for emergencies. If you need help with any issue, please call our emergency number directly.</p>
              <div className="mb-4">
                <p className="font-bold">Emergency Hotline</p>
                <p className="text-xl">123-456-7890</p>
              </div>
            </div>
            <div className="md:col-span-3 bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" id="name" className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" id="phone" className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input type="text" id="location" className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                  <select id="service" className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="emergency">Emergency</option>
                    <option value="non-emergency">Non-Emergency</option>
                    <option value="scheduled">Scheduled Transport</option>
                    <option value="consultation">Medical Consultation</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                  <textarea id="message" rows={4} className="w-full p-2 border border-gray-300 rounded-md"></textarea>
                </div>
                <Button className="w-full">Submit Request</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-blue-500 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">What Our Clients Say</h2>
            <p className="text-blue-100">We're dedicated to providing the most positive service during emergency situations. Here's what our clients have to say about our service.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white text-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="text-yellow-400">★★★★★</span>
              </div>
              <p className="italic mb-4">"I was terrified when my husband began to have chest pains. The DrutaSeva team brought in their quick action, and the paramedics were extraordinary in helping. They made a scary situation much better."</p>
              <p className="font-bold">- Sarah Johnson</p>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-white text-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="text-yellow-400">★★★★★</span>
              </div>
              <p className="italic mb-4">"The rapid transport service for my elderly father was excellent. The team was cautious, respectful, and made the transfer experience secure and comfortable."</p>
              <p className="font-bold">- Michael Chen</p>
            </div>
            {/* Testimonial 3 */}
            <div className="bg-white text-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="text-yellow-400">★★★★★</span>
              </div>
              <p className="italic mb-4">"After my car's serious accident, the DrutaSeva ambulance arrived in mere minutes. Their swift action and expert care were key factors in my successful recovery."</p>
              <p className="font-bold">- Emily Parker</p>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </MainLayout>
  );
};

export default Index;
