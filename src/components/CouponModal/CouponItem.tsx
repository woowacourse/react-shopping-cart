import { CouponType } from "../../types/types";
import formatPrice from "../../utils/formatPrice";
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
      case "freeShipping":
        lines.push(`최소 주문 금액: ${formatPrice(data.minimumAmount)}원`);
        break;
      case "percentage": {
        const start = data.availableTime.start.split(":")[0];
        const end = data.availableTime.end.split(":")[0];
        lines.push(
          `사용 가능 시간: 오전 ${start[0] === "0" ? start[1] : start}시부터 ${
            end[0] === "0" ? end[1] : end
          }시까지`
        );
        break;
      }

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
