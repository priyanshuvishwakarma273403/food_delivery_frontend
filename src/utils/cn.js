import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges multiple class names using clsx and tailwind-merge.
 * @param {...string} inputs - Class names or conditional class objects.
 * @returns {string} - Merged class name string.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
