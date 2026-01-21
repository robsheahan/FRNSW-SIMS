// Core tasks that must be checked every day
export const DAILY_CORE = [
  'Appliance',
  'SCBA',
  'Portable radios',
  'AC voltage detector',
  'Incident hydration daily',
  'PPE',
  'IT & Comms',
  'Hose Check',
  'Multi-head Gas Detector',
  'Water rescue'
];

// Day-specific tasks mapped to each day of the week
export const DAY_SPECIFIC = {
  Monday: ['Thermal imaging camera', 'Hazmat'],
  Tuesday: ['Ladder', 'Rescue equipment'],
  Wednesday: [],
  Thursday: ['Generators', 'Lighting'],
  Friday: ['Medical equipment', 'BA Maintenance'],
  Saturday: ['PPV', 'Air tool kit'],
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

/**
 * Check if a task is a rotating (day-specific) task
 * Excludes Appliance (truck checks) and SCBA
 * @param {string} taskName - Name of the task
 * @returns {boolean} - True if task is rotating
 */
export const isRotatingTask = (taskName) => {
  // Exclude Appliance (truck checks) and SCBA
  if (taskName === 'Appliance' || taskName === 'SCBA') {
    return false;
  }

  // Check if task appears in any day-specific list
  return Object.values(DAY_SPECIFIC).some(tasks => tasks.includes(taskName));
};

// Daily tasks that should have info links
const DAILY_TASKS_WITH_INFO = ['Multi-head Gas Detector', 'Water rescue'];

/**
 * Check if a task should have an info link
 * @param {string} taskName - Name of the task
 * @returns {boolean} - True if task should have info link
 */
export const hasInfoLink = (taskName) => {
  return isRotatingTask(taskName) || DAILY_TASKS_WITH_INFO.includes(taskName);
};
