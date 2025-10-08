// Database tiplerinden export
export type { Database } from './database.types';

export interface Business {
  id: string;
  name: string;
  slug: string;
  email: string;
  phone?: string;
  description?: string;
  trial_start: string;
  trial_end: string;
  subscription_status: 'trial' | 'active' | 'expired';
  subscription_end?: string;
  slot_duration: 15 | 30 | 45 | 60;
  created_at: string;
  updated_at: string;
}

export interface WorkingHour {
  id: string;
  business_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_active: boolean;
  created_at: string;
}

export interface Appointment {
  id: string;
  business_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  notes?: string;
  appointment_date: string;
  appointment_time: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  reminder_sent: boolean;
  reminder_sent_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Holiday {
  id: string;
  business_id: string;
  holiday_date: string;
  description?: string;
  created_at: string;
}