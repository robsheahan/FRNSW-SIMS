import { useState } from 'react';
import { X, Send } from 'lucide-react';

const ContactFleetModal = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = () => {
    if (!message.trim()) {
      alert('Please enter a message before sending.');
      return;
    }

    setIsSending(true);

    // Simulate sending (in production, this would call an API)
    setTimeout(() => {
      console.log('Message to Fleet:', message);
      alert('Message sent to Fleet!\n\n(In production, this would be sent to: fleet@frnsw.gov.au)');
      setMessage('');
      setIsSending(false);
      onClose();
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-slide-in">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Contact Fleet</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-3">
              Send a message to the Fleet contact regarding equipment defects or maintenance issues.
            </p>
            <p className="text-xs text-slate-500 mb-1">
              Recipient: <span className="font-medium">[Fleet Contact Email - To be configured]</span>
            </p>
          </div>

          {/* Message Textarea */}
          <div className="mb-4">
            <label htmlFor="fleet-message" className="block text-sm font-medium text-slate-700 mb-2">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="fleet-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe the issue or provide details..."
              rows="6"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-frnsw-red focus:border-frnsw-red outline-none resize-none text-sm"
              disabled={isSending}
            />
            <p className="text-xs text-slate-500 mt-1">
              {message.length} characters
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2 p-4 border-t border-slate-200">
          <button
            onClick={onClose}
            disabled={isSending}
            className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={isSending || !message.trim()}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-frnsw-red text-white rounded-md hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? (
              'Sending...'
            ) : (
              <>
                <Send size={16} />
                Send
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactFleetModal;
