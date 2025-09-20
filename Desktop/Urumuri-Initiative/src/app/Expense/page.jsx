"use client";
import React, { useState } from 'react';
import { FileText, Download, Eye, AlertCircle } from 'lucide-react';

const DocumentViewer = ({ fileUrl, fileName, fileType }) => {
  const [viewMode, setViewMode] = useState('preview');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Create viewable URL based on file type
  const getViewableUrl = () => {
    if (!fileUrl) return '';

    const fileExt = fileType?.toLowerCase() || fileName?.split('.').pop()?.toLowerCase();
    
    switch (fileExt) {
      case 'pdf':
        // For PDFs, try direct embedding first
        return fileUrl;
      
      case 'doc':
      case 'docx':
        // For Word docs, use Google Docs Viewer
        return `https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`;
      
      case 'ppt':
      case 'pptx':
        // For PowerPoint, use Google Docs Viewer
        return `https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`;
      
      case 'xls':
      case 'xlsx':
        // For Excel, use Google Docs Viewer
        return `https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`;
      
      default:
        return fileUrl;
    }
  };

  const handleIframeLoad = () => {
    setLoading(false);
    setError('');
  };

  const handleIframeError = () => {
    setLoading(false);
    setError('Failed to load document. Please try downloading instead.');
  };

  const fileExt = fileType?.toLowerCase() || fileName?.split('.').pop()?.toLowerCase();
  const viewableUrl = getViewableUrl();

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <FileText className="w-6 h-6 text-blue-600" />
          <div>
            <h3 className="font-medium text-gray-900">{fileName || 'Document'}</h3>
            <p className="text-sm text-gray-500 uppercase">{fileExt} file</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* View Mode Toggle */}
          <button
            onClick={() => setViewMode(viewMode === 'preview' ? 'download' : 'preview')}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            {viewMode === 'preview' ? (
              <>
                <Download className="w-4 h-4 mr-2" />
                Download Instead
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </>
            )}
          </button>
          
          {/* Direct Download */}
          <a
            href={fileUrl}
            download
            className="flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {viewMode === 'preview' ? (
          <div className="relative">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600">Loading document...</p>
                </div>
              </div>
            )}
            
            {error ? (
              <div className="flex items-center justify-center p-8 bg-red-50 rounded-lg">
                <div className="text-center">
                  <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                  <h4 className="text-lg font-medium text-red-900 mb-2">Preview Unavailable</h4>
                  <p className="text-red-700 mb-4">{error}</p>
                  <a
                    href={fileUrl}
                    download
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download File
                  </a>
                </div>
              </div>
            ) : (
              <iframe
                src={viewableUrl}
                width="100%"
                height="600px"
                className="border border-gray-300 rounded"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                title={fileName || 'Document Preview'}
              />
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">Ready to Download</h4>
            <p className="text-gray-600 mb-6">Click the button below to download your {fileExt?.toUpperCase()} file.</p>
            <a
              href={fileUrl}
              download
              className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              <Download className="w-5 h-5 mr-2" />
              Download {fileName || 'Document'}
            </a>
          </div>
        )}
      </div>

      {/* Info Footer */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 rounded-b-lg">
        <p className="text-xs text-gray-500">
          {fileExt === 'pdf' 
            ? 'PDF files are displayed directly in your browser.' 
            : 'Document preview powered by Google Docs Viewer. If preview fails, please download the file.'
          }
        </p>
      </div>
    </div>
  );
};

// Example usage component
export default function DocumentView  ()  {
  // Example file data - replace with your actual data
  const sampleFiles = [
    {
      url: "https://res.cloudinary.com/shopitrw/raw/upload/v1/klab/sample.pdf",
      name: "Sample Document.pdf",
      type: "pdf"
    },
    {
      url: "https://res.cloudinary.com/shopitrw/raw/upload/v1/klab/sample.docx",
      name: "Sample Document.docx", 
      type: "docx"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Document Viewer</h1>
        
        <div className="space-y-8">
          {sampleFiles.map((file, index) => (
            <DocumentViewer
              key={index}
              fileUrl={file.url}
              fileName={file.name}
              fileType={file.type}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

