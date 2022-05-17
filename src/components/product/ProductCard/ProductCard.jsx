import Image from '../../common/Image/Image';
import * as Styled from './ProductCard.style';
import * as GlobalStyled from '../../../styles/GlobalStyles';
import Icon from '../../common/Icon/Icon';
import Modal from '../../common/Modal/Modal';
import { useModal } from '../../../hooks/useModal';
import { useNavigate } from 'react-router-dom';
import CartAdd from '../CartAdd/CartAdd';
import { color } from '../../../styles/Theme';

function ProductCard({ product }) {
  const { id, imageURL, name, price } = product;

  const [isShowModal, openModal, closeModal] = useModal();
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
          <Icon iconName="cart" fill={color.DARK_GRAY} />
        </Styled.TransparentButton>
      </GlobalStyled.Position>

      {isShowModal && (
        <Modal closeModal={closeModal}>
          <CartAdd product={product} closeModal={closeModal} />
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
