import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck } from 'lucide-react';

const AdminLogin: React.FC = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simplemente una contraseña hardcoded para este demo local
        if (password === 'Yesica2026') {
            localStorage.setItem('isAdmin', 'true');
            navigate('/admin/dashboard');
        } else {
            setError('Contraseña incorrecta');
        }
    };

    return (
        <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl p-12 border border-gray-100">
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-[#56b4bd]/10 rounded-3xl flex items-center justify-center mx-auto mb-6 text-[#56b4bd]">
                        <ShieldCheck size={40} />
                    </div>
                    <h1 className="text-3xl font-serif text-[#1a1a1a] mb-2 font-bold uppercase tracking-tight">Acceso Admin</h1>
                    <p className="text-gray-400 text-xs font-black uppercase tracking-widest">Divine Aesthetics CMS</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                            <Lock size={18} />
                        </div>
                        <input
                            type="password"
                            placeholder="Contraseña del Panel"
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#56b4bd]/20 transition-all font-medium"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center">{error}</p>}

                    <button className="w-full py-5 bg-[#1a1a1a] text-white rounded-2xl font-black text-[10px] tracking-[0.4em] uppercase shadow-2xl hover:bg-black transition-all transform active:scale-95">
                        INGRESAR AL SISTEMA
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
