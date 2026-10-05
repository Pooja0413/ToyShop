import React, { useState } from 'react';
import { RotateCcw, Volume2, VolumeX, Sparkles, Check, PackageOpen } from 'lucide-react';
import { TOY_PRODUCTS } from '../data/toys';
import { ToyProduct } from '../types/toy';

interface Block {
  id: string;
  name: string;
  color: string;
  width: number;
  height: number;
  weight: number;
  shape: 'rectangle' | 'arch' | 'triangle' | 'cylinder';
}

const AVAILABLE_BLOCKS: Block[] = [
  { id: 'b1', name: 'Beech Keyston', color: '#D4A373', width: 140, height: 32, weight: 15, shape: 'rectangle' },
  { id: 'b2', name: 'Nordic Arch', color: '#CCD5AE', width: 120, height: 42, weight: 12, shape: 'arch' },
  { id: 'b3', name: 'Rosewood Beam', color: '#BC6C25', width: 100, height: 28, weight: 10, shape: 'rectangle' },
  { id: 'b4', name: 'Linden Prism', color: '#E9EDC9', width: 70, height: 40, weight: 8, shape: 'triangle' },
  { id: 'b5', name: 'Terracotta Pillar', color: '#C86D51', width: 44, height: 50, weight: 6, shape: 'cylinder' },
];

interface BlockStackerToyProps {
  onAddToCart: (product: ToyProduct) => void;
}

export const BlockStackerToy: React.FC<BlockStackerToyProps> = ({ onAddToCart }) => {
  const [stacked, setStacked] = useState<Block[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [balancedAlert, setBalancedAlert] = useState(false);

  // Synthesize soft organic wooden marimba click using Web Audio API
  const playWoodSound = (frequency = 320) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(frequency * 0.4, audioCtx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.14);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch {
      // AudioContext unavailable or restricted
    }
  };

  const handleAddBlock = (block: Block) => {
    if (stacked.length >= 7) return;
    const newStack = [...stacked, { ...block, id: `${block.id}-${Date.now()}` }];
    setStacked(newStack);
    playWoodSound(260 + stacked.length * 60);

    if (newStack.length >= 5) {
      setBalancedAlert(true);
    }
  };

  const handleReset = () => {
    setStacked([]);
    setBalancedAlert(false);
    playWoodSound(180);
  };

  const handleAddBalanceSetToCart = () => {
    const balanceSet = TOY_PRODUCTS.find(p => p.id === 'toy-balance-blocks');
    if (balanceSet) {
      onAddToCart(balanceSet);
    }
  };

  // Calculate tilt angle based on stacked weight asymmetry
  const tiltAngle = Math.sin(stacked.length * 1.3) * (stacked.length * 1.5);

  return (
    <section id="interactive-toybox" className="py-16 bg-[#FAF6F0] border-b border-[#EAE3D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8C6239] mb-2">
            <Sparkles size={15} />
            <span>Interactive Playroom Lab</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#2D2723] tracking-tight">
            The Balance & Stacking Experiment
          </h2>
          <p className="text-sm sm:text-base text-[#685B4E] mt-2">
            Experience the tactile physics of our solid lindenwood blocks. Click a wooden shape below to stack and balance your tower.
          </p>
        </div>

        {/* Playfield Container */}
        <div className="max-w-4xl mx-auto bg-[#FDFBF7] rounded-2xl border border-[#E2D6C6] shadow-sm p-6 sm:p-8">
          
          {/* Top Controls */}
          <div className="flex items-center justify-between pb-4 border-b border-[#EBE1D3] text-xs text-[#5E5144]">
            <div className="flex items-center gap-2 font-medium">
              <span>Tower Height:</span>
              <span className="font-mono font-bold text-[#2D2723] tabular-nums text-sm">
                {stacked.length} / 7 blocks
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DACFBF] hover:bg-[#F2ECE1] transition-colors"
                title="Toggle tactile sound clicks"
              >
                {soundEnabled ? <Volume2 size={14} className="text-[#6D5337]" /> : <VolumeX size={14} className="text-[#9E9081]" />}
                <span className="hidden sm:inline">{soundEnabled ? 'Wood Sound On' : 'Muted'}</span>
              </button>

              <button
                onClick={handleReset}
                disabled={stacked.length === 0}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DACFBF] hover:bg-[#F2ECE1] disabled:opacity-40 transition-colors"
              >
                <RotateCcw size={14} />
                <span>Reset Tower</span>
              </button>
            </div>
          </div>

          {/* Stacking Canvas Visual */}
          <div className="relative h-72 sm:h-80 w-full flex flex-col justify-end items-center py-6 overflow-hidden">
            {/* Soft background grid lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#F4EFE6_1px,transparent_1px),linear-gradient(to_bottom,#F4EFE6_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-60" />

            {/* Empty state hint */}
            {stacked.length === 0 && (
              <div className="text-center text-xs text-[#9C8F80] mb-12 animate-pulse">
                Click any wooden block below to start stacking
              </div>
            )}

            {/* Tower Stack with physics-like settling */}
            <div
              className="flex flex-col-reverse items-center transition-transform duration-300 ease-out z-10"
              style={{ transform: `rotate(${tiltAngle}deg)` }}
            >
              {stacked.map((item, index) => (
                <div
                  key={item.id}
                  className="rounded-sm shadow-xs border border-black/10 flex items-center justify-center transition-all animate-in slide-in-from-top-4 duration-200"
                  style={{
                    backgroundColor: item.color,
                    width: `${item.width}px`,
                    height: `${item.height}px`,
                    marginBottom: index === 0 ? '0px' : '-2px',
                    clipPath: item.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : undefined,
                    borderRadius: item.shape === 'cylinder' ? '12px' : '4px'
                  }}
                >
                  <span className="text-[10px] font-mono font-medium text-stone-800/80 select-none">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Solid Balancing Pedestal */}
            <div className="w-64 h-5 bg-[#543D2B] rounded-t-sm shadow-md border-t-2 border-[#8A6340] z-20 flex items-center justify-center">
              <span className="text-[9px] uppercase tracking-widest text-[#E6D5C3] font-mono">
                Solid Beech Pedestal
              </span>
            </div>
            <div className="w-40 h-2 bg-[#36271B] rounded-b-md z-10" />
          </div>

          {/* Balanced milestone banner */}
          {balancedAlert && (
            <div className="my-4 p-3 bg-[#EAF2E4] border border-[#C5DDB8] rounded-xl flex items-center justify-between text-xs text-[#2F5224] animate-in fade-in">
              <div className="flex items-center gap-2">
                <Check size={16} className="text-[#3E7030]" />
                <span className="font-semibold">Master Structural Balance achieved!</span>
                <span className="hidden sm:inline">5+ blocks balanced in equilibrium.</span>
              </div>
              <button
                onClick={handleAddBalanceSetToCart}
                className="font-bold underline hover:text-[#1F3917]"
              >
                Get this physical set ($54.00)
              </button>
            </div>
          )}

          {/* Block Selection Tray */}
          <div className="mt-4 pt-4 border-t border-[#EBE1D3]">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#635345] mb-3">
              Add Pieces to Tower:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {AVAILABLE_BLOCKS.map((block) => (
                <button
                  key={block.id}
                  onClick={() => handleAddBlock(block)}
                  disabled={stacked.length >= 7}
                  className="p-2.5 rounded-xl border border-[#DFD3C3] bg-white hover:bg-[#F9F6F0] hover:border-[#BFAF9C] text-left transition-all disabled:opacity-40 group flex flex-col justify-between h-20"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block shadow-2xs"
                      style={{ backgroundColor: block.color }}
                    />
                    <span className="text-[10px] font-mono text-[#8C7E70]">+{block.weight}g</span>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#2D2723] group-hover:text-[#7C512A] transition-colors leading-tight">
                      {block.name}
                    </div>
                    <div className="text-[10px] text-[#8C7E70] capitalize">{block.shape}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Call to Action for the Physical Toy */}
          <div className="mt-6 pt-4 border-t border-[#EBE1D3] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FAF4EA] -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-6 rounded-b-2xl">
            <div className="flex items-center gap-3">
              <PackageOpen size={24} className="text-[#875F36] shrink-0" />
              <div>
                <div className="text-xs font-bold text-[#2D2723]">
                  Nordic Balance & Arch Stacker (24-Piece Physical Set)
                </div>
                <div className="text-[11px] text-[#6D6052]">
                  Hand-beveled lindenwood arches with natural plant-based stains.
                </div>
              </div>
            </div>

            <button
              onClick={handleAddBalanceSetToCart}
              className="w-full sm:w-auto px-4 py-2.5 bg-[#2D2723] hover:bg-[#433932] text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
            >
              Add Physical Set to Bag · $54.00
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
