import { useState } from 'react';


interface TileData {
  id?: string;
  icon?: string;
  title: string;
  desc: string;
  deep: string;
}

interface TileProps {
  d: TileData;
  red?: boolean;
}

export default function Tile({ d, red }: TileProps) {
  const [exp, setExp] = useState(false);

  return (
    <div 
      className={`tile ${red ? 'red' : ''} ${exp ? 'exp' : ''}`} 
      onClick={() => setExp(!exp)}
    >
      {d.id && <div className="tile-id">{d.id}</div>}
      {d.icon && (
        <div 
          style={{ marginBottom: '1rem', color: 'var(--gold)', opacity: 0.8 }} 
          dangerouslySetInnerHTML={{ __html: d.icon }}
        ></div>
      )}
      <div className="tile-t">{d.title}</div>
      <div className="tile-d">{d.desc}</div>
      <div className="tile-deep">{d.deep}</div>
      <div className="tile-r">
        {exp ? '▲ collapse' : '▼ tap to reveal deeper insight'}
      </div>
    </div>
  );
}
