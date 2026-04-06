import React from 'react';

const ResultsDisplay = ({ result }) => (
    <div>
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Analysis Results</h2>

        <div className="space-y-8">
            {/* Main Business */}
            <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">🏢</span>
                    <h3 className="font-semibold text-lg">1. Main Business Description</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">{result?.mainBusiness || '—'}</p>
            </div>

            {/* Capitalization */}
            <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">📈</span>
                    <h3 className="font-semibold text-lg">2. Capitalization Analysis</h3>
                </div>
                <pre className="bg-white p-5 rounded-xl text-sm overflow-auto">{JSON.stringify(result?.capitalization, null, 2)}</pre>
            </div>

            {/* Refinancing */}
            <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">🔄</span>
                    <h3 className="font-semibold text-lg">3. Refinancing & Violation Screen</h3>
                </div>
                <pre className="bg-white p-5 rounded-xl text-sm overflow-auto">{JSON.stringify(result?.refinancingViolations, null, 2)}</pre>
            </div>
        </div>
    </div>
);

export default ResultsDisplay;