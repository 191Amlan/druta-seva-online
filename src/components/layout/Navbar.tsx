
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, signOut, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#1a212e] text-white py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
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
          <span className="text-xl font-bold">DrutaSeva</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/services" className="hover:text-primary transition-colors">Services</Link>
          <Link to="/how-it-works" className="hover:text-primary transition-colors">How It Works</Link>
          <Link to="/testimonials" className="hover:text-primary transition-colors">Testimonials</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          
          <a href="tel:123-456-7890" className="bg-primary text-white px-4 py-2 rounded-md font-medium">
            Emergency: 123-456-7890
          </a>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="border-white text-white hover:text-primary hover:bg-transparent">
                  <User size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link to="/my-rescue" className="w-full">My Rescue</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" className="border-white text-white hover:text-primary hover:bg-transparent">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu size={24} />
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#1a212e] text-white py-4 px-6 space-y-4 shadow-lg">
          <Link to="/services" className="block py-2 hover:text-primary transition-colors">Services</Link>
          <Link to="/how-it-works" className="block py-2 hover:text-primary transition-colors">How It Works</Link>
          <Link to="/testimonials" className="block py-2 hover:text-primary transition-colors">Testimonials</Link>
          <Link to="/contact" className="block py-2 hover:text-primary transition-colors">Contact</Link>
          
          <a href="tel:123-456-7890" className="block py-2 text-primary font-medium">
            Emergency: 123-456-7890
          </a>

          {isAuthenticated ? (
            <>
              <Link to="/my-rescue" className="block py-2 hover:text-primary transition-colors">My Rescue</Link>
              <Button variant="outline" className="w-full justify-start" onClick={() => signOut()}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Button>
            </>
          ) : (
            <Button variant="outline" className="w-full justify-start">
              <Link to="/login" className="w-full">Login</Link>
            </Button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
