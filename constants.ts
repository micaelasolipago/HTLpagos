
import { Country } from './types';

export const BONIFICATION_PERCENTAGE = 0.01; // 1%
export const BOOKING_FEE_PERCENTAGE = 0.02; // 2%

export const COUNTRY_CURRENCIES: Record<Country, string> = {
  [Country.ARGENTINA]: 'ARS',
  [Country.CHILE]: 'CLP',
  [Country.PERU]: 'PEN',
  [Country.BOLIVIA]: 'BOB',
  [Country.PARAGUAY]: 'PYG',
  [Country.URUGUAY]: 'UYU'
};

export const COLORS = {
  primary: '#0F172A', // Slate 900
  secondary: '#10B981', // Emerald 500
  accent: '#F59E0B', // Amber 500
  danger: '#EF4444', // Red 500
  bg: '#F8FAFC' // Slate 50
};
