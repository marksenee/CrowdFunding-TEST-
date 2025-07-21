# TechFunding - 기술 판매와 기술 후원 서비스 플랫폼

기술 창작자와 후원자를 연결하는 현대적인 웹 플랫폼입니다.

## 🚀 주요 기능

### 사용자 기능

- **카카오/깃허브 로그인**: 간편한 소셜 로그인
- **프로젝트 후원**: 500원 고정 금액으로 프로젝트 후원
- **제품 구매**: 완성된 제품 구매
- **카테고리별 탐색**: 앱/서비스, 노션 템플릿, 슬라이드/제안서, 자동화툴, 디자인 리소스

### 창작자 기능

- **프로젝트 등록**: 후원받을 프로젝트 등록
- **제품 등록**: 완성된 제품 판매 등록
- **실시간 현황**: 후원 현황 및 정산 관리
- **로드맵 관리**: 프로젝트 진행 상황 관리

### 관리 기능

- **심사 시스템**: 프로젝트 검토 및 승인
- **정산 관리**: 후원금 정산 처리
- **알림 시스템**: 실시간 알림 서비스

## 🛠 기술 스택

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Forms**: React Hook Form
- **Build Tool**: Create React App

## 📦 설치 및 실행

### 필수 요구사항

- Node.js 16.0.0 이상
- npm 8.0.0 이상

### 설치

```bash
# 저장소 클론
git clone <repository-url>
cd crowd-funding

# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
npm run build
```

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── Header.tsx      # 헤더 컴포넌트
│   ├── Footer.tsx      # 푸터 컴포넌트
│   └── Layout.tsx      # 레이아웃 컴포넌트
├── pages/              # 페이지 컴포넌트
│   ├── Home.tsx        # 메인 페이지
│   ├── CreateProject.tsx # 프로젝트 등록 페이지
│   ├── CreateProduct.tsx # 제품 등록 페이지
│   └── ProjectDetail.tsx # 프로젝트 상세 페이지
├── types/              # TypeScript 타입 정의
│   └── index.ts        # 공통 타입 정의
├── hooks/              # 커스텀 훅
├── utils/              # 유틸리티 함수
└── App.tsx             # 메인 앱 컴포넌트
```

## 🎨 UI/UX 특징

### 디자인 시스템

- **색상**: Primary Blue (#3B82F6), Secondary Gray (#64748B)
- **타이포그래피**: Inter 폰트 패밀리
- **컴포넌트**: 일관된 버튼, 카드, 입력 필드 디자인

### 반응형 디자인

- **모바일 우선**: 모바일부터 데스크톱까지 최적화
- **그리드 시스템**: Tailwind CSS 그리드 활용
- **접근성**: 키보드 네비게이션 및 스크린 리더 지원

### 사용자 경험

- **직관적 네비게이션**: 명확한 메뉴 구조
- **실시간 미리보기**: 제품 등록 시 실시간 미리보기
- **진행률 표시**: 후원 진행률 시각화
- **로딩 상태**: 사용자 피드백을 위한 로딩 상태

## 🔧 주요 컴포넌트

### Header 컴포넌트

- 로고 및 브랜딩
- 검색 기능
- 카테고리 네비게이션
- 사용자 메뉴 (로그인/회원가입, 프로필)
- 모바일 반응형 햄버거 메뉴

### Home 페이지

- **배너 섹션**: 캐러셀 형태의 메인 배너
- **카테고리 섹션**: 5개 카테고리 카드
- **프로젝트 섹션**: 인기 프로젝트 그리드
- **진행률 표시**: 각 프로젝트의 후원 진행률

### CreateProject 페이지

- **단계별 폼**: 기본 정보 → 이미지 → MVP → 로드맵 → 리워드
- **이미지 업로드**: 드래그 앤 드롭 지원
- **동적 폼**: 로드맵과 리워드 동적 추가/삭제
- **임시저장**: 작업 중인 내용 임시저장

### CreateProduct 페이지

- **실시간 미리보기**: 입력과 동시에 미리보기 업데이트
- **이미지 갤러리**: 다중 이미지 업로드
- **전달 방식 선택**: 파일/링크/메일 전송 옵션
- **가격 설정**: 숫자 입력 필드

## 🚀 향후 개발 계획

### Phase 1 (현재)

- ✅ 기본 UI/UX 구현
- ✅ 라우팅 설정
- ✅ 컴포넌트 구조화

### Phase 2 (다음)

- 🔄 백엔드 API 연동
- 🔄 인증 시스템 구현
- 🔄 결제 시스템 연동

### Phase 3 (향후)

- 📋 실시간 알림 시스템
- 📋 채팅 기능
- 📋 리뷰 및 평점 시스템

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해주세요.

---

**TechFunding** - 기술 창작자와 후원자를 연결하는 플랫폼
