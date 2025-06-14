import Text from '../@common/Text/Text';

import { PriceInfoItemStyle } from './PriceInfo.styles';

function PriceInfoItem({ label, price }: { label: string; price: number }) {
  return (
    <div css={PriceInfoItemStyle}>
      <Text variant="body">{label}</Text>
      <Text variant="title">{price.toLocaleString()}원</Text>
    </div>
  );
}

export default PriceInfoItem;
