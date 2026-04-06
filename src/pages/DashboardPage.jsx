import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import FileUpload from '../components/FileUpload';
import ResultsDisplay from '../components/ResultsDisplay';

const DashboardPage = () => {
    const [result, setResult] = useState(null);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-4xl font-semibold text-gray-900">AI Financial Analysis</h1>
                        <p className="text-gray-600 mt-1">Upload HKEX annual report → Get instant Type 6 insights</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                    {/* Upload Card */}
                    <div className="xl:col-span-5 bg-white rounded-3xl shadow-xl p-8">
                        <FileUpload onResult={setResult} />
                    </div>

                    {/* Results Card */}
                    <div className="xl:col-span-7 bg-white rounded-3xl shadow-xl p-8">
                        {result ? (
                            <ResultsDisplay result={result} />
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center py-20">
                                <div className="text-6xl mb-6">📤</div>
                                <h3 className="text-xl font-medium text-gray-400">Ready to analyze</h3>
                                <p className="text-gray-500 mt-2 max-w-xs">Upload a PDF and let the AI extract Main Business, Capitalization & Refinancing insights</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;