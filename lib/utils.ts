import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateExperienceYears(startYear: number = 2012): number {
  const currentYear = new Date().getFullYear();
  return currentYear - startYear + 1;
}