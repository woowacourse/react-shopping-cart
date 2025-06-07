import { CouponType } from "../../types/types";
import CheckBox from "../CheckBox/CheckBox";
import * as S from "./CouponItem.styled";

export default function CouponItem({ data }: { data: CouponType }) {
  const getCouponText = (): string[] => {
    const discountType = data.discountType;
    const lines: string[] = [];

    const str = ["년", "월", "일"];
    const expireDateArr = data.expirationDate.split("-");
    const expDate = [];

    for (let i = 0; i < expireDateArr.length; i++) {
      expDate.push(expireDateArr[i] + str[i]);
    }

    lines.push(`만료일: ${expDate.join(" ")}`);

    switch (discountType) {
      case "fixed":
        if (data.minimumAmount) {
          lines.push(
            `최소 주문 금액: ${data.minimumAmount.toLocaleString()}원`
          );
        }
        break;

      case "buyXgetY":
        break;

      case "freeShipping":
        if (data.minimumAmount) {
          lines.push(
            `최소 주문 금액: ${data.minimumAmount.toLocaleString()}원`
          );
        }
        break;

      case "percentage":
        if (data.availableTime) {
          lines.push(
            `사용 가능 시간: 오전 ${data.availableTime.start}부터 ${data.availableTime.end}까지`
          );
        }
        break;

      default:
        break;
    }

    return lines;
  };

  return (
    <S.Container>
      <CheckBox
        text={data.description}
        isChecked={true}
        size="large"
        onChange={() => {}}
      />
      <S.CouponText>
        <div>
          {getCouponText().map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </S.CouponText>
    </S.Container>
  );
}
