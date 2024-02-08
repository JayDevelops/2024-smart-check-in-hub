import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAmPm(date: Date | null) {
  if (!date) {
    return ""
  }

  let hours = date.getHours();
  let minutes: string | number = date.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;

  minutes = minutes < 10 ? '0'+minutes : minutes;
  return hours + ':' + minutes + ' ' + ampm;
}

// Function to convert camelCase to spaced string
export function camelCaseToSpacedString(str: string): string {
  return str
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between lowercase and uppercase letters
      .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2'); // Add space between consecutive uppercase letters followed by lowercase
}