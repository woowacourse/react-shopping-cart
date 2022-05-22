import { getNumberFormatter } from 'lib/formatterUtils';

import Button from 'components/@common/Button';
import ToolTip from 'components/@common/ToolTip';

import { ICON_CODE } from 'constants/';
import * as S from './styles';

function VerticalContent({ id, image, name, price, onClickAddCart }) {
  const handleClickAddCartButton = () => {
    onClickAddCart({ id, image, name, price });
  };

  return (
    <S.Container direction="vertical">
      <S.ImageContainer fill>
        <S.Image src={image} alt="product thumbnail" />
      </S.ImageContainer>

      <S.Description>
        <S.ItemInfo>
          <S.Title>{name}</S.Title>
          <S.Price>{getNumberFormatter(price)}원</S.Price>
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

export default VerticalContent;
