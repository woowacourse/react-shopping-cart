![example workflow](https://github.com/hyeryongchoi/react-shopping-cart/actions/workflows/deploy.yml/badge.svg)

<p align="middle" >
  <img src="https://techcourse-storage.s3.ap-northeast-2.amazonaws.com/3e6c6f30b11d4b098b5a3e81be19ce3a" width="200px" alt="">
</p>
<h2 align="middle">Level2 - 장바구니</h2>
<p align="middle">React 데스크탑 장바구니 애플리케이션</p>
</p>

---

## [🛒 장바구니 페이지 링크](https://hyeryongchoi.github.io/react-shopping-cart/) | [📕 스토리북 페이지 링크](https://hyeryongchoi.github.io/react-shopping-cart/storybook)

![장바구니 미션 2단계 실행화면](https://github.com/woowacourse/react-shopping-cart/assets/24777828/a2cd351f-cd2c-4721-9946-2c198f611871)

## 📍 학습 목표

- 상태 관리 라이브러리를 사용하여 상태 관리를 구현할 수 있으며, 이를 통해 애플리케이션의 안정성과 유지 보수성 향상
- 다양한 테스트 도구를 스스로 비교 분석하고, 자신에게 가장 적합한 도구를 선정하여 활용
- `MSW`를 이용한 mocking을 통해 서버와의 연결전 준비

## 🚀 Getting Started

> 다수의 컴포넌트를 페이지로 구성하고 복잡해진 상태를 관리합니다.

- `데스크탑 타겟`의 웹 앱을 구현합니다.
- 상태 관리를 위해 `Recoil`을 활용합니다.
- `Router`를 활용해 여러 페이지 전환을 고려합니다.
- [배민상회](https://mart.baemin.com) 서비스 참고

## 🚀 Step1 - Begin State Management

### 🙏 페어(페어프로그래밍)

<table>
  <tr>
    <td align="center" width="150px">
      <a href="https://github.com/HyeryongChoi" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/24777828?v=4" alt="첵스(최혜령) 프로필" />
      </a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/evencoding" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/88191233?v=4" alt="우디(류정우) 프로필" />
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/HyeryongChoi" target="_blank">
        첵스(최혜령)
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/evencoding" target="_blank">
        우디(류정우)
      </a>
    </td>
  </tr>
</table>

### 📝 필수 요구사항

#### **1. 상품 목록 페이지**

- 상품 목록 페이지에 필요한 UI 마크업
- header의 숫자 표시를 통해 장바구니에 담긴 상품 종류의 갯수 표시

#### **2. 전역 상태 관리**

- recoil을 사용하여 전역 상태 관리

#### **3. mock 데이터 활용**

- Mock 데이터를 활용하여 상품 데이터를 처리한다. 협업 미션을 고려하여 **장바구니 API 예상 명세** 참고

#### **4. 테스트 도구 선정**

- 적합한 테스트 도구를 선택하여 사용하고, 중요한 테스트 케이스를 정의하여 테스트 진행

### ✅ 프로그래밍 요구사항

이전 미션의 프로그래밍 요구사항은 기본으로 포함한다.

#### **Readability**

- API 요청을 처리하는 공통 함수나 커스텀 훅을 작성하여 재사용 가능하게 만든다.
- 페이지간 공통 스타일이 있는 경우 재사용한다.

#### **Reusability**

- 서버와의 통신을 담당하는 코드와 UI를 렌더링 하는 코드를 분리하여 관심사를 분리한다.
- 에러 처리 로직을 명확하게 작성하여 코드의 가독성을 높인다.

#### **Performance**

- 불필요한 상태 관리를 최소화하고, 상태 업데이트를 최적화한다.
- 컴포넌트의 리렌더링을 최소화하기 위해 memoization을 적용한다.

## 🚀 Step2 - Asynchronous

> 다수의 컴포넌트를 페이지로 구성하고 복잡해진 상태를 관리합니다.

- MSW를 이용하여 API를 Mocking하고 리액트에서 비동기 상황에 대해 고민해 봅니다.
- `Router`를 활용해 여러 페이지 전환을 고려합니다.
- [배민상회](https://mart.baemin.com) 서비스 참고

### 📝 필수 요구사항

#### **1. 장바구니 페이지**

- 장바구니 페이지 마크업을 완성하고, 상품 목록 페이지와 함께 모바일 환경 대응

#### **2. MSW를 활용한 API Mocking**

- MSW를 활용하여 실제 서버와 연동될 수 있는 API Mocking을 구현
- 단순한 Endpoint 변경으로 실제 API 사용이 가능하도록 작업

#### **3. 테스트**

- 장바구니 페이지에서 다양한 사용자 인터렉션에 대한 테스트 케이스를 고민하고, 선택한 테스트 도구를 이용하여 검증

#### **4. 사용자 경험**

- 새로고침 해도, 장바구니에 담은 상품 유지
