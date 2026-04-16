import type { ProjectMeta, Improvement } from '../types';

export const meta: ProjectMeta = {
  title: 'SK쉴더스 마이캡스',
  description: 'SK쉴더스의 보안 상품을 가입한 고객들을 대상으로 보안 관리를 지원하는 앱입니다. OAuth2.0 기반 통합 인증 연동 및 토큰 재발급 성능 개선 등 서버 유지보수를 담당했습니다.',
  role: 'Backend Developer',
  period: '2023.04 ~ 2024.03',
  org: '모빌씨앤씨',
  type: 'work',
  tech: ['Java 8', 'Spring Framework 4', 'AWS Aurora', 'MyBatis', 'Redis', 'OAuth2.0'],
};

export const improvements: Improvement[] = [
  {
    title: 'RefreshToken Redis 이관으로 토큰 재발급 속도 150ms → 20ms',
    metric: '87% 성능 개선',
    details: [
      'DB에서 RefreshToken을 조회하던 방식에서 Redis 캐시로 전환',
      '평균 토큰 재발급 응답 시간 150ms → 20ms로 약 87% 단축',
      'Redis TTL 설정으로 만료 토큰 자동 삭제, 불필요한 DB 조회 제거',
    ],
    diagram: (
      <div className="mt-4 rounded-xl border border-outline-variant/10 bg-surface-lowest overflow-hidden">
        <div className="px-5 py-4">
          <div className="font-space font-bold text-[0.6rem] uppercase tracking-widest text-on-variant/50 mb-3">토큰 재발급 응답 시간 비교 — RefreshToken 조회 기준</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-outline-variant/20 bg-surface-low/50 px-4 py-3">
              <div className="font-space text-[0.6rem] uppercase tracking-widest text-on-variant/50 mb-1">DB 조회</div>
              <div className="font-manrope font-extrabold text-2xl text-on-surface tabular-nums">150 <span className="text-sm font-space font-bold text-on-variant/50">ms</span></div>
            </div>
            <div className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 relative overflow-hidden">
              <div className="font-space text-[0.6rem] uppercase tracking-widest text-primary/70 mb-1">Redis 캐시</div>
              <div className="font-manrope font-extrabold text-2xl text-primary tabular-nums">20 <span className="text-sm font-space font-bold text-primary/50">ms</span></div>
              <span className="absolute top-2 right-2 bg-primary text-primary-on font-space font-bold text-[0.55rem] px-2 py-0.5 rounded-full uppercase tracking-wider">7.5x faster</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: '제네릭 기반 공통 Service 설계로 API 유지보수성 50% 향상',
    metric: '유지보수성 50% 향상',
    details: [
      'SK쉴더스 외부 API 호출 시 응답 타입마다 별도 Service를 작성하던 구조를 제네릭 기반 공통 Service로 통합',
      'API 응답값 자동 매핑으로 신규 API 추가 시 코드 중복 제거, 유지보수성 약 50% 향상',
      'OAuth2.0 기반 SK쉴더스 통합 인증 연동 및 AccessToken/RefreshToken 발급 로직 구현',
    ],
  },
];
