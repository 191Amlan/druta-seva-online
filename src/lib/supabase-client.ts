
import { createClient } from '@supabase/supabase-js';

// We're creating a mock Supabase client that just simulates authentication
// In a production app, you'd connect to an actual Supabase instance
const supabaseUrl = 'https://example.supabase.co';
const supabaseAnonKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Mock implementation for demo purposes
export const mockSupabase = {
  auth: {
    signIn: async ({ email, password, phone }: { email?: string; password?: string; phone?: string }) => {
      // Simulate successful auth for any credentials
      const user = {
        id: 'user-123',
        email: email || 'user@example.com',
        phone: phone || '+1234567890'
      };
      localStorage.setItem('drutaseva_user', JSON.stringify(user));
      return { data: { user }, error: null };
    },
    signOut: async () => {
      localStorage.removeItem('drutaseva_user');
      return { error: null };
    },
    signUp: async ({ email, password, phone }: { email?: string; password?: string; phone?: string }) => {
      // Simulate successful registration
      const user = {
        id: 'user-' + Math.floor(Math.random() * 1000),
        email: email || 'user@example.com',
        phone: phone || '+1234567890'
      };
      localStorage.setItem('drutaseva_user', JSON.stringify(user));
      return { data: { user }, error: null };
    },
    getUser: () => {
      const user = localStorage.getItem('drutaseva_user');
      if (user) {
        return { data: { user: JSON.parse(user) }, error: null };
      }
      return { data: { user: null }, error: null };
    }
  },
  from: (table: string) => ({
    insert: async (data: any) => {
      // Simulate database operation
      console.log(`Inserting into ${table}:`, data);
      return { data: { ...data, id: Math.random().toString(36).substring(2, 9) }, error: null };
    },
    select: async () => {
      // Return mock data based on table
      if (table === 'bookings') {
        const mockBookings = localStorage.getItem('drutaseva_bookings');
        if (mockBookings) {
          return { data: JSON.parse(mockBookings), error: null };
        }
        return { data: [], error: null };
      }
      return { data: [], error: null };
    }
  })
};
