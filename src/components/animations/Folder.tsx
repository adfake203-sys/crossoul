import React, { useState } from 'react';
import { HapticManager } from '../../lib/HapticManager';
import './Folder.css';

const darkenColor = (hex: string, percent: number) => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split('')
      .map(c => c + c)
      .join('');
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

interface FolderProps {
  color?: string;
  size?: number;
  items?: React.ReactNode[];
  className?: string;
  title?: string;
  onCardClick?: (index: number) => void;
}

const Folder: React.FC<FolderProps> = ({ color = '#5227FF', size = 1, items = [], className = '', title, onCardClick }) => {
  const maxItems = 2;
  const papers = items.slice(0, maxItems);
  while (papers.length < maxItems) {
    papers.push(null);
  }

  const [open, setOpen] = useState(false);
  const [paperOffsets, setPaperOffsets] = useState(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));

  const folderBackColor = darkenColor(color, 0.08);
  const paper1 = darkenColor('#ffffff', 0.1);
  const paper2 = darkenColor('#ffffff', 0.05);

  const handleFolderClick = () => {
    HapticManager.selection();
    setOpen(prev => !prev);
    if (open) {
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
    }
  };

  const handlePaperClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    HapticManager.selection();
    if (!open) {
        setOpen(true);
        return;
    }
    // Forward the click to the parent for the popup
    if (onCardClick) {
      onCardClick(index);
    }
  };

  const handlePaperMouseMove = (e: React.MouseEvent, index: number) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.12;
    const offsetY = (e.clientY - centerY) * 0.12;
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: offsetX, y: offsetY };
      return newOffsets;
    });
  };

  const handlePaperMouseLeave = (index: number) => {
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: 0, y: 0 };
      return newOffsets;
    });
  };

  const folderStyle = {
    '--folder-color': color,
    '--folder-back-color': folderBackColor,
    '--paper-1': paper1,
    '--paper-2': paper2
  } as React.CSSProperties;

  const folderClassName = `folder ${open ? 'open' : ''}`.trim();
  const scaleStyle = { transform: `scale(${size})` };

  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  return (
    <div style={scaleStyle} className={className}>
      <div className={folderClassName} style={folderStyle} onClick={handleFolderClick}>
        <div className="folder__back">
          {/* Papers */}
          {papers.map((item, i) => {
            const magnetX = paperOffsets[i]?.x || 0;
            const magnetY = paperOffsets[i]?.y || 0;
            
            let fanTranslateX = '0%';
            let fanTranslateY = '0%';
            let fanRotate = '0deg';

            if (open) {
              if (i === 0) {
                fanTranslateX = isMobile ? '-95%' : '-105%';
                fanTranslateY = '-75%';
                fanRotate = '-12deg';
              } else if (i === 1) {
                fanTranslateX = isMobile ? '0%' : '5%';
                fanTranslateY = '-75%';
                fanRotate = '12deg';
              }
            } else {
              fanTranslateX = '-50%';
              fanTranslateY = '2%';
              fanRotate = '0deg';
            }

            return (
              <div
                key={i}
                className={`paper paper-${i + 1}`}
                onMouseMove={e => handlePaperMouseMove(e, i)}
                onMouseLeave={() => handlePaperMouseLeave(i)}
                onClick={(e) => handlePaperClick(e, i)}
                style={{
                  '--magnet-x': `${magnetX}px`,
                  '--magnet-y': `${magnetY}px`,
                  transform: `translate(${fanTranslateX}, ${fanTranslateY}) rotate(${fanRotate}) translate(var(--magnet-x), var(--magnet-y))`,
                  zIndex: 5 + i,
                  transitionDelay: open ? `${i * 0.05}s` : '0s'
                } as React.CSSProperties}
              >
                <div className="card-inner">
                   {item}
                </div>
              </div>
            );
          })}
          
          <div className="folder__front-container">
            <div className="folder__front">
               {title && <div className="folder-title">{title}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Folder;
