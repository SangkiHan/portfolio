import { useState, useEffect } from 'react';
import { PuppyNote } from './projects/puppynote';
import { SemsRenewal } from './projects/sems-renewal';
import { SemsMaintenance } from './projects/sems-maintenance';
import { Luckkids } from './projects/luckkids';
import { Planin } from './projects/planin';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-surface text-on-surface transition-colors duration-400 font-inter text-left">
      <nav className="fixed w-full top-0 z-50 bg-surface-lowest/80 backdrop-blur-xl border-b border-outline-variant/10 h-20 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <span className="font-space font-bold text-[0.65rem] uppercase tracking-[0.3em] bg-primary text-primary-on px-2 py-1 rounded-sm">
            Backend
          </span>
          <h1 className="text-lg font-manrope font-bold tracking-tightest uppercase">한상기</h1>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-10 h-10 flex items-center justify-center bg-surface-lowest hover:bg-surface-low rounded-xl border border-outline-variant/20 shadow-sm"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-32">
        <section id="projects" className="space-y-16">
          <PuppyNote />
          <SemsRenewal />
          <SemsMaintenance />
          <Luckkids />
          <Planin />
        </section>
      </main>

      <footer className="bg-on-surface text-surface py-20 px-6 text-center border-t border-white/5 font-space text-[0.65rem] font-bold uppercase tracking-[0.3em]">
        © {new Date().getFullYear()} SANGKI HAN. SYSTEM LOGIC APPLIED.
      </footer>
    </div>
  );
};

export default App;
