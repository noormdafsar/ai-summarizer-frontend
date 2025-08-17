import React from 'react';

interface SummaryEditorProps {
  summary: string;
  setSummary: (val: string) => void;
}

const SummaryEditor: React.FC<SummaryEditorProps> = ({ summary, setSummary }) => (
  <textarea
    className="w-full p-4 border rounded"
    rows={10}
    value={summary}
    onChange={(e) => setSummary(e.target.value)}
  />
);

export default SummaryEditor;