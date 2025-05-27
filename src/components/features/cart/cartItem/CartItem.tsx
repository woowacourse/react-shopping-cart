import IconButton from '../../../common/iconButton/IconButton';
import SelectBox from '../../../common/selectBox/SelectBox';
import * as S from './CartItem.styles';

function CartItem() {
  return (
    <S.Container>
      <S.ActionContainer>
        <SelectBox isSelected={false} />
        <S.DeleteButton>
          <S.DeleteButtonText>삭제</S.DeleteButtonText>
        </S.DeleteButton>
      </S.ActionContainer>
      <S.InfoContainer>
        <S.PreviewBox>
          <S.PreviewImage
            src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202204/19/ed8eddd4-0edd-40ad-af7d-44a171577c92.jpg"
            alt="상품 이미지"
          />
        </S.PreviewBox>
        <S.InfoBox>
          <S.CartProductInfo>
            <S.CartProductTitle>에어포스</S.CartProductTitle>
            <S.CartProductPrice>35,000원</S.CartProductPrice>
          </S.CartProductInfo>
          <S.UpdateCartBox>
            {/* {cartCount === 1 ? (
            <IconButton actionType="delete" onClick={() => {}} />
          ) : ( */}
            <IconButton actionType="minus" onClick={() => {}} />
            {/* )} */}
            <S.Text>{'1'}</S.Text>
            <IconButton actionType="plus" onClick={() => {}} />
          </S.UpdateCartBox>
        </S.InfoBox>
      </S.InfoContainer>
    </S.Container>
  );
}

export default CartItem;
