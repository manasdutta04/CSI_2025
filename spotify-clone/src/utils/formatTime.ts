/**
 * Formats time in seconds to minutes:seconds format
 * @param seconds - Time in seconds
 * @returns Formatted time string (e.g., "3:45")
 */
export const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}; 