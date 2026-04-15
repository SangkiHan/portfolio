import { useState } from 'react';
import archWhite from '../../assets/renewal-sems/리뉴얼 SEMS 아키텍처_white.png';
import archDark from '../../assets/renewal-sems/리뉴얼 SEMS 아키텍처_dark.png';
import { Card } from '../../components/shared/Card';
import { ImprovementItem } from '../../components/shared/ImprovementItem';
import { meta, improvements } from './data';

const ArchitectureSection = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(prev => !prev)}
        className="inline-flex items-center gap-2 px-4 py-2.5 border border-outline-variant/30 bg-surface-lowest hover:bg-surface-low font-space font-bold text-[0.65rem] uppercase tracking-[0.15em] text-on-variant rounded-lg transition-all"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18" />
        </svg>
        <span>아키텍처</span>
        <svg
          className={`w-3 h-3 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className={`overflow-hidden transition-all duration-500 ${open ? 'max-h-[2000px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
        <div className="rounded-2xl border border-outline-variant/10 overflow-hidden">
          <img src={archWhite} alt="리뉴얼 SEMS 아키텍처" className="w-full h-auto block dark:hidden" />
          <img src={archDark} alt="리뉴얼 SEMS 아키텍처" className="w-full h-auto hidden dark:block" />
        </div>
      </div>
    </div>
  );
};

export const SemsRenewal = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Card meta={meta} architectureSlot={<ArchitectureSection />}>
      {improvements.map((imp, i) => (
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
