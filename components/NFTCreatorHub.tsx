
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Copy, Zap, Info, ShieldCheck, Check } from 'lucide-react';

const NFTCreatorHub: React.FC = () => {
  const [collectionName, setCollectionName] = useState('');
  const [collectionSymbol, setCollectionSymbol] = useState('');
  const [baseUri, setBaseUri] = useState('ipfs://Qm...');
  const [isCopied, setIsCopied] = useState(false);

  const contractCode = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ${collectionName.replace(/\s+/g, '') || 'SovereignNFT'} is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    constructor()
        ERC721("${collectionName || 'Sovereign NFT'}", "${collectionSymbol || 'SNFT'}")
        Ownable(msg.sender)
    {}

    function _baseURI() internal pure override returns (string memory) {
        return "${baseUri}";
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // Overrides required by Solidity.
    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
        <div>
          <h2 className="text-3xl font-black text-cyan-400 glow-text tracking-tight uppercase">NFT FORGE</h2>
          <p className="text-cyan-800 text-xs uppercase tracking-[0.2em] mt-1">ERC-721 Collection Generator</p>
        </div>
        <div className="flex space-x-2">
           <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded text-[10px] text-cyan-400 uppercase tracking-widest font-bold">Mainnet Ready</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-xl border border-cyan-500/20 space-y-4">
            <h3 className="text-xs font-bold text-cyan-400 tracking-widest uppercase flex items-center space-x-2">
              <Layers size={14} /> <span>Collection Parameters</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-cyan-900 font-bold uppercase mb-1 block">Collection Name</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-900 border border-cyan-500/20 rounded p-3 text-cyan-400 focus:outline-none focus:border-cyan-500 text-sm"
                  placeholder="e.g. Neon Punks"
                  value={collectionName}
                  onChange={(e) => setCollectionName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-[10px] text-cyan-900 font-bold uppercase mb-1 block">Token Symbol</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-900 border border-cyan-500/20 rounded p-3 text-cyan-400 focus:outline-none focus:border-cyan-500 text-sm"
                  placeholder="e.g. NPX"
                  value={collectionSymbol}
                  onChange={(e) => setCollectionSymbol(e.target.value)}
                />
              </div>
              <div>
                <label className="text-[10px] text-cyan-900 font-bold uppercase mb-1 block">Base Metadata URI (IPFS)</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-900 border border-cyan-500/20 rounded p-3 text-cyan-400 focus:outline-none focus:border-cyan-500 text-sm"
                  placeholder="ipfs://Qm..."
                  value={baseUri}
                  onChange={(e) => setBaseUri(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-cyan-500/10 bg-cyan-500/5">
            <h3 className="text-xs font-bold text-cyan-400 tracking-widest uppercase mb-4 flex items-center space-x-2">
              <Info size={14} /> <span>FORGE GUIDANCE</span>
            </h3>
            <ul className="text-[10px] text-cyan-800 space-y-2 font-bold uppercase tracking-wide list-disc list-inside">
              <li>IPFS is recommended for immutable metadata storage.</li>
              <li>Gas costs will vary based on current network congestion.</li>
              <li>The generated code follows OpenZeppelin security standards.</li>
              <li>Minting function is restricted to the collection owner.</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col h-full">
          <div className="glass-panel rounded-xl border border-cyan-500/20 flex flex-col flex-1 overflow-hidden relative group">
            <div className="p-3 border-b border-cyan-500/10 bg-slate-900/50 flex justify-between items-center">
              <span className="text-[10px] font-bold text-cyan-600 tracking-widest uppercase">Smart Contract Substrate</span>
              <button 
                onClick={copyToClipboard}
                className="p-2 hover:bg-slate-800 rounded border border-cyan-500/20 text-cyan-400 transition-all flex items-center space-x-2"
              >
                {isCopied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                <span className="text-[8px] font-black uppercase tracking-widest">{isCopied ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>
            
            <pre className="flex-1 p-6 text-[10px] bg-slate-950/80 font-mono text-cyan-700 overflow-auto leading-relaxed custom-scrollbar">
              {contractCode}
            </pre>

            <div className="p-4 border-t border-cyan-500/10 flex space-x-2">
               <button className="flex-1 bg-cyan-500 text-slate-950 py-3 rounded text-[10px] font-black tracking-[0.2em] hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/10 flex items-center justify-center space-x-2">
                  <Zap size={14} /> <span>TRANSMIT TO REMIX</span>
               </button>
               <button className="flex-1 bg-slate-800 text-cyan-400 py-3 rounded text-[10px] font-black tracking-[0.2em] hover:bg-slate-700 transition-colors border border-cyan-500/10 flex items-center justify-center space-x-2">
                  <ShieldCheck size={14} /> <span>AUDIT CODE</span>
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCreatorHub;
