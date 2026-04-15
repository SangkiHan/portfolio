import type { ProjectMeta, Improvement } from '../types';

export const meta: ProjectMeta = {
  title: 'Luckkids',
  role: 'Backend Developer',
  period: '2023.10 ~ 현재',
  type: 'study',
  tech: ['Java 17', 'Spring Boot 3', 'MySQL', 'JPA', 'Jenkins', 'Docker', 'AWS Lambda', 'EventBridge', 'S3', 'CloudFront', 'LightSail'],
};

export const improvements: Improvement[] = [
  {
    title: 'AWS Lambda + EventBridge로 푸시 알림 전환 — EC2 서버 비용 100% 절감',
    metric: 'EC2 비용 100% 절감',
    details: [
      '기존 Spring Batch on EC2 방식의 푸시 알림 배치를 AWS EventBridge + Lambda Serverless 아키텍처로 전환',
      '배치 실행에 전용 EC2 인스턴스가 필요하던 구조 제거, Lambda 실행 시간만큼만 과금되는 구조로 전환',
      '서버 프로비저닝·관리 오버헤드 제거 및 스케일링 자동화, 월 EC2 비용 대비 100% 절감',
    ],
    diagram: (
      <div className="mt-4 rounded-xl border border-dashed border-outline-variant/30 bg-surface-lowest/60 h-40 flex items-center justify-center">
        {/* TODO: EventBridge + Lambda 푸시 알림 아키텍처 다이어그램 */}
        <span className="font-space text-[0.65rem] text-on-variant/40 uppercase tracking-widest">
          [ EventBridge → Lambda → Push Notification 아키텍처 ]
        </span>
      </div>
    ),
  },
  {
    title: 'S3 + CloudFront CDN으로 이미지 전송 70% 빠르게, 번들 크기 30% 감소',
    metric: '이미지 70% 빠름',
    details: [
      '서버 직접 서빙 방식에서 S3 + CloudFront CDN 구조로 전환, 이미지 전송 속도 70% 향상',
      'CloudFront 엣지 로케이션 캐싱으로 글로벌 레이턴시 감소 및 Origin 서버 부하 분산',
      'React 프로젝트 정적 빌드 파일을 S3에 배포, 번들 사이즈 30% 감소 및 초기 로딩 성능 개선',
    ],
  },
  {
    title: 'AWS LightSail 도입으로 EC2 대비 서버 비용 50% 절감',
    metric: '50% 비용 절감',
    details: [
      'EC2 On-Demand 인스턴스(월 ~$24) 대비 LightSail 고정 요금제(월 $12)로 전환해 50% 비용 절감',
      '스터디 프로젝트 규모에 적합한 리소스 스펙을 사전에 예측 가능한 고정 비용으로 운영',
      '개발·운영 환경을 LightSail 인스턴스로 통합 관리, 인프라 관리 복잡도 감소',
    ],
  },
  {
    title: 'Spring REST Docs + 300개+ 테스트 코드로 배포 롤백 0건 달성',
    metric: '롤백 0건',
    details: [
      'Spring REST Docs를 활용해 실제 API 동작 기반의 정확한 문서 자동 생성, 문서-코드 불일치 제거',
      '단위·통합 테스트 300개 이상 작성, 회귀 버그를 배포 전 자동 탐지하는 안전망 구축',
      '테스트 도입 이후 운영 환경 배포 롤백 0건, 신규 기능 개발 속도와 안정성 동시 확보',
    ],
  },
];
