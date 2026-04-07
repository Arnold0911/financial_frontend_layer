import React, { useContext } from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleLoginSuccess = async (username, password) => {
        const success = await login(username, password);
        if (success) {
            navigate('/dashboard', { replace: true });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-emerald-800 flex items-center justify-center">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10">
                <div className="text-center mb-8">
                    <div className="mx-auto w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center text-3xl mb-4">
                        📊
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Type 6 AI Advisor</h1>
                    <p className="text-gray-500 mt-2">HKEX Refinancing Intelligence</p>
                </div>
                <LoginForm onLoginSuccess={handleLoginSuccess} />
            </div>
        </div>
    );
};

export default LoginPage;