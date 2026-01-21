import { ChevronRight, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DefectForm from './DefectForm';
import SCBAForm from './SCBAForm';

const TaskCard = ({ task, isRotating, onStatusChange, onDefectDataChange, onSCBAChange }) => {
  const navigate = useNavigate();
  const { name, status, serialNumber, comment, scbaSets } = task;

  const handleCheckboxChange = (newStatus) => {
    // If clicking the same checkbox, deselect it
    const finalStatus = status === newStatus ? null : newStatus;
    onStatusChange(finalStatus);
  };

  const handleHoseClick = () => {
    navigate('/hose-check');
  };

  const isHoseTask = name.toLowerCase() === 'hose check';
  const isSCBATask = name === 'SCBA';

  return (
    <div className="bg-white border border-slate-200 rounded-md p-3 mb-2 hover:border-slate-300 transition-colors">
      {/* Task Header - More Compact */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 flex-1">
          <h3 className="font-medium text-slate-900 text-base">{name}</h3>
          {/* Info Link for Rotating Tasks Only */}
          {isRotating && (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                // Placeholder - info content to be added later
                alert(`Info for ${name}\n\n(Content to be added)`);
              }}
              className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              title={`View ${name} information`}
            >
              <ExternalLink size={12} />
              Info
            </a>
          )}
        </div>

        {/* Hose Task Special Button */}
        {isHoseTask && (
          <button
            onClick={handleHoseClick}
            className="flex items-center gap-1 px-2 py-1 bg-frnsw-red text-white rounded text-xs font-medium hover:bg-red-700 transition-colors"
          >
            Details
            <ChevronRight size={14} />
          </button>
        )}
      </div>

      {/* Checkbox Options - Compact List (Hidden for SCBA) */}
      {!isSCBATask && (
        <div className="flex items-center gap-4 text-sm">
          {/* Satisfactory Checkbox */}
          <label className="flex items-center gap-1.5 cursor-pointer hover:text-green-600 transition-colors">
            <input
              type="checkbox"
              checked={status === 'satisfactory'}
              onChange={() => handleCheckboxChange('satisfactory')}
              className="w-4 h-4 text-green-600 border-slate-300 rounded focus:ring-green-500 focus:ring-2 cursor-pointer"
            />
            <span className={status === 'satisfactory' ? 'font-semibold text-green-600' : 'text-slate-700'}>
              Satisfactory
            </span>
          </label>

          {/* Defect Checkbox */}
          <label className="flex items-center gap-1.5 cursor-pointer hover:text-red-600 transition-colors">
            <input
              type="checkbox"
              checked={status === 'defect'}
              onChange={() => handleCheckboxChange('defect')}
              className="w-4 h-4 text-red-600 border-slate-300 rounded focus:ring-red-500 focus:ring-2 cursor-pointer"
            />
            <span className={status === 'defect' ? 'font-semibold text-red-600' : 'text-slate-700'}>
              Defect
            </span>
          </label>

          {/* N/A Checkbox */}
          <label className="flex items-center gap-1.5 cursor-pointer hover:text-gray-600 transition-colors">
            <input
              type="checkbox"
              checked={status === 'na'}
              onChange={() => handleCheckboxChange('na')}
              className="w-4 h-4 text-gray-600 border-slate-300 rounded focus:ring-gray-500 focus:ring-2 cursor-pointer"
            />
            <span className={status === 'na' ? 'font-semibold text-gray-600' : 'text-slate-700'}>
              N/A
            </span>
          </label>
        </div>
      )}

      {/* SCBA Special Form - 4 Sets with Serial Numbers */}
      {isSCBATask && (
        <SCBAForm
          scbaSets={scbaSets}
          onChange={onSCBAChange}
        />
      )}

      {/* Conditional Defect Form */}
      {status === 'defect' && !isSCBATask && (
        <DefectForm
          serialNumber={serialNumber}
          comment={comment}
          onSerialNumberChange={(value) => onDefectDataChange('serialNumber', value)}
          onCommentChange={(value) => onDefectDataChange('comment', value)}
        />
      )}
    </div>
  );
};

export default TaskCard;
