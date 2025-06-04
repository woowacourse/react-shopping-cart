import { TEXT } from '../../constants/text';
import { CheckboxStyle } from '../CartItem/CartItem.styles';
import Text from '../common/Text/Text';
import { CheckboxContainerStyle, DeliverInfoStyle } from './DeliverInfo.styles';

function DeliverInfo() {
  return (
    <div css={DeliverInfoStyle}>
      <Text varient="body">{TEXT.DELIVERY_INFO}</Text>
      <div css={CheckboxContainerStyle}>
        <input
          type="checkbox"
          css={CheckboxStyle}
          name="delivery-info"
          id="delivery-info"
        />
        <Text varient="caption">{TEXT.DELIVERY_INFO_DESCRIPTION}</Text>
      </div>
    </div>
  );
}

export default DeliverInfo;
