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
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (file: File) => {
    try {
      const text = await file.text();
      setTranscript(text);
      setError('');
    } catch (err) {
      setError('Failed to read file');
    }
  };

  const handleGenerate = async () => {
    if (!transcript.trim()) {
      setError('Please upload a transcript first');
      return;
    }
    
    setIsGenerating(true);
    setError('');
    try {
      const res = await api.post('/summary', { transcript, prompt });
      setSummary(res.data.summary);
    } catch (err: any) {
      setError('Failed to generate summary: ' + (err.response?.data?.error || err.message));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async (emails: string[]) => {
    if (!summary.trim()) {
      setError('Please generate a summary first');
      return;
    }
    
    setIsSharing(true);
    setError('');
    try {
      await api.post('/share', { summary, recipients: emails });
      alert('Summary shared successfully!');
    } catch (err: any) {
      setError('Failed to share summary: ' + (err.response?.data?.error || err.message));
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">AI Meeting Summarizer</h1>
      
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <FileUpload onUpload={handleUpload} />
      {transcript && (
        <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          ✓ Transcript uploaded ({transcript.length} characters)
        </div>
      )}
      
      <PromptInput prompt={prompt} setPrompt={setPrompt} />
      
      <button 
        onClick={handleGenerate} 
        disabled={isGenerating || !transcript}
        className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isGenerating ? 'Generating...' : 'Generate Summary'}
      </button>
      
      {summary && <SummaryEditor summary={summary} setSummary={setSummary} />}
      {summary && <EmailShareForm onShare={handleShare} isSharing={isSharing} />}
    </div>
  );
};

export default App;