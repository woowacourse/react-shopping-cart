import PropTypes from 'prop-types';

import Button from 'components/@common/Button';
import ToolTip from 'components/@common/ToolTip';

import { ICON_CODE } from 'constants/';
import * as Styled from './styles';

function ProductItem({ id, image, name, price, onClick }) {
  const handleClickAddCartButton = () => {
    onClick({ id, image, name, price });
  };

  return (
    <Styled.Container>
      <Styled.ImageContainer>
        <Styled.Image src={image} alt="product thumbnail" />
      </Styled.ImageContainer>

      <Styled.Description>
        <Styled.ItemInfo>
          <Styled.Title>{name}</Styled.Title>
          <Styled.Price>{price.toLocaleString('ko-KR')}원</Styled.Price>
        </Styled.ItemInfo>

        <Styled.ButtonContainer>
          <ToolTip text="장바구니 담기" align="bottom">
            <Button className="cart" onClick={handleClickAddCartButton} icon={ICON_CODE.CART} />
          </ToolTip>
        </Styled.ButtonContainer>
      </Styled.Description>
    </Styled.Container>
  );
}

ProductItem.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
};

ProductItem.defaultProps = {
  image: '기본 이미지 URL',
  name: '이름이 지정되지 않았습니다.',
  price: -1,
};

export default ProductItem;
