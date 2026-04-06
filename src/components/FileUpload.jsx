import React, { useState } from 'react';
import { apiPost } from '../utils/api';

const FileUpload = ({ onResult }) => {
    const [stockCode, setStockCode] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = async () => { /* same logic as before */ };

    return (
        <div>
            <div className="border-2 border-dashed border-blue-300 rounded-3xl p-8 text-center hover:border-blue-500 transition">
                <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} className="hidden" id="pdf-upload" />
                <label htmlFor="pdf-upload" className="cursor-pointer">
                    <div className="text-5xl mb-4">📄</div>
                    <p className="font-medium text-gray-700">Drop your HKEX PDF here</p>
                    <p className="text-sm text-gray-500 mt-1">or click to browse</p>
                </label>
            </div>

            <input
                type="text"
                placeholder="Stock Code (e.g. 0005)"
                value={stockCode}
                onChange={e => setStockCode(e.target.value)}
                className="w-full mt-6 px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
            />

            <button
                onClick={handleUpload}
                disabled={loading || !file || !stockCode}
                className="mt-8 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition disabled:opacity-50"
            >
                {loading ? 'AI is analyzing...' : 'Start AI Analysis'}
            </button>
        </div>
    );
};

export default FileUpload;