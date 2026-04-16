import { useState, useEffect, useCallback } from 'react';

interface ZoomImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const ZoomImage = ({ src, alt, className }: ZoomImageProps) => {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close]);

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`cursor-zoom-in ${className ?? ''}`}
        onClick={() => setOpen(true)}
      />

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={close}
        >
          {/* 닫기 버튼 */}
          <button
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white text-xl transition-colors z-10"
            onClick={close}
          >
            ×
          </button>

          {/* 이미지 컨테이너 — overflow+touch-action으로 모바일 핀치줌 지원 */}
          <div
            className="overflow-auto w-full h-full flex items-center justify-center p-4"
            style={{ touchAction: 'pinch-zoom' }}
            onClick={e => e.stopPropagation()}
          >
            <img
              src={src}
              alt={alt}
              className="rounded-lg shadow-2xl"
              style={{
                maxWidth: 'min(100%, 1200px)',
                maxHeight: '90vh',
                touchAction: 'pinch-zoom',
                userSelect: 'none',
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};
