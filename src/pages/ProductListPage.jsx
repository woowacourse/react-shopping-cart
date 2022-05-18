import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BASE_COMPONENT, StyledImageWrapper, StyledImg } from '../components/common';
import useRequest from '../hooks/useRequest';
import { getProductList } from '../api';
import CartIconButton from '../components/common/CartIconButton';
import { AddProductToCart, removeProductToCart } from '../store/modules/cart/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import FloatingActionButton from '../components/common/FloatingActionButton';

function ProductListPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { count, products: productsInCart } = useSelector((state) => state.cart);
  const { data: productList, loading } = useRequest(getProductList);

  const idsInCart = useMemo(() => productsInCart.map((product) => product.id), [productsInCart]);

  const handleClickItem = (id) => navigate(`${id}`);

  const onClickCartIcon = ({ tryAdd, product }) => {
    if (tryAdd) {
      dispatch(AddProductToCart(product));
      return;
    }
    dispatch(removeProductToCart(product.id));
  };

  if (loading) return null;

  return (
    <StyledContent>
      <StyledGridContainer>
        {productList.map((product) => {
          return ProductContainer({
            product,
            handleClickItem,
            onClickCartIcon,
            productsInCart,
            idsInCart,
          });
        })}
      </StyledGridContainer>
      <FloatingActionButton count={count} />
    </StyledContent>
  );
}

const ProductContainer = ({ product, handleClickItem, onClickCartIcon, idsInCart }) => {
  const { id, name, price, imageUrl } = product;

  const isInCart = idsInCart.includes(id);

  return (
    <StyledItem key={id}>
      <StyledImageWrapper width={'middle'} height={'middle'} onClick={() => handleClickItem(id)}>
        <StyledImg width={'middle'} src={imageUrl} />
      </StyledImageWrapper>
      <StyledItemInfoBox>
        <StyledItemInfo onClick={() => handleClickItem(id)}>
          <StyledItemName>{name}</StyledItemName>
          <StyledItemPrice>{Number(price).toLocaleString()} 원</StyledItemPrice>
        </StyledItemInfo>
        <CartIconButton product={product} onClickCallback={onClickCartIcon} isInCart={isInCart} />
      </StyledItemInfoBox>
    </StyledItem>
  );
};

const StyledContent = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 5vh;
`;

const StyledGridContainer = styled.div`
  display: grid;
  gap: 18px;
  width: 80%;
  grid-template-columns: repeat(4, 1fr);
  margin: auto;
  overflow: auto;
`;

const StyledItem = styled.div`
  width: 250px;
  height: 330px;
  cursor: pointer;
`;

const StyledItemInfoBox = styled(BASE_COMPONENT.flexCenterWrapper)`
  justify-content: space-between;
  margin: 16px 8px 0px 8px;
`;

const StyledItemInfo = styled(BASE_COMPONENT.flexWrapper)`
  flex-direction: column;
`;

const StyledItemName = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.5px;
`;
const StyledItemPrice = styled.span`
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  letter-spacing: 0.5px;
`;

export default ProductListPage;
