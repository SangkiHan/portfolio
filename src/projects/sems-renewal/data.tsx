import { ServiceGroup, ForkArrow } from '../../components/Architecture';
import type { ProjectMeta, Improvement } from '../types';
import asIsWhite from '../../assets/renewal-sems/as_is_datapipeline_white.png';
import asIsDark from '../../assets/renewal-sems/as_is_datapipeline_dark.png';
import toBeWhite from '../../assets/renewal-sems/to_be_datapipeline_white.png';
import toBeDark from '../../assets/renewal-sems/to_be_datapipeline_dark.png';

export const meta: ProjectMeta = {
  title: '리뉴얼 SEMS (GS25 편의점 관제 시스템)',
  role: 'Backend Developer',
  period: '2025.05 ~ 현재',
  org: '티앤엠테크',
  type: 'work',
  tech: ['Java 17', 'Spring Boot 3', 'PostgreSQL', 'MongoDB', 'Kafka', 'Azure', 'Prometheus', 'Grafana', 'Docker'],
};

export const improvements: Improvement[] = [
  {
    title: 'PostgreSQL 파티셔닝으로 날씨 예보 데이터 쿼리 13.6배 향상',
    metric: '13.6x faster',
    details: [
      '600만 건 규모의 날씨 예보 테이블에 report_dttm 기준 월별 Range Partitioning 적용',
      '파티션 프루닝(Partition Pruning)으로 쿼리 시 불필요한 파티션 스캔 완전 제거',
      'pg_partman 확장 모듈로 매월 자동 파티션 생성 및 6개월 이상 오래된 파티션 자동 삭제',
      '쿼리 응답시간 12,857ms → 945ms (13.6배 향상), 각 파티션에 독립 인덱스 생성으로 추가 최적화',
    ],
    blogUrl: 'https://sangkihan.github.io/posts/postgresql-partitioning/',
  },
  {
    title: '데이터 유실 방지를 위한 Kafka 기반 데이터 파이프라인 구축',
    metric: '17,000 devices',
    details: [
      '17,000개 IoT 디바이스의 5분 간격 데이터를 처리하던 Azure Function App을 Kafka로 대체',
      '6개 파티션 / 3개 컨슈머 구성으로 17,000건 메시지 처리',
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
            <img src={asIsWhite} alt="AS-IS 데이터 파이프라인" className="w-full h-auto block dark:hidden" />
            <img src={asIsDark} alt="AS-IS 데이터 파이프라인" className="w-full h-auto hidden dark:block" />
          </div>
        </div>
        {/* TO-BE */}
        <div className="rounded-xl border border-primary/20 overflow-hidden">
          <div className="px-4 py-2 bg-primary/5 border-b border-primary/10 flex items-center gap-2">
            <span className="font-space font-bold text-[0.6rem] uppercase tracking-widest text-primary/70">TO-BE</span>
            <span className="font-space text-[0.6rem] text-on-surface">Kafka 기반 실시간 스트리밍 · 재처리 보장 · 데이터 유실 없음</span>
          </div>
          <div className="bg-surface-lowest">
            <img src={toBeWhite} alt="TO-BE 데이터 파이프라인" className="w-full h-auto block dark:hidden" />
            <img src={toBeDark} alt="TO-BE 데이터 파이프라인" className="w-full h-auto hidden dark:block" />
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
    title: '3.5억 건 데이터 마이그레이션 최적화 (30분 → 2분)',
    metric: '15x faster',
    details: [
      '시간별 집계 데이터를 5분 단위 데이터로 마이그레이션하는 작업, 약 3.5억 건 규모',
      '단순 순차 처리 기준 시간당 배치 30분 소요 → 청킹(10,000건 단위) + 병렬 스트림 처리로 2분 단축',
      'ThreadPoolExecutor 기반 비동기 처리 및 MongoDB 비동기 insertMany로 I/O 대기 시간 최소화',
      '청킹으로 메모리 OOM 방지, 비동기 처리로 CPU 유휴시간 제거해 5배(청킹)×3배(비동기) 복합 향상',
    ],
    blogUrl: 'https://sangkihan.github.io/posts/db-migration/',
  },
  {
    title: 'Prometheus + Grafana 서버 VM 모니터링 구축',
    details: [
      'Node Exporter로 Azure VM 리소스(CPU, 메모리, 디스크, 네트워크) 메트릭 수집',
      'JVM 힙 메모리 80% 임계값 초과 시 5분 대기 후 Slack 알림 발송 (jvm_gc_live_data_size_bytes 기준)',
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
