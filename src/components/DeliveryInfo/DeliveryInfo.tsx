import Text from '../@common/Text/Text';

import {
  DeliveryInfoStyle,
  DeliveryInfoCheckboxStyle,
  DeliveryInfoCheckboxContainerStyle,
} from './DeliveryInfo.styles';

interface DeliveryInfoProps {
  isFarDelivery: boolean;
  handleFarDeliverySelect: () => void;
}

function DeliveryInfo({
  isFarDelivery,
  handleFarDeliverySelect,
}: DeliveryInfoProps) {
  return (
    <section css={DeliveryInfoStyle}>
      <Text varient="body">배송 정보</Text>
      <div css={DeliveryInfoCheckboxContainerStyle}>
        <input
          type="checkbox"
          css={DeliveryInfoCheckboxStyle}
          checked={isFarDelivery}
          onChange={handleFarDeliverySelect}
        />
        <Text varient="caption">제주도 및 도서 산간 지역</Text>
      </div>
    </section>
  );
}

export default DeliveryInfo;
