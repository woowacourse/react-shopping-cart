<p align="middle" >
  <img src="https://techcourse-storage.s3.ap-northeast-2.amazonaws.com/3e6c6f30b11d4b098b5a3e81be19ce3a" width="400">
</p>
<h2 align="middle">Level2 - 장바구니</h2>
<p align="middle">React & Redux 데스크탑 장바구니 애플리케이션</p>
</p>

## 1단계 요구사항

### 필수 구현 사항

#### Redux를 활용한 상태 관리

- UI 상태
  - 메뉴 열림
- 메인 페이지 상품 목록
- 제품 상세 페이지 상품 정보
- 장바구니에 담은 상품 목록

#### Mock Data 활용 (Schema 설계까지)

- JSON Server
- 상품 스키마
  ```json
  {
    id,
    name,
    price,
    thumbnail: {
      sm,
      md,
      lg
    },
    description,
  }
  ```

#### UI

- 헤더

  - 장바구니
  - 주문목록
  - 로고

- 상품 목록 페이지

  - 상품 카드
  - 장바구니 담기 버튼
  - 카드 그리드

### 추가 구현 사항

- 제품 상세 페이지
- 상품 호버링 애니메이션
  - 확대
  - 상품 이미지 블러, 어둡게, 상품 한줄설명 보여주기, 애니메이션 서서히 보여주기 (0.3s?)
  - 구매 버튼, 멘트: 구매하기?
  - 밑줄
