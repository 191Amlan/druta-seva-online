
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'email' | 'phone' | 'google'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const { toast } = useToast();
  const { signIn, signUp } = useAuth();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn({ email, password });
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      onClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please check your credentials and try again",
      });
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp({ email, password });
      toast({
        title: "Account created",
        description: "Your account has been created successfully",
      });
      onClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: "Please try again with different credentials",
      });
    }
  };

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!otpSent) {
        // Simulate sending OTP
        setOtpSent(true);
        toast({
          title: "OTP sent",
          description: `A verification code has been sent to ${phone}`,
        });
      } else {
        // Verify OTP and login
        await signIn({ phone });
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        onClose();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please check your credentials and try again",
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn({ email: 'google@example.com' });
      toast({
        title: "Google login successful",
        description: "Welcome back!",
      });
      onClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please try again later",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {activeTab === 'google' ? 'Continue with Google' : activeTab === 'phone' ? 'Continue with Phone' : 'Continue with Email'}
          </DialogTitle>
        </DialogHeader>

        <div className="pt-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="email" onClick={() => setActiveTab('email')}>Email</TabsTrigger>
            <TabsTrigger value="phone" onClick={() => setActiveTab('phone')}>Phone</TabsTrigger>
            <TabsTrigger value="google" onClick={() => setActiveTab('google')}>Google</TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="mt-6 space-y-4">
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="pt-2 space-y-2">
                <Button type="submit" className="w-full">Sign In</Button>
                <Button type="button" variant="outline" className="w-full" onClick={handleEmailSignUp}>
                  Create Account
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="phone" className="mt-6 space-y-4">
            <form onSubmit={handlePhoneLogin} className="space-y-4">
              {!otpSent ? (
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="+1 234 567 8900"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input 
                    id="otp" 
                    type="text" 
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="pt-2">
                <Button type="submit" className="w-full">
                  {otpSent ? 'Verify OTP' : 'Send OTP'}
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="google" className="mt-6 space-y-4">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              onClick={handleGoogleLogin}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path
                  d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                  fill="#EA4335"
                />
                <path
                  d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                  fill="#4285F4"
                />
                <path
                  d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                  fill="#FBBC05"
                />
                <path
                  d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                  fill="#34A853"
                />
              </svg>
              <span>Continue with Google</span>
            </Button>
          </TabsContent>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
