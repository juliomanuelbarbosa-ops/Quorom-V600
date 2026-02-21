import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Loader2, Play, Info, Cpu, Layers } from 'lucide-react';

const TransformersJsHub: React.FC = () => {
  const [isBusy, setIsBusy] = useState(false);
  const [output, setOutput] = useState('');

  const runTask = () => {
    setIsBusy(true);
    setOutput(
      '> Loading model from CDN...\n> Allocating Float16 WebGL buffer...\n> Running sentiment analysis on: "The Quorum is the ultimate sovereign OS."'
    );
    setTimeout(() => {
      setOutput(
        (prev) => prev + '\n\nRESULT: POSITIVE (99.8%)\nLATENCY: 14ms\n\n> Model successfully cached in IndexedDB.'
      );
      setIsBusy(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
        <div>
          <h2 className="text-3xl font-black text-cyan-400 glow-text tracking-tight uppercase">TRANSFORMERS.JS</h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.2em] mt-1">Browser-Native ML Engine</p>
        </div>
        <div className="flex space-x-2">
          <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded text-[10px] text-cyan-400 font-black">
            XENOVA RUNTIME
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-8 rounded-2xl border border-cyan-500/20 space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold uppercase tracking-widest">Model Substrate</h3>
            <p className="text-xs text-cyan-800 font-bold uppercase">
              Run state-of-the-art models entirely on the client.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 bg-slate-900 border border-cyan-500/10 rounded flex justify-between items-center group hover:border-cyan-500 transition-all cursor-pointer">
              <div>
                <div className="text-[10px] text-cyan-500 font-black uppercase">Sentiment Analysis</div>
                <div className="text-[8px] text-cyan-900 font-bold uppercase">Xenova/distilbert-base-uncased</div>
              </div>
              <Play size={16} className="text-cyan-800 group-hover:text-cyan-400" />
            </div>
            <div className="p-4 bg-slate-900 border border-cyan-500/10 rounded flex justify-between items-center opacity-50">
              <div>
                <div className="text-[10px] text-cyan-500 font-black uppercase">Object Detection</div>
                <div className="text-[8px] text-cyan-900 font-bold uppercase">Xenova/detr-resnet-50</div>
              </div>
              <Layers size={16} className="text-cyan-800" />
            </div>
          </div>

          <button
            onClick={runTask}
            disabled={isBusy}
            className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 text-slate-950 py-4 rounded font-black text-xs tracking-[0.3em] transition-all flex items-center justify-center space-x-2"
          >
            {isBusy ? <Loader2 className="animate-spin" size={16} /> : <Zap size={16} />}
            <span>{isBusy ? 'EXECUTING...' : 'INITIATE MODEL'}</span>
          </button>
        </div>

        <div className="flex flex-col h-full space-y-6">
          <div className="glass-panel p-6 rounded-xl border border-cyan-500/10 bg-slate-950/50 flex-1">
            <div className="flex items-center space-x-2 mb-4">
              <Cpu size={14} className="text-cyan-600" />
              <span className="text-[10px] font-bold text-cyan-600 tracking-widest uppercase">
                Output Log: xenova-node-01
              </span>
            </div>
            <pre className="text-[10px] text-cyan-500 font-mono whitespace-pre-wrap leading-relaxed">
              {output || 'Awaiting task signal...'}
            </pre>
          </div>

          <div className="p-4 bg-cyan-500/5 border border-cyan-500/10 rounded flex items-start space-x-3">
            <Info size={16} className="text-cyan-800 flex-shrink-0 mt-0.5" />
            <p className="text-[9px] text-cyan-800 font-bold uppercase leading-tight">
              Models are downloaded once and stored in the browser&apos;s persistent cache. Future runs are instant and work
              100% offline.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransformersJsHub;
