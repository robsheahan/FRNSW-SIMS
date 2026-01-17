import dayjs from 'dayjs';

/**
 * Get formatted date string for display
 * @returns {string} - Formatted date (e.g., "Saturday, Jan 17, 2026")
 */
export const getFormattedDate = () => {
  return dayjs().format('dddd, MMM D, YYYY');
};

/**
 * Get current day of week
 * @returns {string} - Day name (e.g., "Monday")
 */
export const getCurrentDay = () => {
  return dayjs().format('dddd');
};

/**
 * Get current shift (placeholder - would be determined by user login or date/time)
 * @returns {string} - Shift identifier (A, B, C, or D)
 */
export const getCurrentShift = () => {
  // This is a placeholder - in production this would be determined by:
  // - User authentication/login
  // - Date/time calculation based on shift rotation
  // - User selection
  return 'A';
};
