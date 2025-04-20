
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1a212e] text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                <path d="M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5"></path>
                <path d="M6 10h4m-2 -2v4"></path>
              </svg>
              <span className="font-bold text-xl text-white">DrutaSeva</span>
            </div>
            <p className="text-sm mb-6">
              Providing fast and reliable ambulance services when you need them most. Available 24/7 for all your emergency transport needs.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link to="/how-it-works" className="hover:text-primary transition-colors">How It Works</Link></li>
              <li><Link to="/testimonials" className="hover:text-primary transition-colors">Testimonials</Link></li>
              <li><Link to="/book" className="hover:text-primary transition-colors">Book Ambulance</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-white mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services/emergency-response" className="hover:text-primary transition-colors">Emergency Response</Link></li>
              <li><Link to="/services/non-emergency-transport" className="hover:text-primary transition-colors">Non-Emergency Transport</Link></li>
              <li><Link to="/services/scheduled-medical-transport" className="hover:text-primary transition-colors">Scheduled Medical Transport</Link></li>
              <li><Link to="/services/specialized-care" className="hover:text-primary transition-colors">Specialized Care</Link></li>
              <li><Link to="/services/first-aid-training" className="hover:text-primary transition-colors">First Aid Training</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-white mb-4">Contact Info</h3>
            <div className="space-y-3 text-sm">
              <p className="flex flex-col">
                <span>123 Medical Center Drive</span>
                <span>Health City, CA 90210</span>
              </p>
              <p>
                <strong>Emergency:</strong> 123-456-7890
              </p>
              <p>
                <strong>Email:</strong> info@drutaseva.com
              </p>
              <p>
                <strong>Working Hours:</strong>
                <br />
                Emergency: 24/7
                <br />
                Office Hours: M-F, 8 am - 5 pm
              </p>
            </div>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">© 2025 DrutaSeva Ambulance Services. All rights reserved.</p>
          <p className="text-sm flex items-center">
            Made with <span className="text-primary mx-1">❤</span> for those in need
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
