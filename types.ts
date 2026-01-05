
export enum Country {
  ARGENTINA = 'Argentina',
  CHILE = 'Chile',
  PERU = 'Peru',
  BOLIVIA = 'Bolivia',
  PARAGUAY = 'Paraguay',
  URUGUAY = 'Uruguay'
}

export interface User {
  id: string;
  name: string;
  email: string;
  country: Country;
  walletBalance: number;
}

export interface CountryPartner {
  id: string;
  name: string;
  email: string;
  countries: Country[];
  balance: number;
  pendingCommissions: number;
  status: 'active' | 'onboarding' | 'suspended';
  totalProcessedVolume: number;
  lastActive: string;
}

export interface Property {
  id: string;
  title: string;
  location: string;
  country: Country;
  pricePerNight: number;
  imageUrl: string;
  rating: number;
}

export interface Booking {
  id: string;
  propertyId: string;
  userId: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface LocalBill {
  id: string;
  category: 'Electricity' | 'Water' | 'Gas' | 'Internet';
  amount: number;
  currency: string;
  country: Country;
  description: string;
  expirationDate: string;
  status: 'pending' | 'verifying' | 'approved' | 'rejected';
  payerId?: string;
}

export interface Transaction {
  id: string;
  type: 'credit' | 'debit' | 'commission';
  amount: number;
  bonus?: number;
  status: 'pending' | 'completed' | 'failed';
  date: string;
  description: string;
}

export interface WalletState {
  balance: number;
  pendingBalance: number;
  transactions: Transaction[];
}
