import type { ProjectMeta, Improvement } from '../types';

export const meta: ProjectMeta = {
  title: 'PuppyNote',
  description: '반려동물의 건강기록, 산책, 급식, 용품 등을 관리하고 가족 구성원과 공유할 수 있는 반려동물 케어 플랫폼입니다. 서버·앱 풀스택으로 직접 개발하여 App Store에 출시한 개인 프로젝트입니다.',
  role: 'Full Stack Developer',
  period: '2026.01 ~ 현재',
  type: 'study',
  tech: ['Java 17', 'Spring Boot 3', 'MySQL', 'Redis', 'Elasticsearch', 'Logstash', 'AWS S3', 'CloudFront'],
  links: [
    { label: 'App Store', url: 'https://apps.apple.com/kr/app/puppynote/id6760515755', icon: 'appstore' },
    { label: 'GitHub', url: 'https://github.com/PuppyNote', icon: 'github' },
  ],
};

export const improvements: Improvement[] = [
  {
    title: 'Elasticsearch 도입으로 해시태그 검색 성능 12.8배 향상',
    metric: '12.8x faster',
    details: [
      'MySQL과 Elasticsearch를 1만 건 데이터셋으로 직접 벤치마크 진행',
      'MySQL Full-text 인덱싱 기준 평균 응답 957ms → Elasticsearch 평균 75ms',
      'Logstash를 통한 MySQL→Elasticsearch 자동 동기화 파이프라인 구축으로 데이터 정합성 보장',
      '해시태그 검색에 Elasticsearch inverted index 구조 활용, LIKE 쿼리 대비 압도적인 성능 확보',
    ],
    diagram: (
      <div className="mt-4 rounded-xl border border-outline-variant/10 bg-surface-lowest overflow-hidden">
        <div className="px-5 py-4">
          <div className="font-space font-bold text-[0.6rem] uppercase tracking-widest text-on-variant/50 mb-3">최종 비교 — Warm Start (1회차 콜드 스타트 제외) / 매칭 건수 10,000건</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-outline-variant/20 bg-surface-low/50 px-4 py-3">
              <div className="font-space text-[0.6rem] uppercase tracking-widest text-on-variant/50 mb-1">MySQL JOIN</div>
              <div className="font-manrope font-extrabold text-2xl text-on-surface tabular-nums">957 <span className="text-sm font-space font-bold text-on-variant/50">ms</span></div>
            </div>
            <div className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 relative overflow-hidden">
              <div className="font-space text-[0.6rem] uppercase tracking-widest text-primary/70 mb-1">Elasticsearch term query</div>
              <div className="font-manrope font-extrabold text-2xl text-primary tabular-nums">75 <span className="text-sm font-space font-bold text-primary/50">ms</span></div>
              <span className="absolute top-2 right-2 bg-primary text-primary-on font-space font-bold text-[0.55rem] px-2 py-0.5 rounded-full uppercase tracking-wider">12.8x faster</span>
            </div>
          </div>
        </div>
      </div>
    ),
    blogUrl: 'https://sangkihan.github.io/posts/mysql-vs-elasticsearch-performance/',
  },
  {
    title: 'Redis Write-Behind Cache 패턴으로 좋아요 기능 최적화',
    metric: '배치 동기화',
    details: [
      'Redis Lua 스크립트로 좋아요/취소 toggle 연산을 원자적으로 처리해 Race Condition 방지',
      '매 요청마다 MySQL에 직접 쓰는 방식에서, Redis에 실시간 반영 후 1분 주기 배치 동기화로 전환',
      'Delta 추적 방식(add set / remove set) 도입으로 배치 시 최소한의 DB 연산만 수행',
      'Redis 장애 시 DB에 직접 fallback하는 예외 처리로 가용성 보장',
    ],
    diagram: (
      <div className="mt-4 space-y-3">
        {/* 실시간 요청 흐름 */}
        <div className="rounded-xl border border-outline-variant/20 bg-surface-lowest overflow-hidden">
          <div className="px-4 py-2 bg-surface-low border-b border-outline-variant/20">
            <span className="font-space font-bold text-[0.6rem] uppercase tracking-widest text-on-variant/50">실시간 요청 흐름</span>
          </div>
          <div className="px-5 py-4 overflow-x-auto">
            <div className="flex items-center gap-2 min-w-max">
              {/* Client */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-16 h-10 rounded-lg border border-outline-variant/30 bg-surface-low flex items-center justify-center">
                  <span className="font-space font-bold text-[0.55rem] uppercase tracking-wider text-on-surface">Client</span>
                </div>
                <span className="font-space text-[0.5rem] text-on-variant/40 uppercase">POST /like</span>
              </div>
              <div className="flex flex-col items-center gap-0.5 opacity-40">
                <div className="w-6 h-px bg-primary" />
                <div className="w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[5px] border-l-primary -ml-1" />
              </div>
              {/* Cache Miss Check */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-24 h-10 rounded-lg border border-outline-variant/30 bg-surface-low flex items-center justify-center px-1 text-center">
                  <span className="font-space font-bold text-[0.5rem] uppercase tracking-tight text-on-surface leading-tight">Cache Miss?<br/>DB에서 초기화</span>
                </div>
                <span className="font-space text-[0.5rem] text-on-variant/40 uppercase">count · liked</span>
              </div>
              <div className="flex flex-col items-center gap-0.5 opacity-40">
                <div className="w-6 h-px bg-primary" />
                <div className="w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[5px] border-l-primary -ml-1" />
              </div>
              {/* Lua Script */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-28 h-10 rounded-lg border border-primary/40 bg-primary/5 flex items-center justify-center px-1 text-center">
                  <span className="font-space font-bold text-[0.5rem] uppercase tracking-tight text-primary leading-tight">Lua Script<br/>원자적 토글</span>
                </div>
                <span className="font-space text-[0.5rem] text-primary/60 uppercase">Race Condition 차단</span>
              </div>
              <div className="flex flex-col items-center gap-0.5 opacity-40">
                <div className="w-6 h-px bg-primary" />
                <div className="w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[5px] border-l-primary -ml-1" />
              </div>
              {/* Redis Keys */}
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <div className="rounded border border-outline-variant/20 bg-surface-low px-2 py-1 text-center">
                    <span className="font-space text-[0.5rem] text-on-variant/70 leading-tight block">user:liked</span>
                    <span className="font-space text-[0.45rem] text-on-variant/40">SET 0/1 + TTL</span>
                  </div>
                  <div className="rounded border border-outline-variant/20 bg-surface-low px-2 py-1 text-center">
                    <span className="font-space text-[0.5rem] text-on-variant/70 leading-tight block">like:count</span>
                    <span className="font-space text-[0.45rem] text-on-variant/40">INCR / DECR</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <div className="rounded border border-primary/20 bg-primary/5 px-2 py-1 text-center">
                    <span className="font-space text-[0.5rem] text-primary/80 leading-tight block">delta:add</span>
                    <span className="font-space text-[0.45rem] text-primary/40">SADD userId</span>
                  </div>
                  <div className="rounded border border-primary/20 bg-primary/5 px-2 py-1 text-center">
                    <span className="font-space text-[0.5rem] text-primary/80 leading-tight block">delta:remove</span>
                    <span className="font-space text-[0.45rem] text-primary/40">SADD userId</span>
                  </div>
                  <div className="rounded border border-outline-variant/30 bg-surface-low px-2 py-1 text-center">
                    <span className="font-space text-[0.5rem] text-on-variant/70 leading-tight block">dirty</span>
                    <span className="font-space text-[0.45rem] text-on-variant/40">SADD postId</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 배치 동기화 흐름 */}
        <div className="rounded-xl border border-outline-variant/20 bg-surface-lowest overflow-hidden">
          <div className="px-4 py-2 bg-surface-low border-b border-outline-variant/20 flex items-center gap-3">
            <span className="font-space font-bold text-[0.6rem] uppercase tracking-widest text-on-variant/50">배치 동기화</span>
            <span className="font-space text-[0.55rem] text-on-variant/40">@Scheduled — 1분 주기</span>
          </div>
          <div className="px-5 py-4 overflow-x-auto">
            <div className="flex items-center gap-2 min-w-max">
              {/* Scheduler */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-20 h-10 rounded-lg border border-outline-variant/30 bg-surface-low flex items-center justify-center px-1 text-center">
                  <span className="font-space font-bold text-[0.5rem] uppercase tracking-tight text-on-surface leading-tight">Scheduler<br/>1분 주기</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-0.5 opacity-40">
                <div className="w-6 h-px bg-primary" />
                <div className="w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[5px] border-l-primary -ml-1" />
              </div>
              {/* RENAME dirty */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-28 h-10 rounded-lg border border-outline-variant/30 bg-surface-low flex items-center justify-center px-1 text-center">
                  <span className="font-space font-bold text-[0.5rem] uppercase tracking-tight text-on-surface leading-tight">dirty RENAME<br/>원자적 분리</span>
                </div>
                <span className="font-space text-[0.5rem] text-on-variant/40 uppercase">처리 중 유입 손실 없음</span>
              </div>
              <div className="flex flex-col items-center gap-0.5 opacity-40">
                <div className="w-6 h-px bg-primary" />
                <div className="w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[5px] border-l-primary -ml-1" />
              </div>
              {/* popDelta */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-28 h-10 rounded-lg border border-primary/40 bg-primary/5 flex items-center justify-center px-1 text-center">
                  <span className="font-space font-bold text-[0.5rem] uppercase tracking-tight text-primary leading-tight">popDelta<br/>add / remove</span>
                </div>
                <span className="font-space text-[0.5rem] text-primary/60 uppercase">RENAME 원자적 분리</span>
              </div>
              <div className="flex flex-col items-center gap-0.5 opacity-40">
                <div className="w-6 h-px bg-primary" />
                <div className="w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[5px] border-l-primary -ml-1" />
              </div>
              {/* MySQL */}
              <div className="flex flex-col gap-1">
                <div className="rounded border border-primary/20 bg-primary/5 px-3 py-1.5 text-center">
                  <span className="font-space text-[0.5rem] text-primary/80 leading-tight block font-bold">INSERT IGNORE</span>
                  <span className="font-space text-[0.45rem] text-primary/40">like→unlike→like 중복 방지</span>
                </div>
                <div className="rounded border border-outline-variant/20 bg-surface-low px-3 py-1.5 text-center">
                  <span className="font-space text-[0.5rem] text-on-variant/70 leading-tight block font-bold">DELETE</span>
                  <span className="font-space text-[0.45rem] text-on-variant/40">취소한 userId 일괄 삭제</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-0.5 opacity-40">
                <div className="w-6 h-px bg-primary" />
                <div className="w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[5px] border-l-primary -ml-1" />
              </div>
              {/* MySQL DB */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-16 h-10 rounded-lg border border-outline-variant/30 bg-surface-low flex items-center justify-center">
                  <span className="font-space font-bold text-[0.55rem] uppercase tracking-wider text-on-surface">MySQL</span>
                </div>
                <span className="font-space text-[0.5rem] text-on-variant/40 uppercase">post_like</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    blogUrl: 'https://sangkihan.github.io/posts/redis-post-like-write-behind/',
  },
  {
    title: 'Logstash MySQL→Elasticsearch 자동 동기화 파이프라인 구축',
    details: [
      'Soft Delete 패턴(deleted_at 컬럼) 도입으로 Logstash가 삭제된 데이터를 감지해 ES에서도 동기 삭제',
      'Logstash polling_interval 30초 설정으로 근실시간 동기화 유지',
      'last_run_metadata 활용으로 Logstash 재시작 시 마지막 동기화 시점부터 자동 복구',
      '데이터 수집 관심사를 비즈니스 로직과 완전히 분리해 백엔드 코드 복잡도 최소화',
    ],
    blogUrl: 'https://sangkihan.github.io/posts/logstash-mysql-elasticsearch-sync/',
  },
  {
    title: 'GitHub Actions → AWS CodePipeline 배포 파이프라인 전환',
    details: [
      '서버 SSH 포트 외부 허용 차단으로 기존 GitHub Actions self-hosted runner 방식 배포 불가',
      'AWS CodePipeline(Source → Build → Deploy) 구조로 전환해 외부 SSH 없이 배포 가능하도록 재구성',
      'CodeBuild에서 Jar 빌드 후, CodeDeploy로 EC2에 무중단 배포까지 자동화',
    ],
  },
];
