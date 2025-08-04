import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatTime(totalSeconds : number) {
    if (totalSeconds < 0) {
        return "0 mins 0 seconds";
    }
    
    totalSeconds = Math.floor(totalSeconds);
    
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
        return `${minutes}m ${seconds}s`;
}


export function formatIndianViewCount(count: number): string {
  if (count < 1_000) return count.toString();
  if (count < 1_00_000) {
    return (count / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'; // Thousands
  }
  if (count < 1_00_00_000) {
    return (count / 1_00_000).toFixed(1).replace(/\.0$/, '') + 'L'; // Lakhs
  }
  return (count / 1_00_00_000).toFixed(1).replace(/\.0$/, '') + 'Cr'; // Crores
}
