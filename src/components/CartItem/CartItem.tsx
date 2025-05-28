import Text from '../common/Text/Text';
import {
  CartInfo,
  CartItemBodyStyle,
  CartItemStyle,
  CheckboxStyle,
  ControllerBox,
  ControllerButton,
  DeleteButtonStyle,
  ImageStyle,
  ListItemHeaderStyle,
} from './CartItem.styles';

function CartItem() {
  return (
    <li css={CartItemStyle}>
      <div css={ListItemHeaderStyle}>
        <input type="checkbox" name="" id="" css={CheckboxStyle} />
        <button css={DeleteButtonStyle}></button>
      </div>
      <div css={CartItemBodyStyle}>
        <img css={ImageStyle} src="" alt="" />
        <div css={CartInfo}>
          <Text></Text>
          <Text></Text>
          <div css={ControllerBox}>
            <button css={ControllerButton}></button>
            <Text></Text>
            <button css={ControllerButton}></button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
