import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function safelocalStorageGetItem<T>(key: string): T | null {
  try {
    const data = localStorage.getItem(key);

    if (!data) {
      return null;
    }

    return JSON.parse(data);
  } catch {
    return null;
  }
}

interface IformatDate {
  dateInUnix?: number;
  dateTolongFormat?: string;
}
export function formatDate({ dateInUnix, dateTolongFormat }: IformatDate): string {

  function dateTonumericFormat(dateRaw: number) {
    const date = new Date(dateRaw);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getUTCDate();
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  function dateToLongFormat(dateRaw: string) {
    const date = dateRaw.split('-');
    return new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2])).toLocaleString('pt-BR', {
      year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'
    })
  }

  if (dateTolongFormat) {
    let dateRaw = dateTolongFormat;
    if (typeof (dateRaw) !== 'string') {
      dateRaw = dateTonumericFormat(dateRaw);
    }
    return dateToLongFormat(dateRaw);
  }

  if (dateInUnix) {
    const date = new Date(dateInUnix);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getUTCDate();
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  return '';
};

export function formateDateToMounth(date: string) {
  const month = new Date(date).toLocaleString('utc', { month: 'long' });
  const year = new Date(date).toLocaleString('utc', { year: '2-digit' });
  const [first, ...rest] = month;
  const monthToUppercase = first.toUpperCase() + rest.join('');
  return `${monthToUppercase} - ${year}`;
};


export function formatToUppercase(string: string): string {
  const upercaseString = string.toUpperCase();

  return upercaseString;
}

