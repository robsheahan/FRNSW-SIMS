// Core tasks that must be checked every day
export const DAILY_CORE = [
  'Appliance',
  'SCBA',
  'Portable radios',
  'AC voltage detector',
  'Incident hydration daily',
  'PPE',
  'IT & Comms'
];

// Day-specific tasks mapped to each day of the week
export const DAY_SPECIFIC = {
  Monday: ['Thermal imaging camera', 'Hazmat'],
  Tuesday: ['Ladder', 'Rescue equipment'],
  Wednesday: ['Pumps', 'Water rescue'],
  Thursday: ['Generators', 'Lighting'],
  Friday: ['Medical equipment', 'BA Maintenance'],
  Saturday: ['Hose', 'PPV', 'Air tool kit'],
  Sunday: ['Radio maintenance', 'Station checks']
};

/**
 * Get all tasks for a specific day
 * @param {string} dayName - Day of the week (e.g., 'Monday', 'Tuesday')
 * @returns {string[]} - Array of task names for that day
 */
export const getTasksForDay = (dayName) => {
  const daySpecific = DAY_SPECIFIC[dayName] || [];
  return [...DAILY_CORE, ...daySpecific];
};

/**
 * Get tasks for today
 * @returns {string[]} - Array of task names for today
 */
export const getTasksForToday = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = days[new Date().getDay()];
  return getTasksForDay(today);
};
