import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function safeSessionStorageGetItem<T>(key: string): T | null {
  try {
    const data = sessionStorage.getItem(key);

    if(!data){
      return null;
    }

    return JSON.parse(data);
  } catch{
    return null;
  }
}

export const sessionNameKeys = [
  'personal-data',
  'car-data',
  'Budget-data',
  'pay-format',
  'sub-total',
]
