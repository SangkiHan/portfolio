import type { ReactNode } from 'react';
import type { ProjectMeta } from '../../projects/types';

interface CardProps {
  meta: ProjectMeta;
  children: ReactNode;
  architectureSlot?: ReactNode;
}

export const Card = ({ meta, children, architectureSlot }: CardProps) => (
  <div className="bg-surface-low rounded-3xl p-4 sm:p-10 border border-outline-variant/10 shadow-sm overflow-hidden">
    <div className="mb-8">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
        <span className="font-space font-bold text-[0.6rem] text-primary uppercase tracking-[0.3em]">
          {meta.role} / {meta.period}
        </span>
        {meta.org ? (
          <span className="font-space text-[0.6rem] text-on-surface font-bold uppercase tracking-[0.2em]">
            회사: {meta.org}
          </span>
        ) : (meta.type === 'personal' || meta.type === 'study') ? (
          <span className="font-space text-[0.6rem] text-on-surface font-bold uppercase tracking-[0.2em]">
            개인프로젝트
          </span>
        ) : null}
      </div>
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <h4 className="text-2xl sm:text-4xl font-manrope font-extrabold tracking-tightest uppercase">
          {meta.title}
        </h4>
        {meta.links && meta.links.length > 0 && (
          <div className="flex items-center gap-2">
            {meta.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant/30 bg-surface-lowest hover:bg-surface-low hover:border-primary/30 transition-all group"
              >
                {link.icon === 'github' && (
                  <svg className="w-3.5 h-3.5 text-on-variant group-hover:text-primary transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                )}
                {link.icon === 'appstore' && (
                  <svg className="w-3.5 h-3.5 text-on-variant group-hover:text-primary transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                )}
                <span className="font-space font-bold text-[0.55rem] uppercase tracking-widest text-on-variant group-hover:text-primary transition-colors">
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
      {meta.description && (
        <p className="text-sm text-on-variant leading-relaxed mb-5">
          {meta.description}
        </p>
      )}
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
