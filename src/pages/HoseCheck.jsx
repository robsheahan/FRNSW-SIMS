import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Droplets, Save, Edit } from 'lucide-react';
import Header from '../components/Header';
import HoseInventoryCard from '../components/HoseInventoryCard';
import {
  HOSE_CATEGORIES,
  loadHoseInventory,
  saveHoseInventory,
  loadPreviousCheck,
  savePreviousCheck,
  generateHoseId,
} from '../utils/hoseData';

const HoseCheck = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState({});
  const [previousCheck, setPreviousCheck] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Load inventory and previous check on mount
  useEffect(() => {
    const loadedInventory = loadHoseInventory();
    const loadedPrevious = loadPreviousCheck();

    setInventory(loadedInventory);
    setPreviousCheck(loadedPrevious || loadedInventory);
  }, []);

  // Track if there are any changes
  useEffect(() => {
    if (!previousCheck) return;

    const changed = HOSE_CATEGORIES.some((category) => {
      const current = inventory[category] || [];
      const previous = previousCheck[category] || [];

      return current.some((hose) => {
        const prevHose = previous.find(h => h.id === hose.id);
        return prevHose && prevHose.storage !== hose.storage;
      });
    });

    setHasChanges(changed);
  }, [inventory, previousCheck]);

  // Add a new hose to a category
  const handleAddHose = (category, serialNumber) => {
    setInventory((prev) => ({
      ...prev,
      [category]: [
        ...(prev[category] || []),
        {
          id: generateHoseId(category),
          serialNumber,
          storage: 'Store', // Default storage
        },
      ],
    }));
  };

  // Delete a hose from a category
  const handleDeleteHose = (category, hoseId) => {
    if (!confirm('Are you sure you want to delete this hose?')) return;

    setInventory((prev) => ({
      ...prev,
      [category]: (prev[category] || []).filter((h) => h.id !== hoseId),
    }));
  };

  // Move a hose to a different category
  const handleMoveHose = (fromCategory, hoseId, toCategory) => {
    const hose = (inventory[fromCategory] || []).find((h) => h.id === hoseId);
    if (!hose) return;

    setInventory((prev) => ({
      ...prev,
      [fromCategory]: (prev[fromCategory] || []).filter((h) => h.id !== hoseId),
      [toCategory]: [...(prev[toCategory] || []), hose],
    }));
  };

  // Update storage location for a hose
  const handleUpdateStorage = (category, hoseId, newStorage) => {
    setInventory((prev) => ({
      ...prev,
      [category]: (prev[category] || []).map((hose) =>
        hose.id === hoseId ? { ...hose, storage: newStorage } : hose
      ),
    }));
  };

  // Update serial number for a hose
  const handleUpdateSerialNumber = (category, hoseId, newSerialNumber) => {
    setInventory((prev) => ({
      ...prev,
      [category]: (prev[category] || []).map((hose) =>
        hose.id === hoseId ? { ...hose, serialNumber: newSerialNumber } : hose
      ),
    }));
  };

  // Save and return to dashboard
  const handleSaveAndReturn = () => {
    // Save current inventory
    saveHoseInventory(inventory);

    // Save as previous check for next time
    savePreviousCheck(inventory);

    // Navigate back to dashboard
    navigate('/');
  };

  // Toggle edit mode
  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const totalHoses = HOSE_CATEGORIES.reduce(
    (sum, cat) => sum + (inventory[cat] || []).length,
    0
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="max-w-4xl mx-auto p-4 pb-32">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-frnsw-red hover:text-red-700 font-medium mb-4"
        >
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>

        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Droplets size={32} className="text-frnsw-red" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Hose Check</h1>
                <p className="text-sm text-slate-600">
                  {totalHoses} total hoses across {HOSE_CATEGORIES.length} categories
                </p>
              </div>
            </div>

            {/* Edit Mode Toggle */}
            <button
              onClick={handleToggleEditMode}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                isEditMode
                  ? 'bg-frnsw-red text-white hover:bg-red-700'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              <Edit size={18} />
              {isEditMode ? 'Exit Edit Mode' : 'Inventory Edit Mode'}
            </button>
          </div>

          {/* Mode Description */}
          {isEditMode ? (
            <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-md">
              <p className="text-sm text-amber-800">
                <strong>Edit Mode:</strong> Add, delete, or move hoses between categories. Edit serial numbers.
              </p>
            </div>
          ) : (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-800">
                <strong>Verification Mode:</strong> Update storage locations for each hose. Changes are highlighted.
              </p>
            </div>
          )}
        </div>

        {/* Hose Categories */}
        <div className="space-y-4">
          {HOSE_CATEGORIES.map((category) => (
            <HoseInventoryCard
              key={category}
              category={category}
              hoses={inventory[category] || []}
              isEditMode={isEditMode}
              previousCheck={previousCheck}
              onAddHose={handleAddHose}
              onDeleteHose={handleDeleteHose}
              onMoveHose={handleMoveHose}
              onUpdateStorage={handleUpdateStorage}
              onUpdateSerialNumber={handleUpdateSerialNumber}
            />
          ))}
        </div>
      </main>

      {/* Fixed Footer */}
      <footer className="bg-white border-t border-slate-200 p-4 shadow-lg fixed bottom-0 left-0 right-0">
        <div className="max-w-4xl mx-auto">
          {hasChanges && !isEditMode && (
            <div className="text-sm text-amber-600 text-center mb-3 font-medium">
              You have unsaved changes
            </div>
          )}
          <button
            onClick={handleSaveAndReturn}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-bold text-lg transition-all bg-frnsw-red text-white hover:bg-red-700 shadow-lg"
            style={{ minHeight: '56px' }}
          >
            <Save size={24} />
            <span>Save & Return to Dashboard</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default HoseCheck;
