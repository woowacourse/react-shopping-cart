import PropTypes from 'prop-types';
import { useState } from 'react';
import { useHistory } from 'react-router';
import ScreenContainer from '../../shared/styles/ScreenContainer';
import ColumnProductItem from '../../components/ProductItem/ColumnProductItem/ColumnProductItem';
import db from '../../db.json';
import {
  Container,
  ModalText,
  ModalButton,
  RecommendedContainer,
  RecommendedTitle,
  RecommendedList,
} from './ProductListPage.styles';
import Modal from '../../components/Modal/Modal';
import { ROUTE } from '../../constants';

const ProductListPage = ({ location }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const history = useHistory();

  const onClickClose = event => {
    if (event.target !== event.currentTarget) return;

    setModalOpen(false);
  };

  return (
    <ScreenContainer route={location.pathname}>
      <Container>
        {Object.entries(db.productList).map(([id, { img, name, price }]) => (
          <ColumnProductItem key={id} imgSrc={img} name={name} price={`${price}`} onClick={() => setModalOpen(true)} />
        ))}
      </Container>
      {isModalOpen && (
        <Modal onClickClose={onClickClose}>
          <ModalText>상품이 장바구니에 담겼습니다.</ModalText>
          <ModalButton onClick={() => history.push({ pathname: ROUTE.SHOPPING_CART })}>
            {'장바구니 바로가기 >'}
          </ModalButton>

          <RecommendedContainer>
            <RecommendedTitle>이달의 상품 TOP 3</RecommendedTitle>
            <RecommendedList>
              {Object.entries(db.productList)
                .slice(3)
                .map(([id, { img, name, price }]) => (
                  <ColumnProductItem
                    key={id}
                    imgSrc={img}
                    name={name}
                    price={`${price}`}
                    onClick={() => setModalOpen(true)}
                    isVisibleIcon={false}
                  />
                ))}
            </RecommendedList>
          </RecommendedContainer>
        </Modal>
      )}
    </ScreenContainer>
  );
};

ProductListPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductListPage;
