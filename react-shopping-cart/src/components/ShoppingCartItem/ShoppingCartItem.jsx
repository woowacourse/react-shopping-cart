import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import CheckBox from 'components/@shared/CheckBox/CheckBox';
import ProductName from 'components/@shared/ProductName/ProductName';
import ProductPrice from 'components/@shared/ProductPrice/ProductPrice';
import ProductThumbnail from 'components/@shared/ProductThumbnail/ProductThumbnail';

import ItemCounter from 'components/ItemCounter/ItemCounter';

import { toggleIsChecked } from 'redux/carts/carts.action';

import useClickCartButton from 'hooks/useClickCartButton';

import { ReactComponent as Trash } from 'assets/trash.svg';

function ShoppingCartItem({ id, name, thumbnail, price, checked }) {
  const dispatch = useDispatch();
  const { handleDeleteProductFromCart } = useClickCartButton();

  const handleToggleCheckBox = () => {
    dispatch(toggleIsChecked(id));
  };

  return (
    <Styled.Root>
      <Styled.LeftContainer>
        <CheckBox
          type="checkbox"
          onChange={handleToggleCheckBox}
          checked={checked || false}
        />
        <ProductThumbnail type="shoppingCart" src={thumbnail} />
        <ProductName type="shoppingCart">{name}</ProductName>
      </Styled.LeftContainer>
      <Styled.RightContainer>
        <Styled.TrashIconContainer
          onClick={(e) => handleDeleteProductFromCart(e, id)}
        >
          <Trash />
        </Styled.TrashIconContainer>
        <ItemCounter id={id} />
        <ProductPrice type="shoppingCart">{price}원</ProductPrice>
      </Styled.RightContainer>
    </Styled.Root>
  );
}

const Styled = {
  Root: styled.div`
    display: flex;
    justify-content: space-between;
    width: 490px;
    padding: 20px 5px;
    border-top: 1px solid ${({ theme }) => theme.colors.gray_03};
  `,
  LeftContainer: styled.div`
    display: flex;
    align-items: center;
  `,

  RightContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: flex-end;
  `,

  TrashIconContainer: styled.div`
    cursor: pointer;
  `,
};

export default ShoppingCartItem;
