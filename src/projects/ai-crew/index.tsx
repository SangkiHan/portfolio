import { useState } from 'react';
import { Card } from '../../components/shared/Card';
import { ImprovementItem } from '../../components/shared/ImprovementItem';
import { meta, improvements } from './data';

const DownArrow = ({ label }: { label?: string }) => (
  <div className="flex flex-col items-center py-1">
    {label && <span className="font-space text-[0.55rem] text-primary/50 mb-0.5 text-center px-2">{label}</span>}
    <div className="w-px h-4 bg-primary/30" />
    <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-primary/50" />
  </div>
);

const RightArrow = ({ label }: { label?: string }) => (
  <div className="flex flex-col items-center justify-center gap-1 px-2 shrink-0">
    {label && <span className="font-space text-[0.5rem] text-on-variant/50 whitespace-nowrap">{label}</span>}
    <div className="flex items-center">
      <div className="h-px w-4 bg-outline-variant/40" />
      <div className="w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[4px] border-l-outline-variant/50" />
    </div>
  </div>
);

const Box = ({ title, sub, tone = 'default' }: { title: string; sub?: string; tone?: 'default' | 'primary' }) => (
  <div className={`rounded-lg px-3 py-2.5 text-center min-w-[120px] ${tone === 'primary' ? 'border border-primary/30 bg-primary/5' : 'border border-outline-variant/20 bg-surface-lowest'}`}>
    <div className="font-space font-bold text-[0.6rem] text-on-surface leading-tight">{title}</div>
    {sub && <div className="font-space text-[0.45rem] text-on-variant/50 mt-1 leading-tight">{sub}</div>}
  </div>
);

const ArchitectureSection = () => {
  const [open, setOpen] = useState(false);

  const steps: { label: string; sub: string }[] = [
    { label: '사용자 → 팀장', sub: '웹 채팅으로 요청 전송' },
    { label: 'server → runner', sub: 'invoke_manager (WS: /ws/runner)' },
    { label: 'runner → 팀장 세션', sub: 'claude -p --resume {sessionId} (MCP 서버 연결, 프롬프트는 stdin/임시파일로 전달)' },
    { label: '팀장 세션 → runner → server', sub: 'MCP 툴 create_ticket 호출 → 티켓 queued 생성 → UI에 ticket_updated 브로드캐스트' },
    { label: 'server → runner → 직원 세션', sub: 'job_assign → claude -p --output-format stream-json (직원은 팀장과 별도 CLI 프로세스로 새로 스폰)' },
    { label: '직원 세션 → runner → server → UI', sub: 'stream-json 로그 실시간 전달 (job_log/heartbeat → log_line)' },
    { label: '직원 세션 종료(커밋 완료) → server', sub: 'job_status(done) → UI에 ticket_updated(done)' },
    { label: 'server → runner → 팀장 세션(재개) → UI', sub: 'invoke_manager로 팀장을 다시 깨워 완료 보고 요약 → manager_result로 채팅에 표시' },
  ];

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

      <div className={`overflow-hidden transition-all duration-500 ${open ? 'max-h-[3000px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
        <div className="space-y-3">

          {/* 시스템 구성도 */}
          <div className="rounded-xl border border-outline-variant/10 bg-surface-lowest overflow-hidden">
            <div className="px-4 py-2.5 bg-surface-low border-b border-outline-variant/10">
              <span className="font-space font-bold text-[0.6rem] uppercase tracking-widest text-on-variant/50">시스템 구성도 — Docker + 호스트 하이브리드 배포</span>
            </div>
            <div className="px-5 py-5">

              {/* Docker Compose 그룹 */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                <div className="font-space font-bold text-[0.5rem] uppercase tracking-widest text-primary/60 mb-3">🐳 Docker Compose</div>
                <div className="flex flex-col items-center gap-1">
                  <Box title="caddy" sub="TLS/게이트웨이 :80 · :443" tone="primary" />
                  <DownArrow />
                  <div className="flex flex-wrap justify-center gap-3">
                    <Box title="web" sub="React Flow 조직도 UI (nginx)" />
                    <Box title="server" sub="Fastify + WebSocket + Prisma :8080" tone="primary" />
                  </div>
                  <DownArrow label="server만 연결" />
                  <Box title="postgres + pgvector" sub="완료 티켓·승인 기획서를 로컬 임베딩해 저장 (팀 기억/RAG)" tone="primary" />
                </div>
              </div>

              {/* 연결 화살표 */}
              <DownArrow label="ws://localhost:8080/ws/runner — server ↔ runner 양방향 (job_assign/invoke_manager ↔ job_log/job_status)" />

              {/* 호스트 그룹 */}
              <div className="rounded-xl border border-outline-variant/20 bg-surface-low p-4">
                <div className="font-space font-bold text-[0.5rem] uppercase tracking-widest text-on-variant/50 mb-3">💻 호스트 (컨테이너 아님)</div>
                <div className="flex flex-wrap items-center justify-center gap-1">
                  <Box title="runner 데몬" sub="CLI 프로세스를 실제로 스폰" />
                  <RightArrow label="spawn" />
                  <Box title="claude / codex / antigravity CLI" sub="팀장·직원마다 독립된 프로세스(세션)" tone="primary" />
                  <RightArrow label="read/write" />
                  <Box title="실제 프로젝트 폴더" sub="WORKSPACE_ROOT (기존 툴체인 그대로 사용)" />
                </div>
              </div>

              <p className="mt-4 text-[0.7rem] text-on-variant/60 leading-relaxed">
                팀장과 직원은 서로 직접 통신하지 않는다 — 각각 별도의 CLI 세션(프로세스)으로 떠 있고, runner가 이 세션들을 스폰·중계하며 server가 티켓 상태로 둘 사이를 중개한다. WebSocket도 용도별로 분리되어 있다: <strong className="text-on-surface">/ws/ui</strong>는 브라우저에 상태를 실시간으로 밀어주는 채널(server→browser 단방향)이고, <strong className="text-on-surface">/ws/runner</strong>는 runner 프로세스 정확히 하나와 붙는 양방향 채널이다.
              </p>
            </div>
          </div>

          {/* 티켓 처리 흐름 */}
          <div className="rounded-xl border border-outline-variant/10 bg-surface-lowest overflow-hidden">
            <div className="px-4 py-2.5 bg-surface-low border-b border-outline-variant/10">
              <span className="font-space font-bold text-[0.6rem] uppercase tracking-widest text-on-variant/50">티켓 하나가 큐에서 완료까지 가는 경로</span>
            </div>
            <div className="px-5 py-4">
              <div className="relative">
                <div className="absolute left-[1.15rem] top-3 bottom-3 w-px bg-outline-variant/20" />
                <div className="space-y-0">
                  {steps.map(({ label, sub }, i) => (
                    <div key={i} className="flex gap-3 pl-1 pb-3 last:pb-0">
                      <div className="w-8 flex flex-col items-center shrink-0">
                        <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 z-10">
                          <span className="font-space font-bold text-[0.5rem] text-primary">{i + 1}</span>
                        </div>
                      </div>
                      <div className="pt-0.5 pb-1">
                        <div className="font-space font-bold text-[0.65rem] text-on-surface">{label}</div>
                        <div className="font-space text-[0.55rem] text-on-variant/50 mt-0.5">{sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export const AiCrew = () => {
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
