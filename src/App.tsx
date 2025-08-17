import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import PromptInput from './components/PromptInput';
import SummaryEditor from './components/SummaryEditor';
import EmailShareForm from './components/EmailShareForm';
import api from './services/api';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [summary, setSummary] = useState('');
  const [transcript, setTranscript] = useState('');

  const handleUpload = async (file: File) => {
    const text = await file.text();
    setTranscript(text);
  };

  const handleGenerate = async () => {
    const res = await api.post('/summary', { transcript, prompt });
    setSummary(res.data.summary);
  };

  const handleShare = async (emails: string[]) => {
    await api.post('/share', { summary, recipients: emails });
    alert('Summary shared successfully!');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">AI Meeting Summarizer</h1>
      <FileUpload onUpload={handleUpload} />
      <PromptInput prompt={prompt} setPrompt={setPrompt} />
      <button onClick={handleGenerate} className="px-4 py-1 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">
        Generate Summary
      </button>
      <SummaryEditor summary={summary} setSummary={setSummary} />
      <EmailShareForm onShare={handleShare} />
    </div>
  );
};

export default App;