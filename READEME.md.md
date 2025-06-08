# react-shopping-cart

## 📍 학습 목표

- ✔️ 상태를 중복 없이 구성하고, 계산이 가능한 값은 파생 상태로 도출하여 관리할 수 있다.
- ✔️ 함수(컴포넌트, 훅, util)가 단일한 책임만 갖도록 분리하고, 그 책임에 맞는 명확한 인터페이스를 정의할 수 있다.

### step2 시작전 리팩토링

- [x] CartItem 컴포넌트 네이밍 변경 (범용적)
- [x] CartItem 훅 내부 로직 분리
- [x] Checked ids 분리
- [x] 초기진입시, 체크 박스 풀 체크
- [x] isChecked 값 {id:checked} 매치해서 배열로 관리
- [ ] 불필요한 리렌더링 최적화하기 (CartPage)
- [x] 각각의 페이지에서 context 적용
- [ ] useQuery와 useMutation 적용

### 기능명세서

- [x] order-confirm -> payment-confirm 페이지로 변경

ui 퍼블리싱

- [x] 주문확인 페이지 (orderConfirmPage)
- [x] 쿠폰 적용 버튼
- [x] 배송 정보 여부 체크
- [x] OrderPrice 컴포넌트
- [x] 쿠폰 모달 (호이초이 모달 사용)
- [x] 체크 박스 및 쿠폰 정보
- [x] 쿠폰 적용 버튼
- [x] 쿠폰 컴포넌트
- [x] 결제 확인 페이지
- [x] 장바구니로 돌아가기 버튼

훅

- cart
- [x] useCart (wrapper 훅)
- [x] useCartCheck (id 배열 바탕으로 상품 체크 관련 훅)
- [x] useCartResource (cart 기본 초기값 받아오는 훅)
- order
- [x] useOrder (wrapper 훅)
- [x] useCouponResource (쿠폰 초기값 받아오는 훅)
- [x] useCouponApply (쿠폰 실제 값에 적용하는 훅)
  - [x] isRemoteArea 값에 의한 쿠폰 로직 적용
- [x] useDeliveryInformation (배송 관련 정보 훅 (현재는 산간지역 배송여부만 존재))
  - [x] isRemoteArea (제주도 및 도서 산간 지역) (이건 배송지 정보로 들어가지 않을까?)
- [x] useTempCoupon (쿠폰 모달에서만 적용되는 훅 (임시 훅 느낌))

- [x] msw 쿠폰 조회 로직 작성
- [x] order 훅 리팩토링
  - [x] useCouponApply 훅 내부 정리
  - [x] useCouponDiscount 훅 생성
  - [x] useCouponValidation 훅 생성
    - [x] validation 관련 util 함수로 분리
  - [x] 타입 정리
- [x] orderPrice 컴포넌트 네이밍 변경 -> Price
- [x] order-confirm 페이지 ui 정리
- [x] 상수 값 분리
- [x] 코로케이션 폴더 구조 적용
  - [x] cartPage 코로케이션 적용
  - [x] orderPage 코로케이션 적용
  - [x] shared 폴더 생성
- [x] 각각의 페이지에서 context api 적용
  - [x] cartPage context api 적용
  - [x] orderPage context api 적용
- [x] cartPage / orderPage -> provider 적용 후, export
- [x] modal 상태 context 적용
- [x] useCouponValidation 및 useCouponDiscount 훅 제거 -> 일반 util 함수로 변경
- [x] localstorage로 체크 상태 유지시키기
- [x] set 자료구조 -> 배열로 변경
- [ ] 테스트 코드 작성
  - [ ] cart
    - [x] useCartResource 훅 테스트
    - [x] useCartCheck 훅 테스트
    - [x] calculateCartAmount utils 함수 테스트
    - [x] calculateCartPrice utils 함수 테스트
  - [ ] order
    - [x] useCouponResource 훅 테스트
    - [ ] useCoupon 훅 테스트
      - [ ] generateCouponDiscount 테스트
      - [ ] validateCoupon 테스트
    - [x] utils 함수들 테스트

### 응집도와 결합도 측면에서의 대화

책임이 여러개이긴 하지만, 사용이 편리하다.
책임의 주체를 기능이 아니라, 상태로 본다.
파생 되는 값이니까, 한번에 모아두면 좋다.
응집도가 낮다.

1. useCart 안에 로직 다 모아두기
   - 파일이 흩어지는 것 같다. -> 그냥 모아두는게 더 좋은 것 같다. 분리를 안 하고.
   - cartItems 에 의해서 다 계산되기 때문에. 이걸 utils 로 분리해봤자 재사용도 안되고, cartItems 맥락에서 밖에 쓰인다.
   - 그럴바에야 모아두자. 재사용이 안될거같다.
   - 밍고도 마찬가지. 리뷰어가 분리하라고 함. Context 로 cart 를 내보내고, 다른 데에서 값을 받아서 hook 으로 만듦.
2. useCart 를 그대로 쓰되, 안에 로직을 모두 별도로 분리한다. useCart 의 역할은 다 결합시켜서 내려주는 Wrapper 에 불과하다.
3. useCart 를 없애고, useGetCartItems, useDeleteCart, useUpdateCart, useOrderInfo 등 다 나누고, 사용처에서 그에 맞게 쓴다.
   변경을 고려하지 않고 있다.
   가독성을 높이기 위해서, 그냥 다 결합시키는게 좋다. 추상화 시키면 오히려 코드가 어렵다. 근데 유지보수성은 좋다진다.
   유지보수성이 좋아진다는 것은, 변경에 대응하기 쉽다는 것이다.
   원칙. - ISP, SRP, DIP 등등 다 지킬 수 있는 방안
   변경.
   DI(의존성 주입) - 주입을 해줘야하는데,

### 고민 사항

page 딴에서 데이터를 전달하는게 맞을까?
아님, 전역 상태를 하나를 두고, 해당 페이지에서 원하는 값들을 긁어다가 쓰는게 맞을까?

- 전역 상태의 경우, 하나의 공유 저장소같은 느낌

기존의 경우) 페이지 이동할 때, 해당 데이터를 서버의 DB에 저장을 해두고, 페이지 딴에서 서버 요청을 해서 최신 데이터를 가지고 오고 이를 UI상에 뿌려주는게 맞지 않을까? 라는 생각

useCouponValidation과 useCouponDiscount가 훅일 필요가 있을까?

어차피 무료배송인경우, 쿠폰을 활성화 시켜야하는지? 비활성화 시켜야하는지?

자료구조 set은 localstorage에 들어가면 객체로 변경된다.
