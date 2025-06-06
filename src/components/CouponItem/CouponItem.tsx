import Checkbox from "../@common/Checkbox/Checkbox";
import * as S from "./CouponItem.styles";

interface Props {}

const CouponItem = ({}: Props) => {
  return (
    <S.CouponItem>
      <S.CouponItemHeader>
        <Checkbox selected={false} onClick={() => {}} />
      </S.CouponItemHeader>
    </S.CouponItem>
  );
};

export default CouponItem;
