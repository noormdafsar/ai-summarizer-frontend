import React from 'react';

interface SummaryEditorProps {
  summary: string;
  setSummary: (val: string) => void;
}

const SummaryEditor: React.FC<SummaryEditorProps> = ({ summary, setSummary }) => (
  <div>
    <label className="block text-sm font-medium mb-2">Generated Summary (Editable)</label>
    <textarea
      className="w-full p-4 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      rows={12}
      value={summary}
      onChange={(e) => setSummary(e.target.value)}
      placeholder="Generated summary will appear here..."
    />
  </div>
);

export default SummaryEditor;