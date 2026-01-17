import { CheckCircle, MessageSquare } from 'lucide-react';
import { STATION_INFO } from '../constants/theme';

const Footer = ({ allTasksComplete, onConfirm, onContactFleet }) => {
  return (
    <footer className="bg-white border-t border-slate-200 p-4 shadow-lg fixed bottom-0 left-0 right-0">
      <div className="max-w-4xl mx-auto">
        {/* Auto-sign Note */}
        <div className="text-sm text-slate-600 text-center mb-3">
          Signed off as: <span className="font-semibold">{STATION_INFO.SERVICE_NUMBER_PLACEHOLDER}</span>
        </div>

        {/* Buttons Container */}
        <div className="space-y-2">
          {/* Contact Fleet Button */}
          <button
            onClick={onContactFleet}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-base transition-all bg-slate-600 text-white hover:bg-slate-700 shadow"
            style={{ minHeight: '48px' }}
          >
            <MessageSquare size={20} />
            <span>Contact Fleet</span>
          </button>

          {/* Confirm Button */}
          <button
            onClick={onConfirm}
            disabled={!allTasksComplete}
            className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-bold text-lg transition-all ${
              allTasksComplete
                ? 'bg-frnsw-red text-white hover:bg-red-700 shadow-lg cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
            style={{ minHeight: '56px' }}
          >
            <CheckCircle size={24} />
            <span>Confirm & Log SIMS</span>
          </button>

          {/* Helper Text */}
          {!allTasksComplete && (
            <div className="text-sm text-slate-500 text-center mt-2">
              Complete all tasks to enable submission
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
