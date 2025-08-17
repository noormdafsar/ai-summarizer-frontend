import React, { useState } from 'react';

interface EmailShareFormProps {
  onShare: (emails: string[]) => void;
}

const EmailShareForm: React.FC<EmailShareFormProps> = ({ onShare }) => {
  const [emails, setEmails] = useState('');

  const handleSubmit = () => {
    const list = emails.split(',').map((e) => e.trim());
    onShare(list);
  };

  return (
    <div className="p-4 border rounded-md">
      <input
        type="text"
        className="w-full p-2 border rounded"
        placeholder="Enter recipient emails (comma separated)"
        value={emails}
        onChange={(e) => setEmails(e.target.value)}
      />
      <button onClick={handleSubmit} className="mt-2 px-4 py-1 bg-green-500 text-white rounded">
        Share
      </button>
    </div>
  );
};

export default EmailShareForm;