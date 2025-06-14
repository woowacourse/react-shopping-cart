import { Minus, Plus } from '../../assets';
import Text from '../@common/Text/Text';

import {
  ControllerBoxStyle,
  ControllerButtonStyle,
} from './QuantityController.styles';

type CartItemClickProps = {
  cartItemId: number;
  quantity: number;
};

function QuantityController({
  cartItemId,
  quantity,
  onDecreaseCartItemClick,
  onIncreaseCartItemClick,
}: {
  cartItemId: number;
  quantity: number;
  onDecreaseCartItemClick: (props: CartItemClickProps) => void;
  onIncreaseCartItemClick: (props: CartItemClickProps) => void;
}) {
  return (
    <div css={ControllerBoxStyle}>
      <button
        css={ControllerButtonStyle}
        onClick={() =>
          onDecreaseCartItemClick({
            cartItemId,
            quantity: quantity - 1,
          })
        }
      >
        <img src={Minus} alt="수량 줄이기 버튼" />
      </button>
      <Text variant="caption">{quantity}</Text>
      <button
        css={ControllerButtonStyle}
        onClick={() =>
          onIncreaseCartItemClick({
            cartItemId,
            quantity: quantity + 1,
          })
        }
      >
        <img src={Plus} alt="수량 늘리기 버튼" />
      </button>
    </div>
  );
}

export default QuantityController;
