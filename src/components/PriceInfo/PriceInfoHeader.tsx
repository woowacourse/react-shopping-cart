import Text from '../@common/Text/Text';

import { Info } from '../../assets';
import { PriceInfoHeaderStyle } from './PriceInfo.styles';

const PRICE_FOR_FREE_DELIVERY = 100000;

function PriceInfoHeader() {
  return (
    <div css={PriceInfoHeaderStyle}>
      <img src={Info} alt="정보 아이콘" />
      <Text variant="caption">
        총 주문 금액이 {PRICE_FOR_FREE_DELIVERY.toLocaleString()}원 이상일 경우
        무료 배송됩니다.
      </Text>
    </div>
  );
}

export default PriceInfoHeader;
