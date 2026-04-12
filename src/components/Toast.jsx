import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Check, X } from 'lucide-react';

const Toast = ({ message, onClose }) => {
    const toastRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(toastRef.current, 
                { x: 100, opacity: 0 }, 
                { x: 0, opacity: 1, duration: 0.8, ease: "power4.out" }
            );

            // Auto-close timer
            const timer = setTimeout(() => {
                handleClose();
            }, 3000);

            return () => clearTimeout(timer);
        }, toastRef);

        return () => ctx.revert();
    }, []);

    const handleClose = () => {
        gsap.to(toastRef.current, {
            x: 100,
            opacity: 0,
            duration: 0.5,
            ease: "power4.in",
            onComplete: onClose
        });
    };

    return (
        <div 
            ref={toastRef}
            className="glass-card px-6 py-4 rounded-sm border-accent/20 flex items-center space-x-4 pointer-events-auto mb-4 min-w-[300px]"
        >
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                <Check size={16} />
            </div>
            <div className="flex-grow">
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">System Update</p>
                <p className="text-xs font-bold uppercase tracking-tight">{message}</p>
            </div>
            <button 
                onClick={handleClose}
                className="text-white/20 hover:text-white transition-colors"
            >
                <X size={14} />
            </button>
        </div>
    );
};

export default Toast;
