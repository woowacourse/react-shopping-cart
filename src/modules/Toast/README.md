# Toast

## 개요

`Toast` 모듈은 React 앱에서 성공/에러 등 간단한 알림 메시지를 화면 상단에 띄우는 기능을 제공합니다.  
Provider 기반의 Context로 구현되어, 어디서든 간편하게 토스트 메시지를 호출할 수 있습니다.

## 주요 특징

1. **Provider 기반 전역 토스트**

   - `ToastProvider`로 앱을 감싸면, 하위 컴포넌트 어디서든 토스트를 띄울 수 있습니다.

2. **간단한 사용법**

   - `useToast` 훅을 통해 `showToast` 함수로 메시지와 타입만 넘기면 됩니다.

3. **자동 사라짐 및 수동 닫기**

   - 기본 3초 후 자동으로 사라지며, 닫기 버튼으로 즉시 닫을 수도 있습니다.

4. **커스텀 스타일**
   - 테마 색상, 위치, 애니메이션 등 프로젝트 스타일에 맞게 커스터마이즈되어 있습니다.

## 사용법

### 1. ToastProvider로 앱 감싸기

```tsx
import ToastProvider from "@/modules/Toast";

function Root() {
  return (
    <ToastProvider>
      <App />
    </ToastProvider>
  );
}
```

### 2. 토스트 띄우기 (컴포넌트 내부)

```tsx
import { useToast } from "@/modules/Toast";

function MyComponent() {
  const { showToast } = useToast();

  const handleClick = () => {
    showToast({
      message: "저장되었습니다!",
      variant: "success", // 또는 "error"
      duration: 2000, // (선택) ms 단위, 기본 3000
    });
  };

  return <button onClick={handleClick}>알림 띄우기</button>;
}
```

- `variant`: "success" | "error"
- `message`: 표시할 문자열
- `duration`: (선택) 표시 시간(ms), 기본 3000

### 3. 토스트 닫기

- 토스트 우측 상단의 × 버튼을 누르면 즉시 닫힙니다.

## 타입

- `ToastVariant`: "success" | "error"
- `showToast({ message, variant, duration? })`

## 주의사항

- 반드시 `<ToastProvider>`로 앱을 감싸야 하위에서 `useToast`를 사용할 수 있습니다.
- 너무 많은 토스트를 동시에 띄우지 않도록 주의하세요.
- 메시지 길이가 너무 길면 UI가 깨질 수 있습니다.
