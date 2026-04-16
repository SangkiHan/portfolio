import { useState } from 'react';
import erdImg from '../../assets/planin/Planin_erd.png';
import { Card } from '../../components/shared/Card';
import { ImprovementItem } from '../../components/shared/ImprovementItem';
import { ZoomImage } from '../../components/shared/ZoomImage';
import { meta, improvements } from './data';

const ErdDiagram = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(prev => !prev)}
        className="inline-flex items-center gap-2 px-4 py-2.5 border border-outline-variant/30 bg-surface-lowest hover:bg-surface-low font-space font-bold text-[0.65rem] uppercase tracking-[0.15em] text-on-variant rounded-lg transition-all"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18M10 3v18M14 3v18M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
        </svg>
        <span>테이블 설계 보기</span>
        <svg
          className={`w-3 h-3 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className={`overflow-hidden transition-all duration-500 ${open ? 'max-h-[2000px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
        <div className="rounded-2xl border border-outline-variant/10 overflow-hidden">
          <ZoomImage src={erdImg} alt="PLANIN ERD" className="w-full h-auto block" />
        </div>
      </div>
    </div>
  );
};

// 테이블 설계 항목(index 0)에 ERD 다이어그램을 주입
const improvementsWithDiagram = improvements.map((imp, i) =>
  i === 0 ? { ...imp, diagram: <ErdDiagram /> } : imp
);

export const Planin = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Card meta={meta}>
      {improvementsWithDiagram.map((imp, i) => (
        <ImprovementItem
          key={i}
          improvement={imp}
          index={i}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(prev => prev === i ? null : i)}
        />
      ))}
    </Card>
  );
};
