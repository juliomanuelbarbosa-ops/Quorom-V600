
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, ShieldCheck, ArrowRight, Loader2, CheckCircle, ExternalLink, Info } from 'lucide-react';

const StripePaymentHub: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [amount, setAmount] = useState(25);

  const initiatePayment = () => {
    setStatus('processing');
    // Simulate payment flow
    setTimeout(() => {
      setStatus('success');
    }, 2500);
  };

  const reset = () => {
    setStatus('idle');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
        <div>
          <h2 className="text-3xl font-black text-cyan-400 glow-text tracking-tight uppercase">STRIPE GATEWAY</h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.2em] mt-1">FIAT Neural Bridge Protocol</p>
        </div>
        <div className="flex space-x-2">
           <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded text-[10px] text-cyan-400 uppercase tracking-widest font-bold">PCI Compliant</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="glass-panel p-8 rounded-2xl border border-cyan-500/20 flex flex-col justify-center space-y-8 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/5 blur-3xl rounded-full" />
            
            <AnimatePresence mode="wait">
              {status === 'idle' && (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold uppercase tracking-widest">Sovereign Donation</h3>
                    <p className="text-xs text-cyan-800 font-bold uppercase">Support the mesh infrastructure development.</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[10, 25, 100].map((val) => (
                      <button 
                        key={val}
                        onClick={() => setAmount(val)}
                        className={`py-3 rounded text-xs font-black transition-all border ${
                          amount === val ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-900 text-cyan-800 border-cyan-900/30 hover:border-cyan-500'
                        }`}
                      >
                        ${val}
                      </button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-900 rounded border border-cyan-500/10 flex justify-between items-center">
                    <span className="text-xs text-cyan-800 font-bold uppercase">Total Transaction</span>
                    <span className="text-xl font-black text-cyan-400">${amount}.00</span>
                  </div>

                  <button 
                    onClick={initiatePayment}
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 py-4 rounded font-black text-xs tracking-[0.3em] transition-all flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20"
                  >
                    <span>INITIATE CHECKOUT</span>
                    <ArrowRight size={16} />
                  </button>
                </motion.div>
              )}

              {status === 'processing' && (
                <motion.div 
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12 space-y-6"
                >
                  <div className="relative">
                    <Loader2 size={64} className="text-cyan-500 animate-spin" />
                    <CreditCard size={24} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-cyan-400 font-black tracking-[0.5em] uppercase">Encrypting Payload...</p>
                    <p className="text-[8px] text-cyan-800 font-bold uppercase mt-2">Connecting to Stripe Node...</p>
                  </div>
                </motion.div>
              )}

              {status === 'success' && (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center py-6 space-y-6 text-center"
                >
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/40">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold uppercase tracking-widest text-green-500">SYNCHRONIZED</h3>
                    <p className="text-[10px] text-cyan-800 font-bold uppercase">Transaction validated on Fiat subnet.</p>
                  </div>
                  <div className="p-4 bg-slate-900 border border-green-500/20 rounded w-full">
                    <div className="flex justify-between text-[10px] font-bold text-cyan-700 uppercase">
                      <span>Receipt ID</span>
                      <span>#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                    </div>
                  </div>
                  <button 
                    onClick={reset}
                    className="text-[10px] font-bold text-cyan-400 hover:text-cyan-200 uppercase tracking-widest transition-colors flex items-center space-x-2"
                  >
                    <span>RETURN TO HUB</span>
                    <ArrowRight size={12} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-xl border border-cyan-500/10 bg-slate-900/40 space-y-4">
            <h3 className="text-xs font-bold text-cyan-400 tracking-widest uppercase flex items-center space-x-2">
              <ShieldCheck size={14} /> <span>SEC OPS</span>
            </h3>
            <p className="text-[10px] text-cyan-800 font-bold uppercase leading-relaxed">
              Every transaction is routed through a series of offshore proxies before hitting the Stripe API endpoint. Your local privacy is maintained via AES-256 encrypted socket layers.
            </p>
            <div className="pt-4 flex items-center justify-center space-x-4 opacity-30 grayscale hover:grayscale-0 transition-all duration-500 cursor-help">
              <div className="text-[10px] font-black border-2 border-slate-700 px-2 py-1 rounded">VISA</div>
              <div className="text-[10px] font-black border-2 border-slate-700 px-2 py-1 rounded">STRIPE</div>
              <div className="text-[10px] font-black border-2 border-slate-700 px-2 py-1 rounded">MASTER</div>
            </div>
          </div>

          <div className="p-4 bg-cyan-500/5 border border-cyan-500/10 rounded flex items-start space-x-3">
             <Info size={16} className="text-cyan-800 flex-shrink-0 mt-0.5" />
             <div className="space-y-1">
               <p className="text-[9px] text-cyan-800 font-bold uppercase leading-tight">
                 Fiat bridge is strictly for operational funding. Use the Sovereign Wallet for decentralized asset transfers.
               </p>
               <button className="text-[8px] text-cyan-600 font-black uppercase tracking-tighter hover:text-cyan-400 transition-colors flex items-center space-x-1">
                 <span>TERMS OF ENGAGEMENT</span> <ExternalLink size={10} />
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripePaymentHub;
