import React from 'react';

const ResultsDisplay = ({ result }) => {
    if (!result) return null;

    const cap = result.capitalization || {};
    const ref = result.refinancingViolations || {};

    return (
        <div className="bg-white rounded-3xl shadow-xl p-8">
            {/* Stock Code Header */}
            <div className="flex items-center justify-between mb-6 border-b pb-4">
                <div className="flex items-center gap-3">
                    <span className="text-3xl">📊</span>
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">Analysis Results</h2>
                        <p className="text-emerald-600 font-medium">
                            Stock Code: <span className="font-mono text-xl">{result.stockCode || 'N/A'}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* 1. Main Business */}
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">🏢</span>
                    <h3 className="font-semibold text-xl text-gray-800">1. Main Business Description</h3>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6 leading-relaxed text-gray-700">
                    {result.mainBusiness || 'No data available.'}
                </div>
            </div>

            {/* 2. Capitalization Analysis */}
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">📈</span>
                    <h3 className="font-semibold text-xl text-gray-800">2. Capitalization Analysis</h3>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-2xl p-6">
                        <p className="text-sm text-gray-500">Market Capitalization</p>
                        <p className="text-3xl font-bold text-emerald-600">
                            ${(Number(cap.market_cap) / 1000000000).toFixed(2)}B
                        </p>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-6">
                        <p className="text-sm text-gray-500">P/E Ratio</p>
                        <p className="text-3xl font-bold">{cap.pe_ratio || 'N/A'}</p>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-6">
                        <p className="text-sm text-gray-500">P/B Ratio</p>
                        <p className="text-3xl font-bold">{cap.pb_ratio || 'N/A'}</p>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-6">
                        <p className="text-sm text-gray-500">Equity Concentration</p>
                        <p className="text-3xl font-bold text-amber-600">{cap.equity_concentration || 'N/A'}</p>
                    </div>
                </div>

                {cap.llm_justification && (
                    <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5">
                        <p className="text-amber-700 font-medium">LLM Insight</p>
                        <p className="text-amber-800 mt-1 text-sm">{cap.llm_justification}</p>
                    </div>
                )}
            </div>

            {/* 3. Refinancing & Violation Screen */}
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">🔄</span>
                    <h3 className="font-semibold text-xl text-gray-800">3. Refinancing & Violation Screen</h3>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <p className="text-sm text-gray-500">Overall Screen Score</p>
                            <p className="text-5xl font-bold text-emerald-600">{ref.screen_score || '—'}</p>
                        </div>
                    </div>

                    {ref.equity_issues && ref.equity_issues.length > 0 && (
                        <div className="mb-6">
                            <p className="text-sm text-gray-500 mb-2">Equity Issues Detected</p>
                            <ul className="list-disc pl-5 space-y-1">
                                {ref.equity_issues.map((item, i) => (
                                    <li key={i} className="text-gray-700">{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {ref.violations && ref.violations.length > 0 && (
                        <div>
                            <p className="text-sm text-red-600 font-medium mb-2">Regulatory Violations</p>
                            <ul className="list-disc pl-5 space-y-1 text-red-700">
                                {ref.violations.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResultsDisplay;