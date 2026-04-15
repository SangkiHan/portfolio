import type { ProjectMeta, Improvement } from '../types';

export const meta: ProjectMeta = {
  title: '레거시 SEMS 유지보수 (GS25 편의점 관제 시스템)',
  role: 'Junior Developer',
  period: '2025.05 ~ 2025.12',
  org: '티앤엠테크',
  type: 'work',
  tech: ['Java 8', 'Spring Framework 4', 'MySQL', 'MyBatis', 'NCloud'],
};

export const improvements: Improvement[] = [
  {
    title: '메모리 누수 원인 분석 및 수정 — 5개월간 서버 다운 0건',
    metric: '서버 다운 0건',
    details: [
      'jmap을 이용한 힙 덤프 분석으로 메모리 누수의 근본 원인이 FileInputStream close 누락임을 확인',
      'try-with-resources 패턴 적용으로 파일 스트림 자동 반납, GC 이후 힙 사용량 90% 감소',
      '수정 이전 주기적 서버 재시작 필요 상태 → 수정 이후 5개월 무중단 운영',
      'Slack 배치 자동화로 매일 오전 힙 사용량을 채널에 보고, 이상 징후 조기 감지 체계 구축',
    ],
  },
  {
    title: 'NCloud Object Storage 마이그레이션으로 서버 디스크 30GB 확보',
    metric: '30GB 확보',
    details: [
      '서버 로컬 디스크에 직접 저장하던 첨부파일, 이미지 등을 NCloud Object Storage로 전면 이관',
      '마이그레이션 완료 후 서버 디스크 30GB 이상 확보, 향후 스토리지 확장 비용 제거',
      'Object Storage URL 기반 파일 접근으로 전환해 파일 서빙 부하를 애플리케이션 서버에서 분리',
    ],
  },
  {
    title: 'Slack 연동 배치 자동화로 일일 힙 메모리 모니터링 구축',
    details: [
      '매일 오전 지정 시간에 JVM 힙 사용량 통계를 자동 수집해 Slack 채널에 보고하는 배치 작업 구현',
      '실시간 모니터링 도구 없이도 힙 메모리 추이를 일별로 추적해 이상 징후를 사전에 감지',
      '기존 수동 확인 방식 대비 운영 부담 제거, 이상 징후 발견 시 즉각 Slack 알림으로 대응 속도 향상',
    ],
  },
];
