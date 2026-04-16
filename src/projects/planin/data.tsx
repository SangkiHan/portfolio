import type { ProjectMeta, Improvement } from '../types';

export const meta: ProjectMeta = {
  title: 'PLANIN',
  description: '캡스텍 현장 직원들이 근로계약서·서약서 등 서류를 직접 방문 없이 웹·모바일로 수신·서명·제출할 수 있도록 업무 프로세스를 개선한 현장인력 서류 관리 웹서비스입니다.',
  role: 'Backend Developer',
  period: '2022.06 ~ 2024.03',
  org: '모빌씨앤씨',
  type: 'work',
  tech: ['Java 11', 'Spring Boot', 'MySQL', 'MyBatis', 'Redis', 'Docker', 'AWS ECR'],
};

export const improvements: Improvement[] = [
  {
    title: '재직·퇴직·휴직 상태 및 계약 서류 도메인 테이블 직접 설계',
    details: [
      '근로자의 재직·퇴직·휴직 상태 이력과 계약 서류(근로계약서 등) 관리를 위한 핵심 테이블을 처음부터 직접 설계',
      '정규화 원칙을 적용해 중복 데이터를 최소화하고, 도메인 간 참조 무결성을 FK 제약으로 명시',
      '재직 상태 변경 이력은 별도 이력 테이블로 분리해 과거 시점 조회 및 감사 로그 요건 충족',
    ],
  },
  {
    title: 'ControllerAdvice 전역 예외처리 도입으로 중복 코드 90% 감소',
    metric: '중복 코드 90% 감소',
    details: [
      '각 Controller마다 try-catch로 분산되어 있던 예외 처리 로직을 @ControllerAdvice로 중앙화',
      '예외 유형별 응답 포맷 표준화 및 로깅 일관성 확보, 신규 예외 추가 시 단일 지점만 수정',
      '중복 예외 처리 코드 90% 이상 제거, 비즈니스 로직과 에러 처리 관심사 분리 달성',
    ],
  },
  {
    title: 'FileInputStream 미반납으로 인한 메모리 누수 수정',
    metric: '힙 90% 감소',
    details: [
      '서버 재시작 없이 힙 메모리가 지속 증가하는 현상 발생 → jmap -histo로 힙덤프를 분석해 원인 클래스 특정',
      '힙덤프 상위 점유 클래스: FileInputStream · FileDescriptor · byte[] — 파일 처리 로직에서 FileInputStream을 명시적으로 close하지 않아 GC되지 않고 누적됨을 확인',
      'FileDescriptor는 FileInputStream 1개당 OS fd(file descriptor)를 점유하므로 힙 누수에 더해 OS 레벨 "Too many open files" 에러로 이어질 수 있는 상태였음',
      'try-with-resources 패턴으로 전환해 스트림 자동 반납 보장, GC 후 힙 사용량 90% 감소',
      '동일 패턴의 다른 파일 처리 코드 전수 검토 및 일괄 수정으로 잠재적 누수 선제 제거',
    ],
  },
  {
    title: 'Redis multi-AZ 구성으로 Single Point of Failure 제거',
    details: [
      'Redis Single Instance 구성에서 Multi-AZ Replication + 자동 장애조치(Failover) 구성으로 전환',
      'Primary 장애 시 Replica가 자동으로 Primary로 승격, Redis 의존 기능의 가용성 보장',
      'AWS ElastiCache Multi-AZ 설정으로 별도 장애 감지 로직 없이 자동 복구 체계 구축',
    ],
  },
  {
    title: 'Apache POI 자동화로 대량 데이터 등록 수작업 90% 감소',
    metric: '수작업 90% 감소',
    details: [
      '2,000명 직원 + 200개 사업장 정보를 엑셀에서 시스템으로 등록하는 작업이 전량 수작업이었음',
      'Apache POI 기반의 엑셀 파일 파싱 + 대량 DB Insert 자동화 기능 개발',
      '기존 수 일 소요되던 초기 데이터 세팅 작업을 수 분으로 단축, 운영팀 수작업 90% 이상 감소',
      '엑셀 컬럼 유효성 검사 로직 포함으로 잘못된 데이터 업로드 시 즉시 오류 피드백 제공',
    ],
  },
];
