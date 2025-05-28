import { Minus, Plus } from '../../assets';
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
        <button css={DeleteButtonStyle}>
          <Text varient="caption">삭제</Text>
        </button>
      </div>
      <div css={CartItemBodyStyle}>
        <img css={ImageStyle} src="" alt="" />

        <div css={CartInfo}>
          <Text varient="caption">해삐</Text>
          <Text varient="title">10,000원</Text>
          <div css={ControllerBox}>
            <button css={ControllerButton}>
              <img src={Minus} alt="minus" />
            </button>
            <Text varient="caption">1</Text>
            <button css={ControllerButton}>
              <img src={Plus} alt="plus" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
