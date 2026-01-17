// Hose categories
export const HOSE_CATEGORIES = [
  '38mm Non-Percolating',
  '38mm Percolating',
  '70mm Percolating',
  '70mm Non-Percolating',
  '25mm Percolating',
  '25mm Non-Percolating',
];

// Storage location options
export const STORAGE_OPTIONS = [
  'Store',
  'Whip',
  'Pump Flaked',
  'Pump Rolled',
  'Pump Goat Bag',
];

// Generate a default hose inventory with mock serial numbers
export const getDefaultHoseInventory = () => {
  return {
    '38mm Non-Percolating': [
      { id: '38np-1', serialNumber: 'HNP-001', storage: 'Store' },
      { id: '38np-2', serialNumber: 'HNP-002', storage: 'Store' },
      { id: '38np-3', serialNumber: 'HNP-003', storage: 'Pump Rolled' },
    ],
    '38mm Percolating': [
      { id: '38p-1', serialNumber: 'HP-001', storage: 'Whip' },
      { id: '38p-2', serialNumber: 'HP-002', storage: 'Pump Flaked' },
    ],
    '70mm Percolating': [
      { id: '70p-1', serialNumber: 'H70P-001', storage: 'Pump Rolled' },
      { id: '70p-2', serialNumber: 'H70P-002', storage: 'Pump Rolled' },
    ],
    '70mm Non-Percolating': [
      { id: '70np-1', serialNumber: 'H70NP-001', storage: 'Store' },
    ],
    '25mm Percolating': [
      { id: '25p-1', serialNumber: 'H25P-001', storage: 'Whip' },
      { id: '25p-2', serialNumber: 'H25P-002', storage: 'Store' },
      { id: '25p-3', serialNumber: 'H25P-003', storage: 'Pump Goat Bag' },
    ],
    '25mm Non-Percolating': [
      { id: '25np-1', serialNumber: 'H25NP-001', storage: 'Store' },
    ],
  };
};

// Get or initialize hose inventory from localStorage
export const loadHoseInventory = () => {
  const stored = localStorage.getItem('frnsw-hose-inventory');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse stored hose inventory:', e);
    }
  }
  return getDefaultHoseInventory();
};

// Save hose inventory to localStorage
export const saveHoseInventory = (inventory) => {
  localStorage.setItem('frnsw-hose-inventory', JSON.stringify(inventory));
};

// Load previous check state (what was saved last time)
export const loadPreviousCheck = () => {
  const stored = localStorage.getItem('frnsw-hose-previous-check');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse previous check:', e);
    }
  }
  return null;
};

// Save current check as previous check
export const savePreviousCheck = (inventory) => {
  localStorage.setItem('frnsw-hose-previous-check', JSON.stringify(inventory));
};

// Generate unique ID for new hose
export const generateHoseId = (category) => {
  const prefix = category.toLowerCase().replace(/[^a-z0-9]/g, '');
  const timestamp = Date.now();
  return `${prefix}-${timestamp}`;
};
