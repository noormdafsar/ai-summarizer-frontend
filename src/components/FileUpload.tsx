import React, { useState, useRef } from 'react';

interface FileUploadProps {
  onUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      onUpload(selectedFile);
      alert('File uploaded successfully!');
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-4 border rounded-md">
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
      <button 
        onClick={handleUploadClick}
        className="px-4 py-1 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 hover:text-white"
      >
        Upload File
      </button>
      {file && <span className="ml-2 text-sm text-gray-600">{file.name}</span>}
    </div>
  );
};

export default FileUpload;