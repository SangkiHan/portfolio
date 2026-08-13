import type { ProjectMeta, Improvement } from '../types';

export const meta: ProjectMeta = {
  title: 'AI 활용법 — 멀티 에이전트 팀 오케스트레이션',
  description: '여러 사이드 프로젝트를 동시에 굴리며 매번 반복되던 "터미널 열기 → 컨텍스트 설명 → 결과 확인" 사이클을 없애기 위해 만든 개인 도구 "ai-crew"입니다. 팀장 1명이 요청을 티켓으로 쪼개 프로젝트별 직원(Claude Code / Codex / Antigravity)에게 위임하고, 사람은 조직도 UI에서 진행 상황을 보다가 필요할 때만 개입합니다.',
  role: 'Full Stack Developer',
  period: '2026.07 ~ 현재',
  type: 'personal',
  tech: ['TypeScript', 'Fastify', 'WebSocket', 'MCP', 'Prisma', 'PostgreSQL (pgvector)', 'React', 'React Flow', 'Zustand', 'Docker', 'Claude Code'],
};

export const improvements: Improvement[] = [
  {
    title: '오케스트레이션 프레임워크 대신 Claude Code 자체를 팀장으로 활용',
    metric: '6일 · 83 Commits',
    details: [
      'LangGraph·CrewAI 같은 멀티 에이전트 프레임워크를 검토했지만, 작업 분해·툴 호출·서브에이전트 루프가 이미 Claude Code에 내장돼 있어 프레임워크 없이 MCP 서버 하나(list_projects/list_employees/create_ticket 등)로 위임 인터페이스만 구현',
      '팀장·직원 모두 API 키가 아닌 기존 CLI 구독(Claude Max 등)으로 동작해 API 토큰 과금 없이 운영',
      '직원은 고정 역할 enum 없이 자유 텍스트 taskDescription으로 정의 — 웹 UI에서 직원을 추가하면 러너 재시작 없이 바로 다음 티켓부터 반영',
    ],
    blogUrl: 'https://sangkihan.github.io/posts/ai-crew-intro/',
  },
  {
    title: 'blocked 에스컬레이션으로 프로젝트 간 작업을 자동으로 연계',
    details: [
      '직원이 담당 밖 작업이 필요하면 report_blocked를 호출해 티켓을 blocked로 전환 → 서버가 팀장을 자동으로 깨워 다른 직원에게 parentTicketId로 자식 티켓을 발행 → 완료되면 원래 티켓이 자동으로 재개',
      '프론트 직원에게 화면 개발을 맡겼을 때 필요한 백엔드 API가 없어 blocked → 팀장이 백엔드 직원에게 API 구현 티켓 발행 → 테스트 통과 후 프론트 티켓 자동 재개까지 실전 검증',
      '사람이 실제로 개입하는 지점은 needs_approval(위험 명령 실행 직전, 또는 QA 3연속 반려) 하나뿐 — 그 외에는 팀장이 자동으로 결과를 요약해 채팅으로 보고',
    ],
    blogUrl: 'https://sangkihan.github.io/posts/ai-crew-architecture/',
  },
  {
    title: 'Docker + 호스트 하이브리드 배포로 기존 프로젝트 툴체인을 그대로 재사용',
    details: [
      'server(Fastify+WS+Prisma)·web(React Flow UI)·postgres(pgvector)는 Docker Compose로, CLI를 실제로 스폰하는 runner만 호스트에서 직접 실행 — Spring Boot(Gradle)·React Native 등 프로젝트마다 다른 툴체인을 컨테이너로 재현할 필요 없이 호스트에 이미 설치된 환경을 그대로 사용',
      '완료된 티켓·승인된 기획서를 로컬 임베딩(@xenova/transformers)해 Postgres(pgvector)에 저장하는 팀 기억(RAG)을 구성, 팀장 컨텍스트가 압축된 이후에만 보조 검색으로 사용해 평소 비용은 늘리지 않음',
      '(직원, 프로젝트) 조합별 세션을 재사용해 반복 위임 시 코드베이스 재분석 비용을 줄이고, "같은 직원·같은 프로젝트 작업은 티켓 하나로 묶기" 지침으로 한 요청이 여러 티켓으로 쪼개져 비용이 배로 드는 문제를 방지',
    ],
    blogUrl: 'https://sangkihan.github.io/posts/ai-crew-dev-journey/',
  },
];
