import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Authenticating...', { email });
        alert('Authentication sequence initiated. Access granted.');
    };

    return (
        <div className="pt-48 pb-24 flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md px-12 py-16 glass-card rounded-sm relative overflow-hidden">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-accent opacity-20"></div>

                <h1 className="text-4xl font-bold mb-2 uppercase tracking-tighter">Enter Identity</h1>
                <p className="text-[10px] tracking-widest text-white/40 uppercase mb-12">Authorized Personnel Only</p>

                <form className="space-y-8" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-[9px] uppercase tracking-[0.3em] text-white/50 mb-2">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-transparent border-b border-white/20 pb-2 text-sm focus:outline-none focus:border-accent transition-colors"
                            placeholder="operator@frn.tech"
                        />
                    </div>
                    <div>
                        <label className="block text-[9px] uppercase tracking-[0.3em] text-white/50 mb-2">Access Key</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-transparent border-b border-white/20 pb-2 text-sm focus:outline-none focus:border-accent transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="pt-4">
                        <button type="submit" className="btn-primary w-full shadow-[0_0_20px_rgba(255,255,255,0.1)]">Authenticate</button>
                    </div>
                </form>

                <div className="mt-12 flex justify-between text-[9px] uppercase tracking-widest text-white/30">
                    <Link to="/register" className="hover:text-white transition-colors">Register New Account</Link>
                    <a href="#" className="hover:text-white transition-colors">Forgot Password?</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
