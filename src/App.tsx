import { useState, useEffect } from 'react';
import { PuppyNote } from './projects/puppynote';
import { SemsRenewal } from './projects/sems-renewal';
import { SemsMaintenance } from './projects/sems-maintenance';
import { Luckkids } from './projects/luckkids';
import { Planin } from './projects/planin';


const skills = [
  { label: 'Backend', items: ['Java', 'Spring Framework', 'MyBatis', 'JPA', 'JUnit', 'Kafka'] },
  { label: 'Database', items: ['MySQL', 'PostgreSQL', 'MSSQL', 'AWS Aurora', 'Redis', 'MongoDB', 'ElasticSearch'] },
  { label: 'Cloud', items: ['AWS', 'Azure'] },
  { label: 'CI/CD', items: ['Jenkins', 'AWS CodePipeline', 'GitHub Actions'] },
  { label: 'Monitoring', items: ['Prometheus', 'Grafana'] },
  { label: 'Tool', items: ['Git', 'SVN', 'Swagger', 'RestDocs'] },
];

const careers = [
  { company: '티앤엠테크', period: '2025.05 ~ 현재', role: 'Backend Developer', desc: 'GS25·GSFRESH 점포관리 시스템(SEMS) 유지보수 및 리뉴얼 서버 API 신규개발' },
  { company: '큐텐테크놀로지', period: '2024.05 ~ 2024.12', role: 'Backend Developer', desc: '큐텐·티몬·위메프·인터파크 Analytics 웹, 사내 그룹웨어 유지보수' },
  { company: '모빌씨앤씨', period: '2021.08 ~ 2024.03', role: 'Backend Developer', desc: 'SK쉴더스 B2B·B2C 앱 서버 유지보수, (주)캡스텍 PLANIN 신규개발 및 유지보수' },
];

const educations = [
  { title: 'TDD, 클린 코드 with JavaScript 7기', org: 'NEXTSTEP', period: '2025.02 ~ 2025.03', github: 'https://github.com/SangkiHan/NEXTSTEP-TDD-JavaScript' },
  { title: '만들면서 배우는 JPA 4기',             org: 'NEXTSTEP', period: '2024.10 ~ 2024.11', github: 'https://github.com/SangkiHan/NEXTSTEP-JPA' },
  { title: 'TDD, 클린 코드 with Java 19기',      org: 'NEXTSTEP', period: '2024.09 ~ 2024.11', github: 'https://github.com/SangkiHan/NEXTSTEP-TDD-Java' },
];

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

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-32 space-y-24">

        {/* Hero */}
        <section>
          <p className="font-space font-bold text-[0.6rem] uppercase tracking-[0.3em] text-primary mb-4">Backend Developer · 4년차</p>
          <h2 className="text-4xl sm:text-5xl font-manrope font-extrabold tracking-tightest leading-tight mb-6">
            검증을 좋아하는 개발자 한상기입니다.
          </h2>
          <div className="space-y-3 mb-8 max-w-2xl text-sm sm:text-base text-on-surface/70 leading-relaxed">
            <p>
              티앤엠테크에서 GS25·GSFRESH 점포관리 시스템(SEMS)의 신규 개발과 성능 개선을 담당하고 있습니다.
            </p>
            <p>
              30억 건 MySQL→MongoDB 마이그레이션으로 조회 API를 40배(8s→200ms) 개선하고, 600만 건 날씨 예보 테이블에 파티셔닝을 적용해 쿼리를 11배(10s→900ms) 개선하는 등 실측 데이터 기반의 성능 최적화를 즐깁니다.
            </p>
            <p>
              JUnit·TDD로 테스트 코드 작성을 습관화하고 있으며, 업무 외적으로는 스터디 그룹과 함께 기획부터 운영까지 직접 참여한 럭키즈 앱(800명+)을 운영 중입니다.
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:tkdrl8908@naver.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-outline-variant/30 bg-surface-lowest hover:bg-surface-low font-space font-bold text-[0.6rem] uppercase tracking-widest text-on-variant transition-all"
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="hidden sm:inline">tkdrl8908@naver.com</span>
              <span className="sm:hidden">Email</span>
            </a>
            <a
              href="https://github.com/SangkiHan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-outline-variant/30 bg-surface-lowest hover:bg-surface-low font-space font-bold text-[0.6rem] uppercase tracking-widest text-on-variant transition-all"
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-outline-variant/30 bg-surface-lowest font-space font-bold text-[0.6rem] uppercase tracking-widest text-on-variant/60">
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              010-6409-1048
            </span>
          </div>
        </section>

        {/* Skills */}
        <section>
          <p className="font-space font-bold text-[0.6rem] uppercase tracking-[0.3em] text-primary mb-6">Tech Stack</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skills.map((group) => (
              <div key={group.label} className="rounded-2xl border border-outline-variant/10 bg-surface-low p-5">
                <p className="font-space font-bold text-[0.55rem] uppercase tracking-widest text-on-variant/50 mb-3">{group.label}</p>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span key={item} className="tech-tag">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Career */}
        <section>
          <p className="font-space font-bold text-[0.6rem] uppercase tracking-[0.3em] text-primary mb-6">Career</p>
          <div className="relative">
            <div className="absolute left-0 top-2 bottom-2 w-px bg-outline-variant/20" />
            {careers.map((c) => (
              <div key={c.company} className="pl-6 sm:pl-8 pb-8 relative">
                <div className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-primary" />
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
                  <span className="font-manrope font-extrabold text-base sm:text-lg">{c.company}</span>
                  <span className="font-space text-[0.55rem] uppercase tracking-widest text-primary/70">{c.role}</span>
                </div>
                <p className="font-space text-[0.55rem] uppercase tracking-widest text-on-variant/40 mb-2">{c.period}</p>
                <p className="text-on-surface/70 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects">
          <p className="font-space font-bold text-[0.6rem] uppercase tracking-[0.3em] text-primary mb-6">Projects</p>
          <div className="space-y-16">
            <SemsRenewal />
            <PuppyNote />
            <SemsMaintenance />
            <Luckkids />
            <Planin />
          </div>
        </section>

        {/* Education */}
        <section>
          <p className="font-space font-bold text-[0.6rem] uppercase tracking-[0.3em] text-primary mb-6">Education</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {educations.map((edu) => (
              <a
                key={edu.title}
                href={edu.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-outline-variant/10 bg-surface-low p-4 sm:p-5 flex flex-col gap-3 hover:border-primary/30 hover:bg-surface-lowest transition-all group"
              >
                <div className="flex-1">
                  <p className="font-space font-bold text-[0.55rem] uppercase tracking-widest text-primary/70 mb-1">{edu.org}</p>
                  <p className="font-manrope font-bold text-sm leading-snug">{edu.title}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-space text-[0.55rem] uppercase tracking-widest text-on-variant/40">{edu.period}</span>
                  <svg className="w-3.5 h-3.5 text-on-variant/30 group-hover:text-primary transition-colors shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </section>

      </main>

      <footer className="bg-on-surface text-surface py-20 px-6 text-center border-t border-white/5 font-space text-[0.65rem] font-bold uppercase tracking-[0.3em]">
        © {new Date().getFullYear()} SANGKI HAN. SYSTEM LOGIC APPLIED.
      </footer>
    </div>
  );
};

export default App;
