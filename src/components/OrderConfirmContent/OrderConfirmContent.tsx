import { useRecoilValue } from 'recoil';
import CouponTotalAmount from '../TotalAmount/CouponTotalAmount';
import Title from '../Title/Title';
import styled from 'styled-components';
import { MESSAGES } from '../../constants/Messages';
import {
  checkedItemsSelector,
  totalCountSelector,
  totalPriceSelector,
} from '../../recoil/selectors';
import { CartItems } from '../../types/Item';
import ConfirmItemCard from '../ItemCard/ConfirmItemCard';
import CouponButton from '../CouponModal/CouponModal';
import ShippingInformation from '../ShippingInformation/ShippingInformation';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { URL_PATH } from '../../constants/UrlPath';

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

const ContentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 3.6rem 2.4rem 10.4rem 2.4rem;
  box-sizing: border-box;
  height: 100%;
`;

function OrderConfirmContent() {
  const checkedItem = useRecoilValue(checkedItemsSelector);
  const checkedItemId = checkedItem.map((item) => item.id);
  const { totalItemTypeCount, totalCount } = useRecoilValue(totalCountSelector);
  const { calculatedTotalAmount } = useRecoilValue(
    totalPriceSelector('Discount'),
  );
  const navigate = useNavigate();
  const handleFooterClick = () => {
    navigate(URL_PATH.completed, {
      state: {
        totalItemTypeCount,
        totalCount,
        calculatedTotalAmount,
        checkedItemId,
      },
    });
  };
  return (
    <>
      <ContentWrapper>
        <Title
          title={MESSAGES.confirm}
          subTitle={`총 ${totalItemTypeCount}종류의 상품 ${totalCount}개를 주문합니다.\n 최종 결제 금액을 확인해 주세요.`}
        />
        {checkedItem.map((product: CartItems) => {
          return <ConfirmItemCard key={product.id} item={product} />;
        })}
        <CouponButton />
        <ShippingInformation />
        <CouponTotalAmount />
      </ContentWrapper>
      <Footer
        value={MESSAGES.payment}
        isDisabled={false}
        onClick={handleFooterClick}
      />
    </>
  );
}

export default OrderConfirmContent;
