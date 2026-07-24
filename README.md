# ComfortableUX

> "고객님을 위한 편안한 경험" — 실제로 있을 법한 앱/웹 화면을 그대로 재현하되,
> 그 안에 보안 취약점 또는 UX 다크패턴을 하나씩 숨겨 넣은 인스타그램 릴스용 모바일 UI 목업 시리즈.

"Comfortable"이라는 이름 자체가 반어법이다 — 멀쩡해 보이는 화면일수록 더 크게 뒤통수를 친다.

## 기술 스택

| 영역 | 선택 | 이유 |
|---|---|---|
| 프레임워크 | **Next.js (App Router) + TypeScript** | 국내외 프론트엔드 채용공고에서 가장 많이 요구하는 표준 조합. 포트폴리오에 그대로 명시 가능 |
| 스타일링 | **Tailwind CSS** | 빠른 반복 작업에 유리하고, 실무 표준 |
| 모션 | **Framer Motion** | 화면 전환/제스처(스와이프 등) 구현에 사실상 표준 |
| 상태 관리 | **React 기본 훅** (useState/useReducer) | 이 규모에 Zustand/Redux는 오버엔지니어링 |
| 패키지 매니저 | **pnpm** | 현업 점유율 상승 중, 표준 도구 |
| 배포 | **Vercel** | Next.js와 궁합이 가장 좋고, 프리뷰 링크를 폰으로 바로 열어 녹화하기 좋음 |

### 왜 Astro/shadcn 조합이 아닌가

참고 레퍼런스(yeol.dev의 chadcn-ui)는 Astro를 쓰지만, 그건 "정적인 카탈로그 페이지에 인터랙션
조각만 군데군데 얹는" 용도(아일랜드 아키텍처)에 강점이 있는 도구라 그렇다. ComfortableUX는
반대로 화면 전체가 상태머신 + 애니메이션으로 돌아가는 완전히 인터랙티브한 앱 시뮬레이션이라
아일랜드 아키텍처의 이점이 거의 없다. 대신 shadcn/ui 자체(컴포넌트 프리미티브)는 필요하면
Next.js 위에 그대로 얹을 수 있다.

### 왜 에피소드별 레포 분리가 아닌가

`PhoneFrame`, `IntroBanner`, `SubtitleOverlay` 같은 공통 컴포넌트를 에피소드마다 복붙하지 않고
재사용하기 위해 단일 레포 + 라우트 분리(`/episode-1`, `/episode-2`, ...) 구조를 쓴다. 배포도
Vercel 프로젝트 하나로 관리되고, 릴스 공유 링크도 경로만 다르게 주면 충분히 짧다. 특정 에피소드가
완전히 다른 스택이 필요할 정도로 커지면 그때 개별 레포로 분리한다.

## 프로젝트 구조

```
app/
  layout.tsx           # 메타데이터, 폰트, 전역 배경
  page.tsx             # 시리즈 런처 (에피소드 목록)
  episode-1/
    page.tsx           # 에피소드별 상태머신 (화면 전환 orchestration)
    _components/       # 해당 에피소드 전용 컴포넌트 (재사용 안 함)
  episode-2/
    ...
components/
  ui/                  # 여러 에피소드에서 재사용하는 컴포넌트
    PhoneFrame.tsx      # 390x844 고정 폰 프레임 컨테이너
    IntroBanner.tsx      # "ComfortableUX Presents" 스플래시 배너
    SubtitleOverlay.tsx  # 에피소드 마지막 화면 자막 placeholder
```

## 컨벤션

- **모바일 전용**: 390×844(iPhone 기준) 고정 뷰포트. 데스크톱 반응형 없음. `max-w-[390px] mx-auto` 폰 프레임 안에서만 렌더링
- **상태바/노치 재현 안 함**: 앱 콘텐츠 영역(네비게이션 바 + 본문)에만 집중
- **각 에피소드 시작**: 스플래시 배너 슬롯 — "ComfortableUX Presents: [코드네임]" + 가짜 마케팅 카피
- **각 에피소드 마지막**: 하단 자막 placeholder 슬롯 — 편집 시 "OWASP Top 10 중 [카테고리]" 등 텍스트 삽입용
- **백엔드 없음**: 프론트 상태값(useState/useReducer)만으로 인터랙션 동작. 실서비스 배포용 아님

## 에피소드

| 코드네임 | 앱 | 소재 | 상태 |
|---|---|---|---|
| NOSY | Comfortable Bank | 이체확인증 ID만 바꾸면 남의 계좌가 보이는 IDOR (OWASP A01) | 예정 |
| ROACH | Comfortable Fit | 구독 해지 버튼을 찾아 떠나는 로치모텔 다크패턴 | 구상 중 |
| SHADOW | Comfortable Talk | 삭제한 메시지가 실제론 서버에 남아있는 문제 | 구상 중 |
