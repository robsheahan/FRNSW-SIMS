const DefectForm = ({ serialNumber, comment, onSerialNumberChange, onCommentChange }) => {
  return (
    <div className="mt-3 pt-3 border-t border-slate-200 animate-slide-in">
      <div className="space-y-3">
        {/* Serial Number Input */}
        <div>
          <label htmlFor="serial-number" className="block text-sm font-medium text-slate-700 mb-1">
            Serial Number <span className="text-red-500">*</span>
          </label>
          <input
            id="serial-number"
            type="text"
            value={serialNumber}
            onChange={(e) => onSerialNumberChange(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-frnsw-red focus:border-frnsw-red outline-none min-h-touch"
            placeholder="Enter serial number"
            required
          />
        </div>

        {/* Comment Textarea */}
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-slate-700 mb-1">
            Comment <span className="text-red-500">*</span>
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => onCommentChange(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-frnsw-red focus:border-frnsw-red outline-none resize-none"
            placeholder="Describe the defect..."
            rows="3"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default DefectForm;
