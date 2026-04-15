interface VMNodeProps {
  label: string;
  isGroup?: boolean;
}

export const VMNode = ({ label, isGroup }: VMNodeProps) => (
  <div className={`w-24 h-16 bg-surface-lowest border border-primary/20 rounded-md shadow-sm flex flex-col overflow-hidden group hover:border-primary/50 transition-all ${isGroup ? 'scale-95' : ''}`}>
    <div className="bg-primary/5 px-2 py-0.5 flex justify-between items-center border-b border-primary/5">
      <span className="text-[6px] font-space font-bold text-primary/50 uppercase">Ubuntu 22.04</span>
      <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></div>
    </div>
    <div className="flex-1 flex items-center justify-center p-1 text-center font-bold text-[8px] text-on-surface uppercase tracking-tighter leading-tight">{label}</div>
  </div>
);

interface ServiceGroupProps {
  title: string;
  count: number;
  label: string;
  sub?: string;
  isExternal?: boolean;
}

export const ServiceGroup = ({ title, count, label, sub, isExternal }: ServiceGroupProps) => (
  <div className={`flex flex-col items-center gap-3 p-4 rounded-xl relative transition-all min-w-[120px] ${isExternal ? 'bg-primary/5 border border-dashed border-primary/20' : 'bg-surface-low/50 border border-primary/10'}`}>
    <div className="absolute -top-3 left-4 bg-surface px-2 text-[8px] font-space font-bold text-primary uppercase tracking-widest border border-primary/10 rounded-sm whitespace-nowrap">{title}</div>
    <div className={`grid ${count > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-2`}>
      {[...Array(count)].map((_, i) => <VMNode key={i} label={`${label}${count > 1 ? ` #${i+1}` : ''}`} isGroup={count > 1} />)}
    </div>
    {sub && <span className="text-[7px] font-bold text-primary/40 uppercase tracking-tighter text-center leading-tight whitespace-pre-line">{sub}</span>}
  </div>
);

// 병렬 분기를 위한 화살표 컴포넌트
export const ForkArrow = () => (
  <div className="flex flex-col justify-center items-center h-full relative px-4">
    <div className="w-4 h-px bg-primary/30"></div>
    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col h-24 justify-between items-start">
      <div className="w-6 h-px bg-primary/30 relative">
        <div className="absolute -top-12 left-0 w-[1px] h-12 bg-primary/30"></div>
        <div className="absolute right-0 -top-[3px] w-2 h-2 border-t-2 border-r-2 border-primary/30 rotate-45"></div>
      </div>
      <div className="w-6 h-px bg-primary/30 relative">
        <div className="absolute top-0 left-0 w-[1px] h-12 bg-primary/30"></div>
        <div className="absolute right-0 -top-[3px] w-2 h-2 border-t-2 border-r-2 border-primary/30 rotate-45"></div>
      </div>
    </div>
  </div>
);
