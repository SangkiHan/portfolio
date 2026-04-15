import type { ProjectMeta, Improvement } from '../types';

export const meta: ProjectMeta = {
  title: 'PuppyNote',
  role: 'Full Stack Developer',
  period: '2026.01 ~ 현재',
  type: 'study',
  tech: ['Java 17', 'Spring Boot 3', 'MySQL', 'Redis', 'Elasticsearch', 'Logstash', 'AWS S3', 'CloudFront'],
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
      <div className="mt-4 rounded-xl border border-dashed border-outline-variant/30 bg-surface-lowest/60 h-48 flex items-center justify-center">
        {/* TODO: Redis Write-Behind Cache 패턴 다이어그램 (요청 흐름도: API → Redis → Batch → MySQL) */}
        <span className="font-space text-[0.65rem] text-on-variant/40 uppercase tracking-widest">
          [ Write-Behind Cache 패턴 다이어그램 ]
        </span>
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
];
