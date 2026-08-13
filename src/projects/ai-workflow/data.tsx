import type { ProjectMeta, Improvement } from '../types';

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

const AiCrewArchitecture = () => {
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
    <div className="mt-4 space-y-3">

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

          {/* 호스트 그룹 */}
          <div className="mt-4 rounded-xl border border-outline-variant/20 bg-surface-low p-4">
            <div className="font-space font-bold text-[0.5rem] uppercase tracking-widest text-on-variant/50 mb-3">💻 호스트 (컨테이너 아님)</div>
            <div className="flex flex-wrap items-end justify-center gap-1">
              <div className="flex flex-col items-center">
                <span className="font-space text-[0.5rem] text-primary/60 text-center px-1 mb-0.5">server가 호출<br />ws://localhost:8080/ws/runner<br />(양방향)</span>
                <DownArrow />
                <Box title="runner 데몬" sub="server와 WS로 항상 연결, CLI 프로세스를 실제로 스폰" tone="primary" />
              </div>
              <RightArrow label="spawn" />
              <Box title="Claude Code CLI" sub="팀장·직원마다 독립된 프로세스(세션)" />
              <RightArrow label="read/write" />
              <Box title="실제 프로젝트 폴더" sub="WORKSPACE_ROOT (기존 툴체인 그대로 사용)" />
            </div>
            <p className="mt-3 text-[0.55rem] text-on-variant/50 leading-relaxed">
              runner → server 응답: job_log / job_status / job_heartbeat (같은 WS 연결로 회신)
            </p>
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
  );
};

const LogAgentArchitecture = () => {
  const steps: { label: string; sub: string }[] = [
    { label: '서버 에러 발생', sub: 'Spring Boot 등 운영 서버' },
    { label: 'Webhook 수신', sub: 'FastAPI POST /api/v1/webhook/error' },
    { label: 'Git fetch', sub: '최신 소스코드 로컬 동기화' },
    { label: 'Error Memory 검색', sub: 'ChromaDB에서 과거 유사 에러 사례 조회 → 프롬프트에 주입' },
    { label: 'ReAct Agent 분석', sub: 'LangGraph + Gemini — grep_files/read_file/list_directory로 스택 트레이스의 클래스명을 추적해 실제 소스 탐색' },
    { label: 'LLM Judge 검증', sub: 'Gemini Flash가 분석 에이전트(Flash Lite)의 수정안을 독립적으로 재검증, self-evaluation bias 감소' },
    { label: 'Slack 알림', sub: '원인·Before/After 코드·Judge 점수 발송, [수락] [거절] 버튼 제공' },
    { label: '수락 클릭 → GitHub PR 생성', sub: 'Gemini가 파일 수정 적용 → 새 브랜치 커밋 → PR 자동 생성, 사람 개입은 클릭 한 번' },
  ];

  return (
    <div className="mt-4 space-y-3">

      {/* 시스템 구성도 */}
      <div className="rounded-xl border border-outline-variant/10 bg-surface-lowest overflow-hidden">
        <div className="px-4 py-2.5 bg-surface-low border-b border-outline-variant/10">
          <span className="font-space font-bold text-[0.6rem] uppercase tracking-widest text-on-variant/50">시스템 구성도</span>
        </div>
        <div className="px-5 py-5">
          <div className="flex flex-col items-center gap-1">
            <Box title="운영 서버" sub="Spring Boot 등 — 에러 발생 시 Webhook 전송" />
            <DownArrow label="POST /api/v1/webhook/error" />
            <Box title="FastAPI Backend" sub="Error Memory(ChromaDB) · LangChain File Tools · ReAct Agent(LangGraph)" tone="primary" />
            <DownArrow label="API 호출" />
            <Box title="Gemini API" sub="Flash Lite(분석·파일 수정) · Flash(Judge) · text-embedding-004(임베딩)" tone="primary" />
            <DownArrow />
            <div className="flex flex-wrap justify-center gap-3">
              <Box title="Slack 알림" sub="Judge 점수 포함" />
              <Box title="MySQL DB" sub="기록 저장" />
              <Box title="GitHub PR" sub="Before/After 포함" />
            </div>
          </div>
        </div>
      </div>

      {/* 파이프라인 */}
      <div className="rounded-xl border border-outline-variant/10 bg-surface-lowest overflow-hidden">
        <div className="px-4 py-2.5 bg-surface-low border-b border-outline-variant/10">
          <span className="font-space font-bold text-[0.6rem] uppercase tracking-widest text-on-variant/50">에러 발생부터 PR 생성까지</span>
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
  );
};

export const meta: ProjectMeta = {
  title: 'AI 활용법',
  description: '실무에서 AI를 어떻게 활용하는지 정리했습니다. 멀티 에이전트로 여러 프로젝트를 동시에 위임하고, 서버 에러가 나면 자동으로 원인을 분석해 PR까지 만들고, 프로젝트마다 코딩 컨벤션을 문서화해 AI가 매번 같은 스타일로 코드를 작성하게 합니다.',
  role: '실무 적용 사례',
  period: '2026 ~ 현재',
  type: 'work',
  tech: ['Claude Code', 'MCP', 'LangGraph', 'Gemini API', 'ChromaDB'],
};

export const improvements: Improvement[] = [
  {
    title: '멀티 에이전트 팀 오케스트레이션 — ai-crew',
    details: [
      '여러 사이드 프로젝트를 동시에 굴리며 매번 반복되던 "터미널 열기 → 컨텍스트 설명 → 결과 확인" 사이클을 없애기 위해 만든 개인 도구',
      '팀(Team): 격리 단위 — 팀마다 직원 명단·티켓·팀장 대화 세션·담당 프로젝트가 서로 독립적',
      '팀장(Manager): 항상 Claude Code 고정 — 요청을 작업 단위로 쪼개 적합한 직원에게 위임만 하고, 코드는 직접 수정하지 않음',
      '직원(Employee): 이름 기반 DB 레코드 — 고정 역할 없이 자유 텍스트 taskDescription으로 정의하고, Claude Code CLI로 구동',
      '티켓(Ticket): 팀장·직원이 소통하는 작업 단위 — queued → running → review/qa_review → done 순으로 진행되고, 담당 밖 작업이 필요하면 blocked로 전환돼 팀장이 다른 직원에게 자동으로 재위임',
      '사람이 실제로 개입하는 지점은 위험한 명령 실행 직전, QA 3연속 반려 시 하나뿐 — 그 외에는 팀장이 자동으로 결과를 요약해 보고',
    ],
    diagram: <AiCrewArchitecture />,
  },
  {
    title: '운영 서버 에러 자동 분석 · PR 생성 에이전트',
    details: [
      '서버 에러 발생 → Webhook 수신 → Git fetch(최신 소스 동기화) → Error Memory 검색(ChromaDB, 과거 유사 사례) 순으로 파이프라인 시작',
      'LangGraph ReAct 에이전트(Gemini)가 grep_files/read_file/list_directory 도구로 스택 트레이스의 클래스명을 추적해 실제 소스 파일을 직접 탐색·분석',
      '분석 에이전트가 만든 수정안을 별도 LLM Judge가 독립적으로 재검증해 self-evaluation bias를 줄이고, Slack에 원인·수정 코드·Judge 점수를 함께 발송',
      'Slack 승인 버튼 클릭 한 번 → Gemini가 실제 파일 수정 적용 → GitHub PR 자동 생성까지, 에러 감지부터 PR까지 사람 개입은 클릭 한 번',
    ],
    diagram: <LogAgentArchitecture />,
  },
  {
    title: 'CLAUDE.md · SKILL.md로 코드 컨벤션 문서화',
    details: [
      'Controller → Service → Repository 계층 구조와 도메인별 패키지 분리 규칙을 프로젝트 루트 CLAUDE.md에 명시',
      'Controller의 request는 toServiceRequest()로, Service의 request는 toEntity()로만 변환하도록 강제해 계층 간 결합도를 낮추는 규칙을 문서화',
      '다른 도메인의 데이터는 해당 도메인 Service를 거쳐서만 접근하도록(Repository 직접 호출 금지) 규칙화 — AI가 임의로 계층을 건너뛰는 코드를 만들지 않도록 방지',
      '응답 포맷 통일(ApiResponse<T>), 에러·로그 메시지는 한국어로 작성 등 세부 컨벤션까지 명시해, 새 기능을 AI에게 위임해도 매번 같은 스타일의 코드가 나오도록 구성',
      'CLAUDE.md 외에도 커밋 메시지·테스트 코드·API 문서화처럼 반복 작업마다 별도 SKILL.md를 두어, 언제(When to use) 어떤 규칙(How to)을 적용할지 세분화',
    ],
    diagram: (
      <details className="mt-4 rounded-xl border border-outline-variant/15 overflow-hidden">
        <summary className="px-4 py-2.5 bg-surface-low border-b border-outline-variant/10 cursor-pointer select-none flex items-center justify-between list-none">
          <span className="font-space font-bold text-[0.6rem] uppercase tracking-widest text-on-variant/60">.claude/skills 문서 원문 보기 (PuppyNote 서버, 4개 파일)</span>
          <svg className="w-3.5 h-3.5 text-on-variant/40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <div className="bg-surface-lowest divide-y divide-outline-variant/10">
          <div className="px-5 py-4 overflow-x-auto">
            <div className="font-space font-bold text-[0.55rem] uppercase tracking-widest text-primary/60 mb-2">.claude/skills/structure/SKILL.md</div>
            <pre className="font-space text-[0.6rem] text-on-variant/70 leading-relaxed whitespace-pre-wrap">{`# Guide for Project Structure

## Overview
Project structure plays a crucial role in enhancing the maintainability and scalability of a project. A proper structure allows developers to easily understand and modify code, and facilitates the addition of new features.

## When to use?
- When the user modifies code or adds a new feature.
- When a feature addition is requested.
- When a feature modification is requested.

## Project Structure Implementation Guidelines
- For the puppynoteserver project, it is recommended to structure the project by dividing packages by domain under the src/main/java/com/puppynote/server directory. For example, user-related code should be in the user package, and post-related code in the post package.
- It is advisable to separate concerns by placing classes including domain models, services, and controllers within each package. For example, the user package may include the User entity, UserService, and UserController.
- Additionally, commonly used utility classes or exception handling classes should be placed in the global package. This makes the project structure clear and helps developers easily find the necessary code.
- Configurations are recommended to be placed in the global/config package. For example, database settings, security configurations, and Swagger settings can be included in the config package.
- It is recommended to create and manage Request DTOs and Response DTOs for each Controller, Service, and Repository to clarify API specifications and improve maintainability. However, the Controller shares the Response with the Service.
- When converting requests to different layers, it is recommended to create and manage toServiceRequest() and toDto() methods. This reduces dependencies between layers and enhances code readability.
- When creating a Response, it is recommended to use the of() method. This makes object creation clear and maintains code consistency. For example, creating an of() method in the UserResponse class to convert a User entity into a UserResponse.`}</pre>
          </div>
          <div className="px-5 py-4 overflow-x-auto">
            <div className="font-space font-bold text-[0.55rem] uppercase tracking-widest text-primary/60 mb-2">.claude/skills/junit/SKILL.md</div>
            <pre className="font-space text-[0.6rem] text-on-variant/70 leading-relaxed whitespace-pre-wrap">{`# JUnit Test Code Writing Guide

## Overview
This is a guide on how to write test codes using JUnit when creating unit tests for each layer, such as Controller, Service, and Repository.

## When to use?
- When the user requests to write JUnit test codes.
- When the user requests to add a feature.
- When a bug occurs.
- When the user requests to modify a feature.

## How to write JUnit test codes
- Use the @DisplayName annotation on test methods to clearly indicate the purpose of the test in Korean.
- Test method names are written in Korean, with spaces separated by _.
- Write test classes for each layer.
- Parts that call external APIs are tested by mocking them in the IntegrationTestSupport class.
- When testing a Controller, Service testing is not necessary, so test by mocking in ControllerTestSupport.
- For assertions, use AssertJ; when testing, do not do them individually, but utilize contains, containsExactly, containsExactlyInAnyOrder, etc.
- Test method names are written in given_when_then format to clearly indicate the purpose of the test.
- Write test methods so that they test only one function within each method.
- Test data is created directly within the test method, or commonly required data is set up using the @BeforeEach annotation.`}</pre>
          </div>
          <div className="px-5 py-4 overflow-x-auto">
            <div className="font-space font-bold text-[0.55rem] uppercase tracking-widest text-primary/60 mb-2">.claude/skills/restdocs/SKILL.md</div>
            <pre className="font-space text-[0.6rem] text-on-variant/70 leading-relaxed whitespace-pre-wrap">{`# Restdocs Test Code Writing Guide

## Overview
This is a guide on how to write test codes using JUnit when creating unit tests for each layer, such as Controller, Service, and Repository.

## When to use?
- When the user requests to write Restdocs test codes.
- When the user requests to add a feature.
- When a bug occurs.
- When the user requests to modify a feature.

## How to write Restdocs test codes
- Write Controller specifications under the test/java/docs folder.
- Match the package structure to be identical to the actual Controller's package structure.
- Test the Service layer by mocking it using MockBean.
- Write API specifications in the src/docs/asciidoc folder.
- Write API specifications to be identical to the actual API specifications.`}</pre>
          </div>
          <div className="px-5 py-4 overflow-x-auto">
            <div className="font-space font-bold text-[0.55rem] uppercase tracking-widest text-primary/60 mb-2">.claude/skills/git-commits/SKILL.md</div>
            <pre className="font-space text-[0.6rem] text-on-variant/70 leading-relaxed whitespace-pre-wrap">{`# Git Commit Message Writing Guide

## Overview
This is a guide for analyzing Git changes and writing Korean commit messages that adhere to the conventional commit format.

## When to use?
- When a commit message needs to be written.
- When the user requests a Git commit.

## Commit Message Writing Rules
- epic: Large-scale feature addition or change
- feat: New feature addition
- fix: Bug fix
- docs: Documentation change
- style: Code formatting, missing semicolons, etc. (no code changes)
- refactor: Code refactoring
- test: Test code addition
- chore: Changes to build tasks, package manager updates, or other miscellaneous changes`}</pre>
          </div>
        </div>
      </details>
    ),
  },
];
