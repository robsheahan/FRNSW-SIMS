import { Check, AlertTriangle, Info, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DefectForm from './DefectForm';

const TaskCard = ({ task, onStatusChange, onDefectDataChange }) => {
  const navigate = useNavigate();
  const { name, status, serialNumber, comment } = task;

  const handleStatusClick = (newStatus) => {
    // Toggle off if clicking the same status
    const finalStatus = status === newStatus ? null : newStatus;
    onStatusChange(finalStatus);
  };

  const handleHoseClick = () => {
    navigate('/hose-check');
  };

  const isHoseTask = name.toLowerCase() === 'hose';

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-3">
      {/* Task Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 flex-1">
          <h3 className="font-semibold text-slate-900 text-lg">{name}</h3>
          <button
            className="text-slate-400 hover:text-slate-600 transition-colors"
            title="View Info Sheet"
            aria-label="View information sheet"
          >
            <Info size={20} />
          </button>
        </div>

        {/* Hose Task Special Button */}
        {isHoseTask && (
          <button
            onClick={handleHoseClick}
            className="flex items-center gap-1 px-3 py-2 bg-frnsw-red text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium min-h-touch"
          >
            Details
            <ChevronRight size={16} />
          </button>
        )}
      </div>

      {/* Status Toggle Buttons */}
      <div className="flex gap-2 mb-2">
        {/* Satisfactory Button */}
        <button
          onClick={() => handleStatusClick('satisfactory')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md font-medium transition-all min-h-touch ${
            status === 'satisfactory'
              ? 'bg-green-500 text-white shadow-lg scale-105'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Check size={20} />
          <span>Satisfactory</span>
        </button>

        {/* Defect Button */}
        <button
          onClick={() => handleStatusClick('defect')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md font-medium transition-all min-h-touch ${
            status === 'defect'
              ? 'bg-red-500 text-white shadow-lg scale-105'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <AlertTriangle size={20} />
          <span>Defect</span>
        </button>

        {/* N/A Button */}
        <button
          onClick={() => handleStatusClick('na')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md font-medium transition-all min-h-touch ${
            status === 'na'
              ? 'bg-gray-400 text-white shadow-lg scale-105'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <span>N/A</span>
        </button>
      </div>

      {/* Conditional Defect Form */}
      {status === 'defect' && (
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
