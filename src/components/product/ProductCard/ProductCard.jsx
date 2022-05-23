import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useModal } from 'hooks/useModal';

import { Image, Icon, Modal } from 'components/common';

import { CartAddForm } from 'components/product';

import * as Styled from 'components/product/ProductCard/ProductCard.style';
import { color } from 'styles/Theme';
import * as GlobalStyled from 'styles/GlobalStyles';

function ProductCard({ product }) {
  const { id, imageURL, name, price } = product;

  const { isModalOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();

  const onClickCard = () => {
    navigate(`/products/${id}`);
  };

  const onClickCartButton = () => {
    openModal();
  };

  return (
    <GlobalStyled.Position>
      <Styled.Container onClick={onClickCard}>
        <Image src={imageURL} alt={name} />
        <Styled.Content>
          <Styled.Description>
            <Styled.Name>{name}</Styled.Name>
            <Styled.Price>{price}원</Styled.Price>
          </Styled.Description>
        </Styled.Content>
      </Styled.Container>

      <GlobalStyled.Position position="absolute" bottom="5px" right="5px">
        <Styled.TransparentButton type="button" onClick={onClickCartButton}>
          <Icon iconName="Cart" fill={color.DARK_GRAY} />
        </Styled.TransparentButton>
      </GlobalStyled.Position>

      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <CartAddForm product={product} closeModal={closeModal} />
        </Modal>
      )}
    </GlobalStyled.Position>
  );
}

ProductCard.skeleton = () => {
  return (
    <Styled.Container skeleton={true}>
      <Styled.Placeholder shape="square" />
      <Styled.Content>
        <Styled.Placeholder shape="line" />
      </Styled.Content>
    </Styled.Container>
  );
};

export default ProductCard;
