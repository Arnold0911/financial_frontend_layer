import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import FileUpload from '../components/FileUpload';
import ResultsDisplay from '../components/ResultsDisplay';
import { AuthContext } from '../context/AuthContext';

const DashboardPage = () => {
    const { user, token } = useContext(AuthContext);
    const [result, setResult] = useState(null);
    const [companies, setCompanies] = useState([]);
    const [loadingCompanies, setLoadingCompanies] = useState(true);
    const [selectedStockCode, setSelectedStockCode] = useState(null);

    // Fetch real companies from backend on load
    useEffect(() => {
        fetch('http://localhost:8080/companies', {
            headers: {
                'Authorization': `Bearer ${token || ''}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                setCompanies(data);
                setLoadingCompanies(false);
            })
            .catch(() => {
                console.log("No companies yet or backend not ready");
                setLoadingCompanies(false);
            });
    }, [token]);

    // Double-click row → load previous analysis result
    const loadPreviousAnalysis = async (stockCode) => {
        setSelectedStockCode(stockCode);
        setResult(null); // clear old result while loading

        try {
            const [businessRes, capRes, refRes] = await Promise.all([
                fetch(`http://localhost:8080/api/business/${stockCode}`),
                fetch(`http://localhost:8080/api/capitalization/${stockCode}`),
                fetch(`http://localhost:8080/api/refinancing/${stockCode}`)
            ]);

            const mainBusiness = await businessRes.text();
            let capitalization = {};
            let refinancingViolations = {};

            try {
                capitalization = JSON.parse(await capRes.text() || '{}');
            } catch (e) {
                console.log(e)
            }
            try {
                refinancingViolations = JSON.parse(await refRes.text() || '{}');
            } catch (e) {
                console.log(e)
            }

            setResult({
                stockCode,
                mainBusiness,
                capitalization,
                refinancingViolations
            });
        } catch (err) {
            console.error(err);
            alert("Could not load previous analysis for this company.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 py-8">
                <h1 className="text-4xl font-semibold text-gray-900">
                    Welcome back, {user?.username}
                </h1>
                <p className="text-emerald-600 mt-1">
                    Type 6 Refinancing AI Advisor • Live Database Connected
                </p>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mt-8">
                    {/* Upload Panel */}
                    <div className="xl:col-span-5">
                        <FileUpload onResult={setResult} />
                    </div>

                    {/* Results + History */}
                    <div className="xl:col-span-7 space-y-8">
                        {/* Current Analysis Results */}
                        {result && <ResultsDisplay result={result} />}

                        {/* Previously Analyzed Companies Table */}
                        <div className="bg-white rounded-3xl shadow-xl p-8">
                            <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                                📋 Previously Analyzed Companies (from PostgreSQL)
                            </h3>

                            {loadingCompanies ? (
                                <p className="text-gray-500 py-8 text-center">Loading companies...</p>
                            ) : companies.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                        <tr className="border-b text-left">
                                            <th className="pb-4 font-medium text-gray-600">Stock Code</th>
                                            <th className="pb-4 font-medium text-gray-600">Last Analysis</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {companies.map(c => (
                                            <tr
                                                key={c.id}
                                                onDoubleClick={() => loadPreviousAnalysis(c.stockCode)}
                                                className={`border-b last:border-none hover:bg-emerald-50 cursor-pointer transition-colors
                                                        ${selectedStockCode === c.stockCode ? 'bg-emerald-50' : ''}`}
                                            >
                                                <td className="py-5 font-medium text-gray-800">{c.stockCode}</td>
                                                <td className="py-5 text-gray-500">
                                                    {new Date(c.lastAnalysisTimestamp).toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-gray-500 py-8 text-center">
                                    No companies analyzed yet.<br />
                                    Upload a HKEX PDF above to start!
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;