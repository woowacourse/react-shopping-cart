import * as S from './PriceTable.style';
import NOTICE from '../../assets/notice.svg';
import ImageBox from '../common/ImageBox/ImageBox';
import Text from '../common/Text/Text';
import Divider from '../common/Divider/Divider';
import ContentRow from '../common/ContentRow/ContentRow';
import { useRecoilValue } from 'recoil';
import { priceSelector } from '../../recoil/price/priceSelector';

const PriceTable = () => {
  const { orderedPrice, deliveryFee, totalPrice } = useRecoilValue(priceSelector);

  return (
    <S.Container>
      <S.NoticeContainer>
        <ImageBox src={NOTICE} width={16} height={16} border="none" alt='notice-icon' />
        <Text size="s" weight="m">
          총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
        </Text>
      </S.NoticeContainer>
      <Divider />
      <S.Rows>
        <ContentRow title="주문 금액" content={`${orderedPrice.toLocaleString('ko-kr')}원`} />
        <ContentRow title="배송비" content={`${deliveryFee.toLocaleString('ko-kr')}원`} />
      </S.Rows>
      <Divider />
      <ContentRow title="총 결제 금액" content={`${totalPrice.toLocaleString('ko-kr')}원`} />
    </S.Container>
  );
};

export default PriceTable;
