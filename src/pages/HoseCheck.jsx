import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Droplets } from 'lucide-react';
import Header from '../components/Header';

const HoseCheck = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="max-w-4xl mx-auto p-4">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-frnsw-red hover:text-red-700 font-medium mb-6 min-h-touch"
        >
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>

        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Droplets size={32} className="text-frnsw-red" />
            <h1 className="text-3xl font-bold text-slate-900">Hose Check Sub-Form</h1>
          </div>
          <p className="text-slate-600">Detailed hose inspection and maintenance form</p>
        </div>

        {/* Placeholder Content */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center py-12">
            <div className="mb-4">
              <Droplets size={64} className="text-slate-300 mx-auto" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-700 mb-2">Coming Soon</h2>
            <p className="text-slate-500 mb-6">
              The detailed hose inspection form will include:
            </p>
            <ul className="text-left max-w-md mx-auto space-y-2 text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-frnsw-red mt-1">•</span>
                <span>Individual hose length inspections</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-frnsw-red mt-1">•</span>
                <span>Coupling condition checks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-frnsw-red mt-1">•</span>
                <span>Pressure test results</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-frnsw-red mt-1">•</span>
                <span>Serial number tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-frnsw-red mt-1">•</span>
                <span>Defect documentation</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HoseCheck;
