import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  return `₹${(amount / 1000).toFixed(0)}K`;
}

export function formatSalary(amount: number): string {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} LPA`;
  return `₹${amount.toLocaleString()}`;
}