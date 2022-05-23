import styled, { css } from 'styled-components';

import ProductName from 'components/@shared/ProductName/ProductName';
import ProductPrice from 'components/@shared/ProductPrice/ProductPrice';

import useCart from 'hooks/useCart';

import { ReactComponent as Cart } from 'assets/cart.svg';
import { CURRENT_USER } from 'constants';

function ProductCardInfo({ name, price, id, thumbnail, $isincart }) {
  const { handleAddProductToCart, handleDeleteProductFromCart } = useCart();

  return (
    <Styled.Root>
      <Styled.ProductCardInfoBox>
        <ProductName type="card">{name}</ProductName>
        <ProductPrice type="card">{price}원</ProductPrice>
      </Styled.ProductCardInfoBox>
      <div
        onClick={
          $isincart
            ? (e) => handleDeleteProductFromCart(e, `${CURRENT_USER}${id}`)
            : (e) => handleAddProductToCart(e, { name, price, id, thumbnail })
        }
      >
        <Styled.Cart $isincart={$isincart} />
      </div>
    </Styled.Root>
  );
}

const Styled = {
  Root: styled.div`
    display: flex;
    cursor: pointer;
    justify-content: space-between;
    align-items: center;
    width: 188px;
  `,

  Cart: styled(Cart)`
    width: 20px;
    height: 20px;

    ${({ $isincart }) =>
      $isincart
        ? css`
      & path {
        fill: ${({ theme }) => theme.colors.red_01}
      }

      :hover {
        & path {
          fill: ${({ theme }) => theme.colors.cyon_02};
        }
    `
        : css`
            & path {
              fill: ${({ theme }) => theme.colors.black_02};
            }

            :hover {
              & path {
                fill: ${({ theme }) => theme.colors.cyon_02};
              }
            }
          `}
  `,
  ProductCardInfoBox: styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;

    :hover {
      text-decoration: underline;
    }
  `,
};

export default ProductCardInfo;
