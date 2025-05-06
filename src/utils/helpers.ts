/**
 * Truncates a string to a specified length and adds ellipsis if needed
 * @param str The string to truncate
 * @param maxLength The maximum length of the string
 * @returns The truncated string
 */
export const truncateString = (str: string, maxLength: number): string => {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  return `${str.substring(0, maxLength)}...`;
};

/**
 * Formats a date string to a more readable format
 * @param dateString The date string to format
 * @returns The formatted date string
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return 'Unknown';
  
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

/**
 * Formats a number with commas for thousands
 * @param num The number to format
 * @returns The formatted number string
 */
export const formatNumber = (num: number): string => {
  if (num === undefined || num === null) return 'N/A';
  return num.toLocaleString();
};

/**
 * Extracts the year from a date string
 * @param dateString The date string
 * @returns The year as a number or undefined
 */
export const extractYear = (dateString: string): number | undefined => {
  if (!dateString) return undefined;
  
  try {
    const date = new Date(dateString);
    return date.getFullYear();
  } catch (error) {
    console.error('Error extracting year:', error);
    return undefined;
  }
};
