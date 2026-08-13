import type { ProjectMeta, Improvement } from '../types';

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
      '팀(Team): 격리 단위 — 팀마다 직원 명단·티켓·팀장 대화 세션·담당 프로젝트가 서로 독립적',
      '팀장(Manager): 항상 Claude Code 고정 — 요청을 작업 단위로 쪼개 적합한 직원에게 위임만 하고, 코드는 직접 수정하지 않음',
      '직원(Employee): 이름 기반 DB 레코드 — 고정 역할 없이 자유 텍스트 taskDescription으로 정의하고, driver(Claude Code/Codex/Antigravity)를 프로젝트별로 자유롭게 설정',
      '티켓(Ticket): 팀장·직원이 소통하는 작업 단위 — queued → running → review/qa_review → done 순으로 진행되고, 담당 밖 작업이 필요하면 blocked로 전환돼 팀장이 다른 직원에게 자동으로 재위임',
      '사람이 실제로 개입하는 지점은 위험한 명령 실행 직전, QA 3연속 반려 시 하나뿐 — 그 외에는 팀장이 자동으로 결과를 요약해 보고',
    ],
    blogUrl: 'https://sangkihan.github.io/posts/ai-crew-intro/',
  },
  {
    title: '운영 서버 에러 자동 분석 · PR 생성 에이전트',
    details: [
      '서버 에러 발생 → Webhook 수신 → Git fetch(최신 소스 동기화) → Error Memory 검색(ChromaDB, 과거 유사 사례) 순으로 파이프라인 시작',
      'LangGraph ReAct 에이전트(Gemini)가 grep_files/read_file/list_directory 도구로 스택 트레이스의 클래스명을 추적해 실제 소스 파일을 직접 탐색·분석',
      '분석 에이전트가 만든 수정안을 별도 LLM Judge가 독립적으로 재검증해 self-evaluation bias를 줄이고, Slack에 원인·수정 코드·Judge 점수를 함께 발송',
      'Slack 승인 버튼 클릭 한 번 → Gemini가 실제 파일 수정 적용 → GitHub PR 자동 생성까지, 에러 감지부터 PR까지 사람 개입은 클릭 한 번',
    ],
    blogUrl: 'https://sangkihan.github.io/posts/ai-log-agent-architecture/',
  },
  {
    title: 'CLAUDE.md · SKILL.md로 코드 컨벤션 문서화',
    details: [
      'Controller → Service → Repository 계층 구조와 도메인별 패키지 분리 규칙을 프로젝트 루트 CLAUDE.md에 명시',
      'Controller의 request는 toServiceRequest()로, Service의 request는 toEntity()로만 변환하도록 강제해 계층 간 결합도를 낮추는 규칙을 문서화',
      '다른 도메인의 데이터는 해당 도메인 Service를 거쳐서만 접근하도록(Repository 직접 호출 금지) 규칙화 — AI가 임의로 계층을 건너뛰는 코드를 만들지 않도록 방지',
      '응답 포맷 통일(ApiResponse<T>), 에러·로그 메시지는 한국어로 작성 등 세부 컨벤션까지 명시해, 새 기능을 AI에게 위임해도 매번 같은 스타일의 코드가 나오도록 구성',
    ],
  },
];
