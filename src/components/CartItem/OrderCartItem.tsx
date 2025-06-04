import { Default } from '../../assets';
import Text from '../common/Text/Text';
import {
  CartInfo,
  CartItemBodyStyle,
  CartItemStyle,
  ControllerBox,
  ImageStyle,
} from './CartItem.styles';

function OrderCartItem() {
  return (
    <li css={CartItemStyle}>
      <div css={CartItemBodyStyle}>
        <img css={ImageStyle} src={Default} alt={'[동적 상품 이미지 필요]'} />

        <div css={CartInfo}>
          <Text varient="caption">{'[동적 상품 이름 필요]'}</Text>
          <Text varient="title">{'[동적 상품 가격 필요]'}</Text>
          <div css={ControllerBox}>
            <Text varient="caption">{'[동적 상품 수량 필요]'}</Text>
          </div>
        </div>
      </div>
    </li>
  );
}

export default OrderCartItem;
