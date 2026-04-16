import type { ProjectMeta, Improvement } from '../types';

export const meta: ProjectMeta = {
  title: 'Luckkids',
  role: 'Backend Developer',
  period: '2023.10 ~ 현재',
  type: 'study',
  tech: ['Java 17', 'Spring Boot 3', 'MySQL', 'JPA', 'Jenkins', 'Docker', 'AWS Lambda', 'EventBridge', 'S3', 'CloudFront', 'LightSail'],
  links: [
    { label: 'App Store', url: 'https://apps.apple.com/kr/app/luckkids-%EB%9F%AD%ED%82%A4%EC%A6%88-%ED%96%89%EC%9A%B4%EC%9D%84-%ED%82%A4%EC%9A%B0%EB%8A%94-%EC%8A%B5%EA%B4%80-%EC%95%B1/id6475259179', icon: 'appstore' },
    { label: 'GitHub', url: 'https://github.com/luckkids/luckkids-server', icon: 'github' },
  ],
};

export const improvements: Improvement[] = [
  {
    title: 'AWS Lambda + EventBridge로 푸시 알림 전환 — EC2 서버 비용 100% 절감',
    metric: 'EC2 비용 100% 절감',
    details: [
      '기존 Spring Batch on EC2 방식의 푸시 알림 배치를 AWS EventBridge + Lambda Serverless 아키텍처로 전환',
      '배치 실행에 전용 EC2 인스턴스가 필요하던 구조 제거, Lambda 실행 시간만큼만 과금되는 구조로 전환',
      '5분마다 푸시 발송하는 서비스 특성상 월 약 8,640회 실행 — Lambda 월 100만 건 · EventBridge 월 1,400만 건 무료 티어로 실질 비용 $0 운영',
      '서버 프로비저닝·관리 오버헤드 제거 및 스케일링 자동화, 월 EC2 비용 대비 100% 절감',
    ],
    diagram: (
      <div className="mt-4 flex flex-col gap-3">
        {/* AS-IS */}
        <div className="rounded-xl border border-outline-variant/20 overflow-hidden">
          <div className="px-4 py-2 bg-surface-low border-b border-outline-variant/20 flex items-center gap-2">
            <span className="font-space font-bold text-[0.6rem] uppercase tracking-widest text-on-variant/50">AS-IS</span>
            <span className="font-space text-[0.6rem] text-on-surface">Spring Batch on VM — 전용 서버 상시 운영 필요</span>
          </div>
          <div className="bg-surface-lowest px-5 py-4 overflow-x-auto">
            <div className="flex items-center gap-2 min-w-max">
              <div className="flex flex-col items-center gap-1">
                <div className="w-28 h-10 rounded-lg border border-outline-variant/30 bg-surface-low flex items-center justify-center px-1 text-center">
                  <span className="font-space font-bold text-[0.55rem] uppercase tracking-tight text-on-surface leading-tight">Spring Batch<br/><span className="text-on-variant/50">(VM 상시 가동)</span></span>
                </div>
                <span className="font-space text-[0.5rem] text-on-variant/40 uppercase">Cron Scheduler</span>
              </div>
              <div className="flex items-center opacity-40">
                <div className="w-8 h-px bg-on-variant/50" />
                <div className="w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[5px] border-l-on-variant/50" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-28 h-10 rounded-lg border border-outline-variant/30 bg-surface-low flex items-center justify-center px-1 text-center">
                  <span className="font-space font-bold text-[0.55rem] uppercase tracking-tight text-on-surface leading-tight">Google<br/>Firebase FCM</span>
                </div>
                <span className="font-space text-[0.5rem] text-on-variant/40 uppercase">Push 발송</span>
              </div>
              <div className="flex items-center opacity-40">
                <div className="w-8 h-px bg-on-variant/50" />
                <div className="w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[5px] border-l-on-variant/50" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-16 h-10 rounded-lg border border-outline-variant/30 bg-surface-low flex items-center justify-center">
                  <span className="font-space font-bold text-[0.55rem] uppercase tracking-wider text-on-surface">User</span>
                </div>
                <span className="font-space text-[0.5rem] text-on-variant/40 uppercase">수신</span>
              </div>
            </div>
          </div>
        </div>
        {/* TO-BE */}
        <div className="rounded-xl border border-primary/20 overflow-hidden">
          <div className="px-4 py-2 bg-primary/5 border-b border-primary/10 flex items-center gap-2">
            <span className="font-space font-bold text-[0.6rem] uppercase tracking-widest text-primary/70">TO-BE</span>
            <span className="font-space text-[0.6rem] text-on-surface">EventBridge + Lambda Serverless — 실행 시간만 과금</span>
          </div>
          <div className="bg-surface-lowest px-5 py-4 overflow-x-auto">
            <div className="flex items-center gap-2 min-w-max">
              <div className="flex flex-col items-center gap-1">
                <div className="w-28 h-10 rounded-lg border border-primary/40 bg-primary/5 flex items-center justify-center px-1 text-center">
                  <span className="font-space font-bold text-[0.55rem] uppercase tracking-tight text-primary leading-tight">AWS<br/>EventBridge</span>
                </div>
                <span className="font-space text-[0.5rem] text-primary/60 uppercase">주기적 호출</span>
              </div>
              <div className="flex items-center opacity-60">
                <div className="w-8 h-px bg-primary" />
                <div className="w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[5px] border-l-primary" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-28 h-10 rounded-lg border border-primary/40 bg-primary/5 flex items-center justify-center px-1 text-center">
                  <span className="font-space font-bold text-[0.55rem] uppercase tracking-tight text-primary leading-tight">AWS Lambda<br/><span className="text-primary/50">(Serverless)</span></span>
                </div>
                <span className="font-space text-[0.5rem] text-primary/60 uppercase">실행 시간만 과금</span>
              </div>
              <div className="flex items-center opacity-60">
                <div className="w-8 h-px bg-primary" />
                <div className="w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[5px] border-l-primary" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-28 h-10 rounded-lg border border-primary/40 bg-primary/5 flex items-center justify-center px-1 text-center">
                  <span className="font-space font-bold text-[0.55rem] uppercase tracking-tight text-primary leading-tight">Google<br/>Firebase FCM</span>
                </div>
                <span className="font-space text-[0.5rem] text-primary/60 uppercase">Push 발송</span>
              </div>
              <div className="flex items-center opacity-60">
                <div className="w-8 h-px bg-primary" />
                <div className="w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[5px] border-l-primary" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-16 h-10 rounded-lg border border-primary/30 bg-primary/5 flex items-center justify-center">
                  <span className="font-space font-bold text-[0.55rem] uppercase tracking-wider text-primary">User</span>
                </div>
                <span className="font-space text-[0.5rem] text-primary/60 uppercase">수신</span>
              </div>
            </div>
          </div>
        </div>
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
