import React, { useState } from 'react';

interface EmailShareFormProps {
  onShare: (emails: string[]) => void;
  isSharing?: boolean;
}

const EmailShareForm: React.FC<EmailShareFormProps> = ({ onShare, isSharing }) => {
  const [emails, setEmails] = useState('');

  const handleSubmit = () => {
    const list = emails.split(',').map((e) => e.trim()).filter(e => e);
    if (list.length === 0) {
      alert('Please enter at least one email address');
      return;
    }
    onShare(list);
  };

  return (
    <div className="p-4 border rounded-md">
      <label className="block text-sm font-medium mb-2">Share Summary via Email</label>
      <input
        type="email"
        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
        placeholder="Enter recipient emails (comma separated)"
        value={emails}
        onChange={(e) => setEmails(e.target.value)}
      />
      <button 
        onClick={handleSubmit} 
        disabled={isSharing || !emails.trim()}
        className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isSharing ? 'Sharing...' : 'Share Summary'}
      </button>
    </div>
  );
};

export default EmailShareForm;