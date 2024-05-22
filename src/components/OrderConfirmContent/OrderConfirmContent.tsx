import { useRecoilValue } from 'recoil';
import TotalAmount from '../TotalAmount/TotalAmount';
import Title from '../Title/Title';
import styled from 'styled-components';
import { MESSAGES } from '../../constants/Messages';
import {
  checkedItemsSelector,
  totalCountSelector,
} from '../../recoil/selectors';
import { CartItems } from '../../types/Item';
import ConfirmItemCard from '../ItemCard/ConfirmItemCard';
import CouponButton from '../CouponModal/CouponModal';

export const NoCartItemContainer = styled.p`
  width: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.6rem;
  text-align: center;
`;

function OrderConfirmContent() {
  const checkedItem = useRecoilValue(checkedItemsSelector);
  const { totalItemTypeCount, totalCount } = useRecoilValue(totalCountSelector);
  return (
    <>
      <Title
        title={MESSAGES.confirm}
        subTitle={`총 ${totalItemTypeCount}종류의 상품 ${totalCount}개를 주문합니다.\n 최종 결제 금액을 확인해 주세요.`}
      />
      {checkedItem.map((product: CartItems) => {
        return <ConfirmItemCard key={product.id} item={product} />;
      })}
      <CouponButton></CouponButton>
      <TotalAmount />
    </>
  );
}

export default OrderConfirmContent;
