# Api

## 개요

`Api` 클래스는 RESTful API 요청을 간편하게 처리할 수 있도록 도와주는 유틸리티입니다.  
기본 URL 및 공통 옵션을 설정할 수 있으며, GET/POST/PUT/PATCH/DELETE 등 주요 HTTP 메서드를 지원합니다.  
body 자동 JSON 직렬화, 옵션 병합, 에러 처리 등 반복적인 작업을 줄여줍니다.

## 주요 특징

1. **body 자동 JSON 직렬화**  
   POST, PUT, PATCH, DELETE 요청 시 `body` 옵션에 객체를 전달하면 자동으로 JSON 문자열로 변환하여 전송합니다.

2. **기본 URL 및 옵션 설정**  
   인스턴스 생성 시 기본 URL과 공통 fetch 옵션(헤더 등)을 지정할 수 있습니다.  
   각 요청 시 전달하는 옵션은 기본 옵션과 병합됩니다.

3. **에러 처리**  
   응답의 HTTP status가 200~299 범위가 아니면 에러를 throw합니다.  
   에러 메시지에는 status 코드와 statusText가 포함됩니다.

4. **응답 처리**  
   GET 요청은 응답을 JSON으로 파싱하여 반환합니다.  
   그 외 메서드는 별도의 반환값이 없습니다(필요하다면 수정 가능).

## 사용법

### 인스턴스 생성

```ts
import Api from "./Api";

const api = new Api("https://jsonplaceholder.typicode.com", {
  headers: {
    "Content-Type": "application/json",
  },
});
```

### GET

```ts
const data = await api.get("/todos/1");
console.log(data); // { userId: 1, id: 1, title: "...", completed: false }
```

### POST

```ts
await api.post("/todos", {
  headers: {
    Authorization: "Bearer ${token}",
  },
  body: {
    title: "foo",
    completed: false,
  },
});
```

### PUT

```ts
await api.put("/todos/1", {
  body: {
    title: "updated title",
    completed: true,
  },
});
```

### PATCH

```ts
await api.patch("/todos/1", {
  body: {
    completed: true,
  },
});
```

### DELETE

```ts
await api.delete("/todos/1");
```

## 옵션 병합 규칙

- 각 요청 시 전달하는 옵션은 인스턴스 생성 시 지정한 기본 옵션과 병합됩니다.
- 같은 속성이 있을 경우, 요청 시 전달한 옵션이 우선합니다.

## 주의사항

- POST/PUT/PATCH/DELETE 요청 시 body가 필요 없다면 생략 가능합니다.
- GET 요청은 body를 지원하지 않습니다.
- 응답이 JSON이 아닐 경우, GET 메서드에서 파싱 에러가 발생할 수 있습니다.
- fetch의 기본 동작(redirect, credentials 등)이 필요하다면 옵션으로 직접 지정하세요.
