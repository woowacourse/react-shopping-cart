# Query

## 개요

`Query` 모듈은 React 환경에서 서버 데이터의 비동기 fetch, 캐싱, 상태 관리, mutation(쓰기/갱신) 등을 간편하게 처리할 수 있도록 도와주는 커스텀 훅 집합입니다.\
React Query의 핵심 패턴을 간단하게 구현하여, 데이터 요청/갱신/에러/로딩 상태를 일관되게 관리할 수 있습니다.

## 주요 특징

1. **데이터 Fetch 및 캐싱**  
   - `useQuery` 훅을 통해 서버 데이터를 가져오고, 동일 쿼리 키로 캐싱합니다.
   - 자동 재요청(5분마다) 및 수동 refetch 지원.

2. **상태 관리**  
   - 각 쿼리별로 `idle`, `loading`, `success`, `error` 상태를 관리합니다.
   - `useQueryStatus`, `useQueryData`로 상태/데이터 구독 가능.

3. **Mutation(쓰기/갱신) 지원**  
   - `useMutation` 훅을 통해 POST/PUT/PATCH/DELETE 등 서버 데이터 변경 작업을 수행할 수 있습니다.
   - 요청 전후/성공/실패 콜백 지원.

4. **Promise 중복 방지**  
   - 동일 쿼리 키로 중복 fetch 요청 시, 기존 Promise를 재사용하여 네트워크 낭비를 막습니다.

## 사용법

### 1. useQuery

```tsx
import { useQuery } from "@/modules/Query";

const { data, status, refetch } = useQuery({
  queryKey: "user",
  queryFn: () => fetchUser(), // Promise 반환 함수
  initialData: { name: "Guest" }, // (선택) 초기 데이터
});
```

- `data`: 쿼리 결과 데이터
- `status`: "idle" | "loading" | "success" | "error"
- `refetch()`: 강제 재요청

### 2. useMutation

```tsx
import { useMutation } from "@/modules/Query";

const { mutate, status } = useMutation({
  mutationFn: (variables) => updateUser(variables), // Promise 반환 함수
  onSuccess: () => alert("성공!"),
  onError: (e) => alert("에러 발생"),
});

mutate({ name: "new name" });
```

- `mutate(variables, options)`: 서버에 데이터 변경 요청
- `status`: "idle" | "loading" | "success" | "error"

### 3. 상태/데이터 구독

```tsx
import { useQueryData, useQueryStatus } from "@/modules/Query";

const user = useQueryData("user");
const status = useQueryStatus("user");
```

### 4. 쿼리 데이터/상태 직접 제어

```tsx
import { setQueryData, setQueryStatus } from "@/modules/Query";

setQueryData("user", { name: "직접 변경" });
setQueryStatus("user", "success");
```

## 타입

- `Status`: "idle" | "loading" | "success" | "error"
- `QueryKey`: string

## 주의사항

- 쿼리 키(`queryKey`)는 string으로 유일하게 지정해야 합니다.
- GET 요청은 `useQuery`, 데이터 변경은 `useMutation`을 사용하세요.
- fetch 함수는 반드시 Promise를 반환해야 합니다.
- 캐싱/상태 관리는 메모리 기반이므로, 새로고침 시 초기화됩니다.

