import React, { useEffect, useState } from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
    const [healthStatus, setHealthStatus] = useState('Checking system...');

    useEffect(() => {
        fetch('http://localhost:8080/HealthCheck', {
            method: 'GET',
            // Optional: timeout or credentials if needed later
        })
            .then((res) => {
                if (!res.ok) throw new Error('Backend not OK');
                return res.text();
            })
            .then(() => {
                setHealthStatus('✅ System normal');
            })
            .catch(() => {
                setHealthStatus('❌ System error');
            });
    }, []);   // ← runs only once on mount

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-emerald-800 flex items-center justify-center">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10">
                <div className="text-center mb-8">
                    <div className="mx-auto w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center text-3xl mb-4">
                        📊
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Type 6 AI Advisor</h1>
                    <p className="text-gray-500 mt-2">HKEX Refinancing Intelligence</p>

                    {/* Health check display */}
                    <p className={`mt-4 text-sm font-medium ${healthStatus.includes('normal') ? 'text-emerald-600' : 'text-red-600'}`}>
                        Connection: {healthStatus}
                    </p>
                </div>
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;