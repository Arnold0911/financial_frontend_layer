import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold text-blue-600">Type 6 AI Advisor</h1>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-sm">Welcome, {user?.username}</span>
                <button
                    onClick={() => { logout(); navigate('/login'); }}
                    className="px-4 py-2 text-sm border rounded hover:bg-gray-100"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;