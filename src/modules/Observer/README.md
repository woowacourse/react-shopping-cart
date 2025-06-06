# Observer

## 개요

`Observer` 모듈은 옵저버(Observer) 패턴을 간단하게 구현한 유틸리티입니다.\
상태 변화나 이벤트 발생 시 여러 리스너(구독자)에게 알림을 전달할 수 있도록 도와줍니다.\
주로 전역 상태 관리, 데이터 변경 알림, 커스텀 이벤트 시스템 등에 활용할 수 있습니다.

## 주요 특징

1. **간단한 구독/알림 구조**  
   - 리스너(함수)를 등록(add)하고, 필요 시 해제(remove)할 수 있습니다.
   - `notify()`를 호출하면 등록된 모든 리스너에 알림이 전달됩니다.

2. **경량 구현**  
   - 불필요한 의존성 없이 최소한의 코드로 동작합니다.

3. **다양한 활용**  
   - 상태 관리, 데이터 스토어, 커스텀 이벤트 등 다양한 곳에 적용할 수 있습니다.

## 사용법

### 1. 옵저버 생성 및 리스너 등록

```ts
import { Observer } from "@/modules/Observer";

const observer = new Observer();

function listener() {
  console.log("변경이 감지됨!");
}

observer.add(listener); // 리스너 등록
```

### 2. 알림 보내기

```ts
observer.notify(); // 모든 리스너가 호출됨
```

### 3. 리스너 해제

```ts
observer.remove(listener); // 리스너 해제
```

## 타입

- `Listener`: () => void
- `Observer`: add(listener), remove(listener), notify()

## 주의사항

- 동일한 리스너를 여러 번 등록하면 중복 호출될 수 있습니다.
- 등록된 리스너는 반드시 필요할 때만 해제(remove)하세요(메모리 누수 방지).
- Observer 인스턴스는 독립적으로 동작합니다(전역 싱글턴 아님).

