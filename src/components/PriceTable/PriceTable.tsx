import * as S from './PriceTable.style';
import NOTICE from '../../assets/notice.svg';
import ImageBox from '../common/ImageBox/ImageBox';
import Text from '../common/Text/Text';
import Divider from '../common/Divider/Divider';
import ContentRow from '../common/ContentRow/ContentRow';
import { useRecoilValue } from 'recoil';
import { totalCartPriceState } from '../../recoil/price/totalCartPriceState';
import { cartShippingFeeState } from '../../recoil/price/cartShippingFeeState';
import { finalCartPriceState } from '../../recoil/price/finalCartPriceState';

const PriceTable = () => {
  const totalCartPrice = useRecoilValue(totalCartPriceState);
  const deliveryFee = useRecoilValue(cartShippingFeeState);
  const finalCartPrice = useRecoilValue(finalCartPriceState);

  return (
    <S.Container>
      <S.NoticeContainer>
        <ImageBox src={NOTICE} width={16} height={16} border="none" />
        <Text size="s" weight="m">
          총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
        </Text>
      </S.NoticeContainer>
      <Divider />
      <S.Rows>
        <ContentRow title="주문 금액" content={`${totalCartPrice.toLocaleString('ko-kr')}원`} />
        <ContentRow title="배송비" content={`${deliveryFee.toLocaleString('ko-kr')}원`} />
      </S.Rows>
      <Divider />
      <ContentRow title="총 결제 금액" content={`${finalCartPrice.toLocaleString('ko-kr')}원`} />
    </S.Container>
  );
};

export default PriceTable;
