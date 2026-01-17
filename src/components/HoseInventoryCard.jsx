import { useState } from 'react';
import { Plus, Trash2, MoveRight, Edit2 } from 'lucide-react';
import { STORAGE_OPTIONS, HOSE_CATEGORIES } from '../utils/hoseData';

const HoseInventoryCard = ({
  category,
  hoses,
  isEditMode,
  previousCheck,
  onAddHose,
  onDeleteHose,
  onMoveHose,
  onUpdateStorage,
  onUpdateSerialNumber,
}) => {
  const [newSerialNumber, setNewSerialNumber] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editSerialNumber, setEditSerialNumber] = useState('');
  const [moveHoseId, setMoveHoseId] = useState(null);

  // Check if storage has changed from previous check
  const hasChanged = (hose) => {
    if (!previousCheck || !previousCheck[category]) return false;
    const prevHose = previousCheck[category].find(h => h.id === hose.id);
    return prevHose && prevHose.storage !== hose.storage;
  };

  const handleAddHose = () => {
    if (newSerialNumber.trim()) {
      onAddHose(category, newSerialNumber.trim());
      setNewSerialNumber('');
    }
  };

  const handleStartEdit = (hose) => {
    setEditingId(hose.id);
    setEditSerialNumber(hose.serialNumber);
  };

  const handleSaveEdit = (hoseId) => {
    if (editSerialNumber.trim()) {
      onUpdateSerialNumber(category, hoseId, editSerialNumber.trim());
    }
    setEditingId(null);
    setEditSerialNumber('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditSerialNumber('');
  };

  const handleMoveHose = (targetCategory) => {
    if (moveHoseId) {
      onMoveHose(category, moveHoseId, targetCategory);
      setMoveHoseId(null);
    }
  };

  return (
    <div className="bg-white rounded-lg border-2 border-slate-200 p-4 mb-4">
      {/* Category Header */}
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-200">
        <h3 className="font-semibold text-slate-900 text-lg">{category}</h3>
        <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded">
          {hoses.length} {hoses.length === 1 ? 'hose' : 'hoses'}
        </span>
      </div>

      {/* Hose List */}
      <div className="space-y-3">
        {hoses.length === 0 ? (
          <div className="text-center py-4 text-slate-400 text-sm">
            No hoses in this category
          </div>
        ) : (
          hoses.map((hose) => (
            <div
              key={hose.id}
              className={`border rounded-lg p-3 transition-all ${
                hasChanged(hose)
                  ? 'border-amber-400 bg-amber-50'
                  : 'border-slate-200 bg-slate-50'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Serial Number */}
                <div className="flex-1">
                  {isEditMode && editingId === hose.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editSerialNumber}
                        onChange={(e) => setEditSerialNumber(e.target.value)}
                        className="flex-1 px-2 py-1 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-frnsw-red focus:border-frnsw-red outline-none"
                        placeholder="Serial number"
                        autoFocus
                      />
                      <button
                        onClick={() => handleSaveEdit(hose.id)}
                        className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-2 py-1 text-xs bg-slate-300 text-slate-700 rounded hover:bg-slate-400"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-medium text-slate-900">
                        {hose.serialNumber}
                      </span>
                      {isEditMode && (
                        <button
                          onClick={() => handleStartEdit(hose)}
                          className="text-slate-400 hover:text-slate-600"
                          title="Edit serial number"
                        >
                          <Edit2 size={14} />
                        </button>
                      )}
                    </div>
                  )}

                  {/* Storage Dropdown */}
                  {!isEditMode && (
                    <div className="mt-2">
                      <select
                        value={hose.storage}
                        onChange={(e) => onUpdateStorage(category, hose.id, e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-frnsw-red focus:border-frnsw-red outline-none bg-white min-h-touch"
                      >
                        {STORAGE_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {hasChanged(hose) && (
                        <p className="text-xs text-amber-600 mt-1 font-medium">
                          Changed this session
                        </p>
                      )}
                    </div>
                  )}

                  {/* Move Hose Controls */}
                  {isEditMode && moveHoseId === hose.id && (
                    <div className="mt-2">
                      <label className="text-xs text-slate-600 mb-1 block">
                        Move to category:
                      </label>
                      <div className="flex gap-1 flex-wrap">
                        {HOSE_CATEGORIES.filter(cat => cat !== category).map((targetCat) => (
                          <button
                            key={targetCat}
                            onClick={() => handleMoveHose(targetCat)}
                            className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                          >
                            {targetCat}
                          </button>
                        ))}
                        <button
                          onClick={() => setMoveHoseId(null)}
                          className="px-2 py-1 text-xs bg-slate-200 text-slate-700 rounded hover:bg-slate-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Edit Mode Actions */}
                {isEditMode && editingId !== hose.id && (
                  <div className="flex gap-1">
                    <button
                      onClick={() => setMoveHoseId(moveHoseId === hose.id ? null : hose.id)}
                      className={`p-2 rounded transition-colors ${
                        moveHoseId === hose.id
                          ? 'bg-blue-100 text-blue-600'
                          : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                      title="Move to another category"
                    >
                      <MoveRight size={16} />
                    </button>
                    <button
                      onClick={() => onDeleteHose(category, hose.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete hose"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add New Hose (Edit Mode Only) */}
      {isEditMode && (
        <div className="mt-4 pt-4 border-t border-slate-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={newSerialNumber}
              onChange={(e) => setNewSerialNumber(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddHose()}
              placeholder="Enter serial number"
              className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-frnsw-red focus:border-frnsw-red outline-none"
            />
            <button
              onClick={handleAddHose}
              className="flex items-center gap-1 px-3 py-2 bg-frnsw-red text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
            >
              <Plus size={16} />
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HoseInventoryCard;
