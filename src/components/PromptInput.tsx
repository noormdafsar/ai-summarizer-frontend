import React from 'react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (val: string) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt }) => (
  <div>
    <label className="block text-sm font-medium mb-2">Custom Instructions (Optional)</label>
    <textarea
      className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      rows={3}
      placeholder="e.g., 'Summarize in bullet points for executives' or 'Highlight only action items'"
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
    />
  </div>
);

export default PromptInput;