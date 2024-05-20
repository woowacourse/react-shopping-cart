일관성을 유지하기 위한 규칙

### recoil

1. 리렌더를 촉발하는 데이터에 해당하는 경우 이름에 State를 붙인다.
   1. atom은 무조건 State를 붙인다.
   2. selector는 내부적으로 하나 이상의 atom을 이용하는 경우 State를 붙인다.
2. selector의 용도는 세 가지이다.
   1. atom 파생 상태
   2. 비동기 데이터 패칭
