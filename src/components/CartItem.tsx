import { Image } from '../ui/Image';
import { Typography as ProductPrice } from '../ui/Typography';
import { CartCount } from './CartCount';
import { DeleteCartButton } from '../types/image';
import * as Styled from './styles/CartItem.styles';
import { CartItemProps } from '../types/CartItemType';
import { useCartState } from './hooks/useCartState';
import { useRecoilState } from 'recoil';
import { checkboxesState } from '../atoms/CheckboxState';

export const CartItem = ({ id, imageUrl, name, price }: CartItemProps) => {
  const {
    quantity,
    handleDeleteCartState,
    increaseProductCount,
    decreaseProductCount,
  } = useCartState(id);
  const [checkboxes, setCheckboxes] = useRecoilState(checkboxesState);

  const handleIsChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked
      ? setCheckboxes((prevState) => [...prevState, { id, price, quantity }])
      : setCheckboxes((prevState) =>
          prevState.filter((item) => item.id !== id)
        );
  };

  const isChecked = () => {
    return checkboxes.filter((checkbox) => checkbox.id === id).length === 0;
  };

  return (
    <Styled.Wrapper>
      <Styled.CheckboxInput
        type="checkbox"
        checked={isChecked() ? false : true}
        onChange={handleIsChecked}
      />
      <Image src={imageUrl} width="148px" height="179px" />
      <Styled.ProductName size="18px">{name}</Styled.ProductName>
      <Styled.CountInteractionWrapper>
        <Styled.DeleteCartButtonWrapper>
          <DeleteCartButton onClick={handleDeleteCartState} />
        </Styled.DeleteCartButtonWrapper>
        <CartCount
          quantity={quantity}
          handleDeleteCart={() => {
            return;
          }}
          increaseProductCount={increaseProductCount}
          decreaseProductCount={decreaseProductCount}
        />
        <ProductPrice>{`${(price * quantity).toLocaleString(
          'ko-KR'
        )} 원`}</ProductPrice>
      </Styled.CountInteractionWrapper>
    </Styled.Wrapper>
  );
};
