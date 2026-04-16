import type { Improvement } from '../../projects/types';

interface ImprovementItemProps {
  improvement: Improvement;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

export const ImprovementItem = ({ improvement, index, isOpen, onToggle }: ImprovementItemProps) => (
  <div>
    <button
      onClick={onToggle}
      className="w-full flex items-start gap-3 px-4 sm:px-6 py-4 cursor-pointer hover:bg-surface-lowest/50 rounded-xl transition-colors text-left"
    >
      <span className="font-space font-bold text-[0.6rem] text-primary/40 w-5 shrink-0 tabular-nums mt-0.5">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="flex-1 min-w-0">
        <span className="font-manrope font-semibold text-sm sm:text-base text-on-surface leading-snug">
          {improvement.title}
        </span>
        {improvement.metric && (
          <span className="mt-1.5 flex sm:hidden w-fit bg-primary/10 text-primary font-space font-bold text-[0.55rem] px-2 py-0.5 rounded-full uppercase tracking-wider">
            {improvement.metric}
          </span>
        )}
      </div>
      {improvement.metric && (
        <span className="hidden sm:block bg-primary/10 text-primary font-space font-bold text-[0.6rem] px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0">
          {improvement.metric}
        </span>
      )}
      <svg
        className={`w-4 h-4 text-primary/40 shrink-0 transition-transform duration-300 mt-0.5 ${isOpen ? 'rotate-180' : ''}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-[1500px] opacity-100' : 'max-h-0 opacity-0'}`}>
      <div className="px-6 pb-6 pt-2 space-y-2">
        {improvement.details.map((detail, i) => (
          <div key={i} className="flex gap-3 text-sm text-on-variant leading-relaxed">
            <span className="text-primary/40 font-bold mt-0.5 shrink-0">·</span>
            <span>{detail}</span>
          </div>
        ))}
        {improvement.diagram && (
          <div className="mt-4">{improvement.diagram}</div>
        )}
        {improvement.blogUrl && (
          <div className="mt-4 pt-4 border-t border-outline-variant/10">
            <a
              href={improvement.blogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-on font-space font-bold text-[0.65rem] uppercase tracking-[0.15em] rounded-lg hover:bg-primary-dim active:scale-95 transition-all shadow-sm"
            >
              <span>블로그에서 자세히 보기</span>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  </div>
);
