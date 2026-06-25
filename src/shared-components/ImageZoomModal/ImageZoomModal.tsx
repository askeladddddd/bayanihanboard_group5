import { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut } from 'lucide-react';

interface ImageZoomModalProps {
  imageUrl: string;
  onClose: () => void;
}

export function ImageZoomModal({ imageUrl, onClose }: ImageZoomModalProps) {
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(prev => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(prev => Math.max(prev - 0.5, 0.5));
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY < 0) {
      setScale(prev => Math.min(prev + 0.1, 4));
    } else {
      setScale(prev => Math.max(prev - 0.1, 0.5));
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scroll while modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top Controls */}
      <div className="absolute top-4 right-4 flex items-center gap-3 z-10" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20">
          <button onClick={handleZoomOut} className="p-2 text-white hover:bg-white/20 rounded-full transition-colors">
            <ZoomOut className="w-5 h-5" />
          </button>
          <span className="text-white font-medium text-sm min-w-[3rem] text-center">{Math.round(scale * 100)}%</span>
          <button onClick={handleZoomIn} className="p-2 text-white hover:bg-white/20 rounded-full transition-colors">
            <ZoomIn className="w-5 h-5" />
          </button>
        </div>
        <button 
          onClick={onClose}
          className="p-3 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 hover:text-red-400 rounded-full border border-white/20 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Image Container */}
      <div 
        className="relative w-full h-full flex items-center justify-center overflow-hidden cursor-move"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img 
          src={imageUrl} 
          alt="Zoomed full view" 
          draggable={false}
          className="max-w-full max-h-full object-contain transition-transform duration-100 ease-out"
          style={{ 
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          }}
        />
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 text-white/70 px-4 py-2 rounded-full text-xs font-medium backdrop-blur-md border border-white/10 pointer-events-none">
        Scroll to zoom • Drag to pan
      </div>
    </div>
  );
}
