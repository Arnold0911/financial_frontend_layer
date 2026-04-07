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

    // Fetch real companies from backend on load
    useEffect(() => {
        fetch('http://localhost:8080/api/companies', {
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

                    {/* Results + DB Data */}
                    <div className="xl:col-span-7 space-y-8">
                        {result && <ResultsDisplay result={result} />}

                        {/* Real DB Data - Professional Table */}
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
                                            <tr key={c.id} className="border-b last:border-none hover:bg-gray-50">
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