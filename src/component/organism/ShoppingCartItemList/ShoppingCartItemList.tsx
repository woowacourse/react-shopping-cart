import { AMOUNT_COUNTER_FLAG } from '../../../constant';
import { CartProductDetailType } from '../../../type';
import { numberWithCommas } from '../../../util';
import TrashCanIcon from '../../atom/TrashIcon/TrashIcon';
import AmountCounter from '../../molecule/AmountCounter/AmountCounter';
import CheckBox from '../../molecule/CheckBox/CheckBox';
import RowProductItem from '../../molecule/RowProductItem/RowProductItem';
import {
  Container,
  ShoppingCartItemContainer,
  ShoppingCartItemOption,
  ShoppingCartItem,
} from './ShoppingCartItemList.styles';

interface ShoppingCartItemListProps {
  shoppingCartProducts: { [key: number]: CartProductDetailType };
  checkedProductList: Array<CartProductDetailType>;
  onClickCheckBox: React.MouseEventHandler<HTMLInputElement>;
  onClickDeleteButton: (id: string) => void;
  onClickAmountCounter: (id: string, type: string) => void;
}
const ShoppingCartItemList = ({
  shoppingCartProducts,
  checkedProductList,
  onClickCheckBox,
  onClickDeleteButton,
  onClickAmountCounter,
}: ShoppingCartItemListProps) => (
  <Container>
    {Object.values(shoppingCartProducts).map(
      (product: CartProductDetailType) => {
        const isChecked: boolean = checkedProductList
          .map((checkedProduct) => checkedProduct.product_id)
          .includes(product.product_id);

        const { product_id, image_url, name, price, quantity } = product;

        return (
          <ShoppingCartItemContainer key={product_id}>
            <ShoppingCartItem>
              <CheckBox
                id={product_id}
                onClick={onClickCheckBox}
                isChecked={isChecked}
              />
              <RowProductItem
                product_id={product_id}
                image_url={image_url}
                name={name}
              />
            </ShoppingCartItem>

            <ShoppingCartItemOption>
              <button
                type="button"
                onClick={() => onClickDeleteButton(product_id)}
              >
                <TrashCanIcon />
              </button>
              <AmountCounter
                value={quantity}
                onClickUp={() =>
                  onClickAmountCounter(product_id, AMOUNT_COUNTER_FLAG.UP)
                }
                onClickDown={() =>
                  onClickAmountCounter(product_id, AMOUNT_COUNTER_FLAG.DOWN)
                }
              />
              <span>{`${numberWithCommas(price * quantity)}원`}</span>
            </ShoppingCartItemOption>
          </ShoppingCartItemContainer>
        );
      }
    )}
  </Container>
);

export default ShoppingCartItemList;
export type { ShoppingCartItemListProps };
