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
      <Text variant="body">배송 정보</Text>
      <div css={DeliveryInfoCheckboxContainerStyle}>
        <input
          type="checkbox"
          css={DeliveryInfoCheckboxStyle}
          checked={isFarDelivery}
          onChange={handleFarDeliverySelect}
        />
        <Text variant="caption">제주도 및 도서 산간 지역</Text>
      </div>
    </section>
  );
}

export default DeliveryInfo;
