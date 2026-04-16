import type { ProjectMeta, Improvement } from '../types';

export const meta: ProjectMeta = {
  title: '큐텐 웹 서비스',
  description: '큐텐·티몬·위메프·인터파크의 화면·매출·상품 통계 데이터를 제공하는 Analytics 웹과, 사원들의 기안서·휴가·공지사항을 처리하는 사내 그룹웨어를 유지보수한 프로젝트입니다.',
  role: 'Backend Developer',
  period: '2024.05 ~ 2024.10',
  org: '큐텐테크놀로지',
  type: 'work',
  tech: ['Java 8', 'Spring Boot 1.5', 'MSSQL', 'MyBatis', 'ElasticSearch', 'JavaScript', 'JSP', 'jQuery'],
};

export const improvements: Improvement[] = [
  {
    title: 'ElasticSearch Aggregation으로 국가별 통계 자동화 — 신규 국가 코드 수정 0건',
    metric: '코드 수정 0건',
    details: [
      '큐텐·티몬·위메프 Analytics 웹의 국가 코드를 직접 enum·상수로 관리하던 방식에서 ElasticSearch Aggregation 기반으로 전환',
      '신규 국가 추가 시 기존 코드 수정 없이 자동으로 그룹핑 처리, 코드 수정 필요성 100% 제거',
      '화면·매출·상품 통계 데이터 제공 기능 유지보수 및 국가별 데이터 집계 자동화',
    ],
  },
  {
    title: 'JOIN 제거로 그룹웨어 기안서 조회 쿼리 응답 속도 40% 향상',
    metric: '40% 속도 향상',
    details: [
      '기안서 상태 조회 시 불필요한 JOIN 쿼리를 단일 테이블 조회로 리팩터링',
      '쿼리 응답 속도 약 40% 향상 및 쿼리 가독성 개선',
      '큐텐 사내 그룹웨어(기안서·상신·휴가·공지사항) 서비스 유지보수',
    ],
  },
];
