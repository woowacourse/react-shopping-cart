import Vector from "/Vector.png";
import Hr from "../../common/Hr/Hr";

import Price from "../Price/Price";
import DetailPrice from "../DetailPrice/DetailPrice";

export default function Receipt() {
  return (
    <div>
      <div>
        <img src={Vector} />
        <p>총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</p>
      </div>
      <Hr />
      <DetailPrice />
      <Hr />
      <Price name="총 결제 금액" price={73000} />
    </div>
  );
}
