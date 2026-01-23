import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Registering...', { name, email });
        alert('Account initialization successful. Welcome to the archive.');
    };

    return (
        <div className="pt-48 pb-24 flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md px-12 py-16 glass-card rounded-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-accent opacity-20"></div>

                <h1 className="text-4xl font-bold mb-2 uppercase tracking-tighter">New Recruit</h1>
                <p className="text-[10px] tracking-widest text-white/40 uppercase mb-12">Initialize Personal Account</p>

                <form className="space-y-8" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-[9px] uppercase tracking-[0.3em] text-white/50 mb-2">Display Name</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-transparent border-b border-white/20 pb-2 text-sm focus:outline-none focus:border-accent transition-colors"
                            placeholder="Operator Zero"
                        />
                    </div>
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
                        <button type="submit" className="btn-primary w-full shadow-[0_0_20px_rgba(255,255,255,0.1)]">Create Account</button>
                    </div>
                </form>

                <div className="mt-12 text-center text-[9px] uppercase tracking-widest text-white/30">
                    Already have an account? <Link to="/login" className="text-white hover:text-accent transition-colors ml-2">Authenticate Here</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
