import type { ProjectMeta, Improvement } from '../types';

export const meta: ProjectMeta = {
  title: 'TNM 플랫폼 (IoT 관제 플랫폼)',
  description: 'IoT 관제 웹을 회사별로 바로 제공할 수 있는 플랫폼입니다. SEMS 운영에서 겪은 컬렉션 관리·토픽 확장·서비스별 보안 설정의 구조적 한계를 신규 개발 단계에서 해소하는 데 집중했습니다.',
  role: 'Backend Developer',
  period: '2026.06 ~ 2026.08',
  org: '티앤엠테크',
  type: 'work',
  tech: ['Java 17', 'Spring Boot 3', 'PostgreSQL', 'MongoDB', 'MyBatis', 'JPA', 'Azure Event Hubs', 'Azure Application Gateway'],
};

export const improvements: Improvement[] = [
  {
    title: 'MongoDB Time Series Collection 도입으로 일자별 컬렉션 분리 구조를 단일 컬렉션으로 통합',
    metric: '분기 로직 제거',
    details: [
      '기존 SEMS는 일자(YYYYMMDD)별로 컬렉션을 생성해 데이터를 분리 저장하는 구조로, 조회 시점마다 대상 컬렉션을 계산하는 분기 로직이 필요했음',
      'MongoDB Time Series Collection을 도입해 단일 컬렉션 체계로 통합, 시간 기반 데이터를 내부적으로 자동 버킷팅하도록 위임',
      '컬렉션 생성·관리 배치와 조회 시점 분기 로직을 제거해 코드 복잡도를 대폭 개선',
      '기간 조회 시 여러 컬렉션을 순회하며 결과를 병합하던 로직 없이 단일 쿼리로 처리 가능',
    ],
    diagram: (
      <div className="mt-4 rounded-xl border border-outline-variant/10 bg-surface-lowest overflow-hidden">
        <div className="px-4 py-2.5 bg-surface-low border-b border-outline-variant/10">
          <span className="font-space font-bold text-[0.6rem] uppercase tracking-widest text-on-variant/50">컬렉션 구조 비교 — 일자별 분리 vs Time Series 단일 컬렉션</span>
        </div>
        <div className="px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* AS-IS */}
          <div className="rounded-lg border border-outline-variant/20 bg-surface-low/50 p-4">
            <div className="font-space font-bold text-[0.6rem] uppercase tracking-widest text-on-variant/50 mb-3">AS-IS · 기존 SEMS</div>
            <div className="space-y-1.5 mb-3">
              {(['20260601', '20260602', '20260603', '…'] as string[]).map((name) => (
                <div key={name} className="rounded border border-outline-variant/25 bg-surface-lowest/60 px-2.5 py-1.5">
                  <span className="font-space font-bold text-[0.55rem] text-on-surface">Collection: {name}</span>
                </div>
              ))}
            </div>
            <div className="rounded border border-outline-variant/25 bg-surface-lowest/40 px-2.5 py-2">
              <div className="font-space text-[0.5rem] text-on-variant/60 leading-relaxed">
                · 일자별 컬렉션 생성 배치 필요<br />
                · 조회 시 대상 컬렉션 계산 분기<br />
                · 기간 조회 시 결과 병합 로직
              </div>
            </div>
          </div>
          {/* TO-BE */}
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
            <div className="font-space font-bold text-[0.6rem] uppercase tracking-widest text-primary/70 mb-3">TO-BE · TNM 플랫폼</div>
            <div className="mb-3">
              <div className="rounded border border-primary/25 bg-surface-lowest/60 px-2.5 py-2.5">
                <div className="font-space font-bold text-[0.55rem] text-primary">Time Series Collection (1개)</div>
                <div className="font-space text-[0.45rem] text-on-variant/50 mt-1">timeField · metaField 기반 자동 버킷팅</div>
              </div>
            </div>
            <div className="rounded border border-primary/20 bg-surface-lowest/40 px-2.5 py-2">
              <div className="font-space text-[0.5rem] text-on-variant/60 leading-relaxed">
                · 컬렉션 관리 배치 제거<br />
                · 조회 시점 분기 로직 제거<br />
                · 기간 조회를 단일 쿼리로 처리
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Azure Event Hubs 전환으로 신규 서비스 온보딩을 무중단 확장 구조로 개선',
    metric: 'Broker 재시작 0회',
    details: [
      '기존 SEMS의 자체 운영 Kafka는 토픽 추가 시마다 Broker VM 재시작과 파티션 수동 조정이 필요해, 서비스가 늘어날수록 온보딩 비용과 운영 리스크가 증가',
      '관리형 서비스인 Azure Event Hubs로 전환해 브로커 운영 책임을 인프라 레벨로 위임',
      '신규 서비스 온보딩 시 토픽(Event Hub)만 추가하면 되는 무중단 확장 구조 확보',
      'Kafka 프로토콜 호환을 활용해 기존 Consumer 구현 방식을 크게 바꾸지 않고 이관',
    ],
    diagram: (
      <div className="mt-4 rounded-xl border border-outline-variant/10 bg-surface-lowest overflow-hidden">
        <div className="px-4 py-2.5 bg-surface-low border-b border-outline-variant/10">
          <span className="font-space font-bold text-[0.6rem] uppercase tracking-widest text-on-variant/50">신규 서비스 온보딩 절차 비교</span>
        </div>
        <div className="px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* AS-IS */}
          <div className="rounded-lg border border-outline-variant/20 bg-surface-low/50 p-4">
            <div className="font-space font-bold text-[0.6rem] uppercase tracking-widest text-on-variant/50 mb-3">AS-IS · 자체 운영 Kafka</div>
            <div className="space-y-0">
              {([
                { step: '①', label: '토픽 추가' },
                { step: '②', label: 'Broker VM 재시작', warn: true },
                { step: '③', label: '파티션 수동 조정', warn: true },
                { step: '④', label: '서비스 오픈' },
              ] as { step: string; label: string; warn?: boolean }[]).map(({ step, label, warn }) => (
                <div key={step} className="flex items-center gap-2.5 pb-2 last:pb-0">
                  <div className="w-5 h-5 rounded-full border border-outline-variant/30 bg-surface-lowest flex items-center justify-center shrink-0">
                    <span className="font-space font-bold text-[0.5rem] text-on-variant/60">{step}</span>
                  </div>
                  <span className={`font-space font-bold text-[0.55rem] ${warn ? 'text-on-surface' : 'text-on-variant/60'}`}>{label}</span>
                  {warn && (
                    <span className="font-space font-bold text-[0.45rem] uppercase tracking-wider text-on-variant/40 border border-outline-variant/30 rounded-full px-1.5 py-0.5">중단 발생</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* TO-BE */}
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
            <div className="font-space font-bold text-[0.6rem] uppercase tracking-widest text-primary/70 mb-3">TO-BE · Azure Event Hubs</div>
            <div className="space-y-0">
              {([
                { step: '①', label: 'Event Hub(토픽) 추가' },
                { step: '②', label: '서비스 오픈' },
              ] as { step: string; label: string }[]).map(({ step, label }) => (
                <div key={step} className="flex items-center gap-2.5 pb-2">
                  <div className="w-5 h-5 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="font-space font-bold text-[0.5rem] text-primary">{step}</span>
                  </div>
                  <span className="font-space font-bold text-[0.55rem] text-on-surface">{label}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 rounded border border-primary/20 bg-surface-lowest/40 px-2.5 py-2">
              <div className="font-space text-[0.5rem] text-on-variant/60 leading-relaxed">
                · Broker VM 재시작 불필요<br />
                · 파티션·스케일 관리형 위임
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Azure Application Gateway 도입으로 SSL·JWT 검증을 게이트웨이 레벨에서 일원화',
    metric: '중복 구현 제거',
    details: [
      '기존 구조는 서비스가 늘어날 때마다 VM 단위로 SSL 인증서를 개별 설정하고, 서비스마다 JWT 검증 로직을 중복 구현해야 했음',
      'Azure Application Gateway를 구성해 SSL 종료(TLS Termination)와 JWT 검증을 게이트웨이 레벨 공통 처리로 이관',
      '신규 서비스는 라우팅 규칙만 추가하면 인증·보안 설정이 동일하게 적용되도록 구성해 확장 비용 최소화',
      '서비스별 보안 설정 누락 리스크를 구조적으로 제거하고, 인증서 갱신 지점을 게이트웨이 한 곳으로 축소',
    ],
    diagram: (
      <div className="mt-4 rounded-xl border border-outline-variant/10 bg-surface-lowest overflow-hidden">
        <div className="px-4 py-2.5 bg-surface-low border-b border-outline-variant/10">
          <span className="font-space font-bold text-[0.6rem] uppercase tracking-widest text-on-variant/50">보안 설정 위치 비교 — 서비스별 개별 처리 vs 게이트웨이 공통 처리</span>
        </div>
        <div className="px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* AS-IS */}
          <div className="rounded-lg border border-outline-variant/20 bg-surface-low/50 p-4">
            <div className="font-space font-bold text-[0.6rem] uppercase tracking-widest text-on-variant/50 mb-3">AS-IS · 서비스별 개별 설정</div>
            <div className="space-y-1.5">
              {(['Service A VM', 'Service B VM', 'Service C VM'] as string[]).map((name) => (
                <div key={name} className="rounded border border-outline-variant/25 bg-surface-lowest/60 px-2.5 py-2">
                  <div className="font-space font-bold text-[0.55rem] text-on-surface">{name}</div>
                  <div className="font-space text-[0.45rem] text-on-variant/50 mt-0.5">SSL 인증서 개별 설정 · JWT 검증 로직 중복</div>
                </div>
              ))}
            </div>
            <div className="mt-2.5 font-space text-[0.5rem] text-on-variant/50">서비스 수만큼 설정 지점 증가 → 누락 리스크</div>
          </div>
          {/* TO-BE */}
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
            <div className="font-space font-bold text-[0.6rem] uppercase tracking-widest text-primary/70 mb-3">TO-BE · Application Gateway</div>
            <div className="rounded border border-primary/25 bg-surface-lowest/60 px-2.5 py-2">
              <div className="font-space font-bold text-[0.55rem] text-primary">Azure Application Gateway</div>
              <div className="font-space text-[0.45rem] text-on-variant/50 mt-0.5">SSL 종료 · JWT 검증 공통 처리</div>
            </div>
            <div className="flex justify-center py-1.5">
              <div className="flex flex-col items-center">
                <div className="w-px h-3 bg-primary/30" />
                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-primary/50" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {(['Service A', 'Service B', 'Service C'] as string[]).map((name) => (
                <div key={name} className="rounded border border-primary/15 bg-surface-lowest/50 px-2 py-2 text-center">
                  <div className="font-space font-bold text-[0.5rem] text-on-surface">{name}</div>
                  <div className="font-space text-[0.4rem] text-on-variant/50 mt-0.5">비즈니스 로직만</div>
                </div>
              ))}
            </div>
            <div className="mt-2.5 font-space text-[0.5rem] text-primary/60">신규 서비스는 라우팅 규칙만 추가</div>
          </div>
        </div>
      </div>
    ),
  },
];
