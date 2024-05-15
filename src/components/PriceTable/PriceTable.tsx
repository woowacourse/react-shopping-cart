import * as S from './PriceTable.style';
import NOTICE from '../../assets/notice.svg';
import ImageBox from '../common/ImageBox/ImageBox';
import Text from '../common/Text/Text';
import Divider from '../common/Divider/Divider';
import ContentRow from '../common/ContentRow/ContentRow';

const PriceTable = () => {
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
        <ContentRow title="주문 금액" content="120,000원" />
        <ContentRow title="배송비" content="0원" />
      </S.Rows>
      <Divider />
      <ContentRow title="총 결제 금액" content="120,000원" />
    </S.Container>
  );
};

export default PriceTable;
