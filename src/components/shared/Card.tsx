import type { ReactNode } from 'react';
import type { ProjectMeta } from '../../projects/types';

interface CardProps {
  meta: ProjectMeta;
  children: ReactNode;
  architectureSlot?: ReactNode;
}

export const Card = ({ meta, children, architectureSlot }: CardProps) => (
  <div className="bg-surface-low rounded-3xl p-10 border border-outline-variant/10 shadow-sm overflow-hidden">
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-3">
        <span className="font-space font-bold text-[0.6rem] text-primary uppercase tracking-[0.3em]">
          {meta.role} / {meta.period}
        </span>
        {meta.org && (
          <span className="font-space text-[0.6rem] text-on-variant/50 uppercase tracking-[0.2em]">
            @ {meta.org}
          </span>
        )}
      </div>
      <h4 className="text-4xl font-manrope font-extrabold mb-5 tracking-tightest uppercase">
        {meta.title}
      </h4>
      <div className="flex flex-wrap gap-2">
        {meta.tech.map((t) => (
          <span key={t} className="tech-tag">{t}</span>
        ))}
      </div>
    </div>
    {architectureSlot && (
      <div className="mb-8">{architectureSlot}</div>
    )}
    <div className="border-t border-outline-variant/10 divide-y divide-outline-variant/10">
      {children}
    </div>
  </div>
);
