import PropTypes from 'prop-types';

import Button from 'components/@common/Button';
import ToolTip from 'components/@common/ToolTip';

import { ICON_CODE } from 'constants/';
import * as S from './styles';

function ProductItem({ id, image, name, price, onClick }) {
  const handleClickAddCartButton = () => {
    onClick({ id, image, name, price });
  };

  return (
    <S.Container>
      <S.ImageContainer>
        <S.Image src={image} alt="product thumbnail" />
      </S.ImageContainer>

      <S.Description>
        <S.ItemInfo>
          <S.Title>{name}</S.Title>
          <S.Price>{price.toLocaleString('ko-KR')}원</S.Price>
        </S.ItemInfo>

        <S.ButtonContainer>
          <ToolTip text="장바구니 담기" align="bottom">
            <Button className="cart" onClick={handleClickAddCartButton} icon={ICON_CODE.CART} />
          </ToolTip>
        </S.ButtonContainer>
      </S.Description>
    </S.Container>
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
