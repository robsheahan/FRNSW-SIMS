import { useState } from 'react';
import { Edit2, Check, X } from 'lucide-react';

const SCBAForm = ({ scbaSets, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSets, setEditedSets] = useState(scbaSets);

  const handleEdit = () => {
    setEditedSets(scbaSets);
    setIsEditing(true);
  };

  const handleSave = () => {
    onChange(editedSets);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedSets(scbaSets);
    setIsEditing(false);
  };

  const handleSerialChange = (index, value) => {
    const updated = [...editedSets];
    updated[index].serialNumber = value;
    setEditedSets(updated);
  };

  const handleStatusChange = (index, field, checked) => {
    const updated = [...editedSets];

    // If checking a new status, uncheck the others
    if (checked) {
      updated[index].satisfactory = field === 'satisfactory';
      updated[index].defective = field === 'defective';
      // Clear comment if marking as satisfactory
      if (field === 'satisfactory') {
        updated[index].comment = '';
      }
    } else {
      // If unchecking, just set that field to false
      updated[index][field] = false;
    }

    // Update in real-time when not editing serial numbers
    if (!isEditing) {
      onChange(updated);
    } else {
      setEditedSets(updated);
    }
  };

  const handleCommentChange = (index, value) => {
    const updated = [...editedSets];
    updated[index].comment = value;

    // Update in real-time
    if (!isEditing) {
      onChange(updated);
    } else {
      setEditedSets(updated);
    }
  };

  const displaySets = isEditing ? editedSets : scbaSets;

  return (
    <div className="mt-3 pt-3 border-t border-slate-200 animate-slide-in">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-slate-700">SCBA Sets</h4>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="flex items-center gap-1 px-2 py-1 text-xs text-frnsw-red hover:bg-red-50 rounded transition-colors"
          >
            <Edit2 size={12} />
            Edit Serial Numbers
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1 px-2 py-1 text-xs text-green-600 hover:bg-green-50 rounded transition-colors"
            >
              <Check size={12} />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-1 px-2 py-1 text-xs text-slate-600 hover:bg-slate-100 rounded transition-colors"
            >
              <X size={12} />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="space-y-2">
        {displaySets.map((set, index) => (
          <div key={index} className="bg-slate-50 rounded p-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-600">Set {index + 1}</span>
              <div className="flex items-center gap-3 text-xs">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={set.satisfactory}
                    onChange={(e) => handleStatusChange(index, 'satisfactory', e.target.checked)}
                    className="w-3 h-3 text-green-600 border-slate-300 rounded focus:ring-green-500 focus:ring-1 cursor-pointer"
                  />
                  <span className={set.satisfactory ? 'text-green-600 font-medium' : 'text-slate-600'}>
                    OK
                  </span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={set.defective}
                    onChange={(e) => handleStatusChange(index, 'defective', e.target.checked)}
                    className="w-3 h-3 text-red-600 border-slate-300 rounded focus:ring-red-500 focus:ring-1 cursor-pointer"
                  />
                  <span className={set.defective ? 'text-red-600 font-medium' : 'text-slate-600'}>
                    Defect
                  </span>
                </label>
              </div>
            </div>
            <input
              type="text"
              value={set.serialNumber}
              onChange={(e) => handleSerialChange(index, e.target.value)}
              placeholder={`Serial number ${index + 1}`}
              disabled={!isEditing}
              className={`w-full px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-frnsw-red focus:border-frnsw-red outline-none ${
                isEditing
                  ? 'border-slate-300 bg-white'
                  : 'border-transparent bg-slate-100 text-slate-700'
              }`}
            />
            {/* Comment box for defective SCBA */}
            {set.defective && (
              <div className="mt-2">
                <textarea
                  value={set.comment}
                  onChange={(e) => handleCommentChange(index, e.target.value)}
                  placeholder="Describe the defect..."
                  className="w-full px-2 py-1 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-frnsw-red focus:border-frnsw-red outline-none resize-none"
                  rows="2"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SCBAForm;
