import { useRecoilState } from 'recoil';
import { productToggleSelector } from '../../../../recoil/cartToggleState';
import Checkbox from '../../../commons/Checkbox/Checkbox';

interface CartCheckboxProps {
  productId: number;
  productName: string;
}

const CartCheckbox = (props: CartCheckboxProps) => {
  const { productId, productName } = props;

  const [isToggled, setIsToggled] = useRecoilState(productToggleSelector(productId));

  return (
    <Checkbox
      label={`${productName} 상품 선택하기`}
      defaultChecked={isToggled}
      onClick={() => setIsToggled((prev) => !prev)}
    />
  );
};

export default CartCheckbox;
