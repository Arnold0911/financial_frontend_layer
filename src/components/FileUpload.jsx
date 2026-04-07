import React, { useState } from 'react';

const FileUpload = ({ onResult }) => {
    const [stockCode, setStockCode] = useState('');
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.type === 'application/pdf') {
            setFile(droppedFile);
        } else {
            alert('Please drop a valid PDF file');
        }
    };

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
        } else {
            alert('Please select a valid PDF file');
        }
    };

    const handleUpload = async () => {
        if (!file || !stockCode) {
            alert('Please enter stock code and select a PDF file');
            return;
        }

        setLoading(true);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfBytes = new Uint8Array(arrayBuffer);

            const response = await fetch(`http://localhost:8080/api/analyze/${stockCode}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/octet-stream',
                },
                body: pdfBytes,
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const result = await response.json();
            onResult(result);
        } catch (err) {
            console.error(err);
            alert('Upload failed: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl p-8">
            <input
                type="text"
                placeholder="Stock Code (e.g. 0005)"
                value={stockCode}
                onChange={(e) => setStockCode(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-emerald-500 mb-6"
            />

            {/* Drag & Drop Area */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all cursor-pointer
                    ${isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:border-gray-400'}`}
            >
                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="pdf-upload"
                />
                <label htmlFor="pdf-upload" className="cursor-pointer">
                    <div className="text-6xl mb-4">📄</div>
                    <p className="font-medium text-lg text-gray-700">
                        {file ? file.name : "Drop your HKEX PDF here"}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        or <span className="text-emerald-600 underline">click to browse</span>
                    </p>
                </label>
            </div>

            <button
                onClick={handleUpload}
                disabled={loading || !file || !stockCode}
                className="mt-8 w-full bg-emerald-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl disabled:bg-gray-400 transition"
            >
                {loading ? 'Analyzing PDF...' : 'Start AI Analysis'}
            </button>
        </div>
    );
};

export default FileUpload;