import { getFormattedDate, getCurrentShift } from '../utils/dateUtils';
import { STATION_INFO } from '../constants/theme';

const Header = () => {
  const formattedDate = getFormattedDate();
  const currentShift = getCurrentShift();

  return (
    <header className="bg-frnsw-red text-white p-4 shadow-lg">
      <div className="max-w-4xl mx-auto">
        {/* Station Info */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-2xl font-bold">FRNSW SIMS</h1>
            <p className="text-sm opacity-90">{STATION_INFO.NAME}</p>
          </div>
          <div className="text-right">
            <div className="bg-white text-frnsw-red px-3 py-1 rounded font-bold text-lg">
              {currentShift} Platoon
            </div>
          </div>
        </div>

        {/* Appliance Type */}
        <div className="text-sm opacity-90 mb-2">
          <span className="font-semibold">Appliance:</span> {STATION_INFO.APPLIANCE_TYPE}
        </div>

        {/* Date */}
        <div className="text-sm font-medium border-t border-white/20 pt-2">
          {formattedDate}
        </div>
      </div>
    </header>
  );
};

export default Header;
