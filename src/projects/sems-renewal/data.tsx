import type { ProjectMeta, Improvement } from '../types';
import asIsWhite from '../../assets/renewal-sems/as_is_datapipeline_white.png';
import asIsDark from '../../assets/renewal-sems/as_is_datapipeline_dark.png';
import toBeWhite from '../../assets/renewal-sems/to_be_datapipeline_white.png';
import toBeDark from '../../assets/renewal-sems/to_be_datapipeline_dark.png';
import { ZoomImage } from '../../components/shared/ZoomImage';

export const meta: ProjectMeta = {
  title: '리뉴얼 SEMS (GS25 편의점 관제 시스템)',
  description: '기존 SEMS의 앱과 웹을 Azure 환경으로 이전하고 프로젝트 구조를 전면 개선한 프로젝트입니다. GS25·GSFRESH 점포의 냉장비, 냉난방, 간판, 조명 전력량을 주기적으로 수집·관제합니다.',
  role: 'Backend Developer',
  period: '2025.05 ~ 현재',
  org: '티앤엠테크',
  type: 'work',
  tech: ['Java 17', 'Spring Boot 3', 'PostgreSQL', 'MongoDB', 'Kafka', 'Azure', 'Prometheus', 'Grafana', 'Docker'],
};

export const improvements: Improvement[] = [
  {
    title: 'PostgreSQL 파티셔닝으로 날씨 예보 데이터 쿼리 11배 향상',
    metric: '11x faster',
    details: [
      '600만 건 규모의 날씨 예보 테이블에 report_dttm 기준 월별 Range Partitioning 적용',
      '파티션 프루닝(Partition Pruning)으로 쿼리 시 불필요한 파티션 스캔 완전 제거',
      'pg_partman 확장 모듈로 매월 자동 파티션 생성 및 6개월 이상 오래된 파티션 자동 삭제',
      '쿼리 응답시간 10s → 900ms (약 11배 향상), 각 파티션에 독립 인덱스 생성으로 추가 최적화',
    ],
    diagram: (
      <div className="mt-4 rounded-xl border border-outline-variant/10 bg-surface-lowest overflow-hidden">
        <div className="px-5 py-4">
          <div className="font-space font-bold text-[0.6rem] uppercase tracking-widest text-on-variant/50 mb-3">파티셔닝 적용 전후 쿼리 응답시간 비교 — 600만 건 날씨 예보 테이블</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-outline-variant/20 bg-surface-low/50 px-4 py-3">
              <div className="font-space text-[0.6rem] uppercase tracking-widest text-on-variant/50 mb-1">파티셔닝 없음</div>
              <div className="font-manrope font-extrabold text-2xl text-on-surface tabular-nums">10 <span className="text-sm font-space font-bold text-on-variant/50">s</span></div>
            </div>
            <div className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 relative overflow-hidden">
              <div className="font-space text-[0.6rem] uppercase tracking-widest text-primary/70 mb-1">Range Partitioning</div>
              <div className="font-manrope font-extrabold text-2xl text-primary tabular-nums">900 <span className="text-sm font-space font-bold text-primary/50">ms</span></div>
              <span className="absolute top-2 right-2 bg-primary text-primary-on font-space font-bold text-[0.55rem] px-2 py-0.5 rounded-full uppercase tracking-wider">11x faster</span>
            </div>
          </div>
        </div>
      </div>
    ),
    blogUrl: 'https://sangkihan.github.io/posts/postgresql-partitioning/',
  },
  {
    title: '데이터 유실 방지를 위한 Kafka 기반 데이터 파이프라인 구축',
    metric: '17,000 devices',
    details: [
      '17,000개 IoT 디바이스의 5분 간격 데이터를 처리하던 Azure Function App을 Kafka로 대체',
      '6개 파티션 / Consumer 그룹당 3개 Concurrency 구성으로 17,000건 메시지 처리',
      'rowKey를 MongoDB _id로 사용한 idempotent upsert 구현으로 중복 메시지 처리 보장',
      'KRaft 모드(ZooKeeper 없는 Kafka)로 운영 복잡도 감소, 배치 처리 방식에서 실시간 스트리밍으로 전환',
      '오류 발생 시 오류 메시지를 별도 Kafka 토픽에 저장해 재처리 및 원인 분석 용이성 확보',
    ],
    diagram: (
      <div className="mt-4 flex flex-col gap-4">
        {/* AS-IS */}
        <div className="rounded-xl border border-outline-variant/20 overflow-hidden">
          <div className="px-4 py-2 bg-surface-low border-b border-outline-variant/20 flex items-center gap-2">
            <span className="font-space font-bold text-[0.6rem] uppercase tracking-widest text-on-variant/50">AS-IS</span>
            <span className="font-space text-[0.6rem] text-on-surface">Function App 오류 시 데이터 유실 · 5분 배치 시간차 · 오류 시 사용자 불편</span>
          </div>
          <div className="bg-surface-lowest">
            <ZoomImage src={asIsWhite} alt="AS-IS 데이터 파이프라인" className="w-full h-auto block dark:hidden" />
            <ZoomImage src={asIsDark} alt="AS-IS 데이터 파이프라인" className="w-full h-auto hidden dark:block" />
          </div>
        </div>
        {/* TO-BE */}
        <div className="rounded-xl border border-primary/20 overflow-hidden">
          <div className="px-4 py-2 bg-primary/5 border-b border-primary/10 flex items-center gap-2">
            <span className="font-space font-bold text-[0.6rem] uppercase tracking-widest text-primary/70">TO-BE</span>
            <span className="font-space text-[0.6rem] text-on-surface">Kafka 기반 실시간 스트리밍 · 재처리 보장 · 데이터 유실 없음</span>
          </div>
          <div className="bg-surface-lowest">
            <ZoomImage src={toBeWhite} alt="TO-BE 데이터 파이프라인" className="w-full h-auto block dark:hidden" />
            <ZoomImage src={toBeDark} alt="TO-BE 데이터 파이프라인" className="w-full h-auto hidden dark:block" />
          </div>
        </div>
      </div>
    ),
    blogUrl: 'https://sangkihan.github.io/posts/kafka-gateway-architecture/',
  },
  {
    title: 'Azure Function App 다운스케일로 월 인프라 비용 37% 절감',
    metric: '월 140만원 절감',
    details: [
      'Azure Function App의 실제 CPU 사용률이 3~5%에 불과함에도 EP3(4 vCPU) 인스턴스 유지 중임을 발견',
      'EP3 → EP1(1 vCPU)으로 다운스케일 후 동일한 처리 성능 유지 확인',
      '월 약 140만원(연 약 1,680만원) 비용 절감, 전체 인프라 비용 대비 37% 절감 효과',
      '다운스케일 전 부하 테스트를 통해 피크 트래픽 처리 가능 여부 사전 검증',
    ],
    blogUrl: 'https://sangkihan.github.io/posts/azure-function-cost-optimization/',
  },
  {
    title: '30억 건 데이터 마이그레이션 최적화 — 하루치 배치 30분 → 2분',
    metric: '15x faster',
    details: [
      '점포 5분 단위 전력·온도 데이터 약 30억 건을 MySQL에서 MongoDB로 이관',
      '하루치 데이터 기준 단순 순차 처리 30분 소요 → 청킹(10,000건 단위) + 병렬 스트림 처리로 2분 단축',
      'ThreadPoolExecutor 기반 비동기 처리 및 MongoDB 비동기 insertMany로 I/O 대기 시간 최소화',
      '청킹으로 메모리 OOM 방지, 비동기 처리로 CPU 유휴시간 제거해 5배(청킹)×3배(비동기) 복합 향상',
    ],
    diagram: (
      <div className="mt-4 rounded-xl border border-outline-variant/10 bg-surface-lowest overflow-hidden">
        <div className="px-5 py-4">
          <div className="font-space font-bold text-[0.6rem] uppercase tracking-widest text-on-variant/50 mb-3">배치 처리 시간 비교 — 하루치 데이터 기준 / 전체 30억 건 이관</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-outline-variant/20 bg-surface-low/50 px-4 py-3">
              <div className="font-space text-[0.6rem] uppercase tracking-widest text-on-variant/50 mb-1">순차 처리</div>
              <div className="font-manrope font-extrabold text-2xl text-on-surface tabular-nums">30 <span className="text-sm font-space font-bold text-on-variant/50">min</span></div>
            </div>
            <div className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 relative overflow-hidden">
              <div className="font-space text-[0.6rem] uppercase tracking-widest text-primary/70 mb-1">청킹 + 병렬 처리</div>
              <div className="font-manrope font-extrabold text-2xl text-primary tabular-nums">2 <span className="text-sm font-space font-bold text-primary/50">min</span></div>
              <span className="absolute top-2 right-2 bg-primary text-primary-on font-space font-bold text-[0.55rem] px-2 py-0.5 rounded-full uppercase tracking-wider">15x faster</span>
            </div>
          </div>
        </div>
      </div>
    ),
    blogUrl: 'https://sangkihan.github.io/posts/db-migration/',
  },
  {
    title: 'MySQL → MongoDB 이관으로 5분 단위 데이터 조회 API 40배 개선',
    metric: '40x faster',
    details: [
      'th_str_chn_elec_use_base · th_str_rems_device_base · th_str_sensor_base 3개 테이블에 분산 저장되던 기기별 전력·온도 데이터를 하나의 Document로 통합',
      'Collection 명을 YYYYMMDD 날짜 단위로 구성해 하루치 데이터를 Collection 단위로 분리, 조회 범위 최소화',
      '조회 API 응답시간 8s → 200ms (약 40배 향상)',
    ],
    diagram: (
      <div className="mt-4 space-y-3">
        {/* Schema Migration Visual */}
        <div className="rounded-xl border border-outline-variant/10 bg-surface-lowest overflow-hidden">
          <div className="px-4 py-2 bg-surface-low border-b border-outline-variant/10">
            <span className="font-space font-bold text-[0.6rem] uppercase tracking-widest text-on-variant/50">스키마 재설계 — 3개 MySQL 테이블 → YYYYMMDD Collection</span>
          </div>
          <div className="px-6 py-5 overflow-x-auto">
            <div className="flex items-center min-w-max">
              {/* MySQL Tables */}
              <div className="flex flex-col gap-2">
                {([
                  { name: 'th_str_chn_elec_use_base', desc: '전력 사용량' },
                  { name: 'th_str_rems_device_base',  desc: '기기 상태' },
                  { name: 'th_str_sensor_base',        desc: '센서·온도' },
                ] as { name: string; desc: string }[]).map(({ name, desc }) => (
                  <div key={name} className="rounded-lg border border-outline-variant/30 bg-surface-low px-3 py-2 w-52">
                    <div className="font-space font-bold text-[0.55rem] text-on-surface leading-tight">{name}</div>
                    <div className="font-space text-[0.45rem] text-on-variant/50 mt-0.5">{desc}</div>
                  </div>
                ))}
              </div>
              {/* Bracket + Arrow connector */}
              <div className="flex" style={{ alignSelf: 'stretch' }}>
                <div className="flex flex-col w-5" style={{ alignSelf: 'stretch' }}>
                  <div className="flex-1 border-t-2 border-r-2 border-primary/40 rounded-tr-xl" />
                  <div className="flex-1 border-b-2 border-r-2 border-primary/40 rounded-br-xl" />
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-0.5 bg-primary/50" />
                  <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[5px] border-l-primary/60" />
                </div>
              </div>
              {/* MongoDB Collection */}
              <div className="rounded-xl border border-primary/40 bg-primary/5 overflow-hidden">
                <div className="px-4 py-1.5 bg-primary/10 border-b border-primary/20 flex items-center gap-2">
                  <span className="font-space font-bold text-[0.55rem] text-primary/80 uppercase tracking-widest">MongoDB</span>
                  <span className="font-space text-[0.5rem] text-primary/50">Collection: YYYYMMDD</span>
                </div>
                <div className="px-4 py-3">
                  <div className="rounded-lg border border-primary/20 bg-surface-lowest/50 px-3 py-2.5">
                    <div className="font-space font-bold text-[0.5rem] text-primary/60 uppercase tracking-widest mb-2">Document (1개)</div>
                    <div className="space-y-1.5">
                      {([
                        { label: '전력 사용량', src: 'chn_elec_use' },
                        { label: '기기 상태',  src: 'rems_device'  },
                        { label: '센서·온도', src: 'sensor'        },
                      ] as { label: string; src: string }[]).map(({ label, src }) => (
                        <div key={src} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                          <span className="font-space font-bold text-[0.5rem] text-primary/70">{label}</span>
                          <span className="font-space text-[0.45rem] text-primary/40">← th_str_{src}_base</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Document 구조 예시 */}
        <details className="rounded-xl border border-outline-variant/15 overflow-hidden">
          <summary className="px-4 py-2.5 bg-surface-low border-b border-outline-variant/10 cursor-pointer select-none flex items-center justify-between list-none">
            <span className="font-space font-bold text-[0.6rem] uppercase tracking-widest text-on-variant/60">Document 구조 예시 — 3개 테이블 통합 결과</span>
            <svg className="w-3.5 h-3.5 text-on-variant/40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="bg-surface-lowest overflow-x-auto">
            <pre className="px-5 py-4 font-space text-[0.6rem] text-on-variant/70 leading-relaxed">{`{
  "_id": { "$oid": "507f1f77bcf86cd799439011" },
  "PartitionKey": "20260416T0000",
  "RowKey": "10001_20260416T000313_a1b2c3d4",
  "payload": {
    "gateway_id": "10001",
    "site_id": "GS5010001",
    "report_datetime": "2026-04-16T00:00:00.000Z",
    "report_info_list": [
      {
        "device_id": "04003",
        "facility_code": "PWR_MAIN",
        "properties": {
          "power_use_accum":     { "value": 358174581, "status": 1 },
          "power_use_current":   { "value": 4638,      "status": 1 },
          "power_5min_use_accum":{ "value": 365,       "status": 1 }
        }
      },
      {
        "device_id": "1B2",
        "facility_code": "CL_WIC",
        "properties": {
          "device_temp": { "value": 750, "status": 1 }
        }
      }
    ],
    "device_values": {
      "power_usage":    { "main": 358174581, "hvac": 44051383, "sign": 1 },
      "power_5min_usage":{ "main": 365, "hvac": 0, "sign": 0 },
      "device_temp": {
        "CL_WIC":    { "min": 750,   "max": 750   },
        "FRZ_RIF":   { "min": -1790, "max": -1790 }
      }
    }
  },
  "message_datetime": "2026-04-16T00:03:13.018Z"
}`}</pre>
          </div>
        </details>
        {/* Speed comparison */}
        <div className="rounded-xl border border-outline-variant/10 bg-surface-lowest overflow-hidden">
          <div className="px-5 py-4">
            <div className="font-space font-bold text-[0.6rem] uppercase tracking-widest text-on-variant/50 mb-3">5분 단위 전력·온도 데이터 조회 API 응답시간 비교</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-outline-variant/20 bg-surface-low/50 px-4 py-3">
                <div className="font-space text-[0.6rem] uppercase tracking-widest text-on-variant/50 mb-1">MySQL</div>
                <div className="font-manrope font-extrabold text-2xl text-on-surface tabular-nums">8 <span className="text-sm font-space font-bold text-on-variant/50">s</span></div>
              </div>
              <div className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 relative overflow-hidden">
                <div className="font-space text-[0.6rem] uppercase tracking-widest text-primary/70 mb-1">MongoDB</div>
                <div className="font-manrope font-extrabold text-2xl text-primary tabular-nums">200 <span className="text-sm font-space font-bold text-primary/50">ms</span></div>
                <span className="absolute top-2 right-2 bg-primary text-primary-on font-space font-bold text-[0.55rem] px-2 py-0.5 rounded-full uppercase tracking-wider">40x faster</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Prometheus + Grafana 서버 VM 모니터링 구축',
    details: [
      'Node Exporter로 Azure VM 리소스(CPU, 메모리, 디스크, 네트워크) 메트릭 수집',
      'JVM 힙 메모리 80% 임계값 초과 시 5분 대기 후 Slack 알림 발송 (jvm_gc_live_data_size_bytes 기준)',
      'Azure Load Balancer Health Probe와 연동하여 각 VM 상태를 실시간 모니터링, 비정상 노드를 자동으로 트래픽 대상에서 제외',
      'Prometheus HA 구성으로 모니터링 단일 장애점 제거, Grafana 대시보드로 서버 상태 통합 시각화',
    ],
    blogUrl: 'https://sangkihan.github.io/posts/prometheus-grafana-monitoring/',
  },
  {
    title: 'Kafka Consumer Lag 모니터링 구축',
    details: [
      'Java Agent 방식의 JMX Exporter 도입으로 Kafka 브로커 메트릭(처리량, 파티션 오프셋) 수집',
      'kafka-exporter로 Consumer Lag 실시간 추적, 컨슈머 그룹별 처리 지연 시각화',
      'Grafana 대시보드에서 브로커 처리량·파티션 오프셋·Consumer Lag을 통합 모니터링해 병목 조기 감지',
    ],
    blogUrl: 'https://sangkihan.github.io/posts/kafka-grafana-monitoring/',
  },
];
