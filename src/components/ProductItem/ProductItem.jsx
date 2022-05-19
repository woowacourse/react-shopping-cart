import Styled from './style';
import { useNavigate } from 'react-router-dom';
import { PATH_NAME } from 'constants';
import PropTypes from 'prop-types';
import smallCart from 'assets/svg/smallCart.svg';
import parsePrice from 'utils/parsePrice';

const ProductItem = ({ id, name, price, imgUrl, onClickCartButton }) => {
  const navigate = useNavigate();

  const handleClickItem = () => {
    navigate(`${PATH_NAME.PRODUCT}/${id}`);
  };

  return (
    <Styled.Wrapper onClick={handleClickItem}>
      <Styled.Overlay>
        <Styled.NamePreview>{name}</Styled.NamePreview>
      </Styled.Overlay>
      <Styled.Image src={imgUrl} loading="lazy" />
      <Styled.Detail>
        <Styled.Info>
          <Styled.Name>{name}</Styled.Name>
          <Styled.Price>{parsePrice(price)}원</Styled.Price>
        </Styled.Info>
        <Styled.CartButton onClick={onClickCartButton}>
          <Styled.CartSvg src={smallCart} />
        </Styled.CartButton>
      </Styled.Detail>
    </Styled.Wrapper>
  );
};

ProductItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  price: PropTypes.number,
  imgUrl: PropTypes.string,
  onClickCartButton: PropTypes.func,
};

export default ProductItem;
