import React from 'react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (val: string) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt }) => (
  <textarea
    className="w-full p-2 border rounded"
    rows={3}
    placeholder="Enter custom instruction..."
    value={prompt}
    onChange={(e) => setPrompt(e.target.value)}
  />
);

export default PromptInput;