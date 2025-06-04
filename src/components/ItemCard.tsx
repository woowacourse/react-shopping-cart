import styled from '@emotion/styled';
import { Product } from '../types';
import CheckBox from './CheckBox';
import { useErrorContext } from '../contexts/ToastContext';
import useCartItemActions from '../hooks/useCartItemActions';

type ItemCardProps = {
  id: number;
  product: Product;
  quantity: number;
};

const ItemCard = ({ id, product, quantity }: ItemCardProps) => {
  const {
    isChecked,
    handleCheckBoxClick,
    handleClickIncrease,
    handleClickDecrease,
    handleClickDelete,
  } = useCartItemActions(id);
  const { showToast } = useErrorContext();

  return (
    <S.Container data-testid="item-card">
      <S.ButtonBox>
        <CheckBox checked={isChecked} onChange={handleCheckBoxClick} />
        <S.DeleteButton onClick={() => handleClickDelete(id)}>삭제</S.DeleteButton>
      </S.ButtonBox>
      <S.ItemBox>
        <S.ItemImage src={product.imageUrl} alt="product-image" />
        <S.ItemInfoBox>
          <div>
            <S.ItemName>{product.name}</S.ItemName>
            <S.ItemPrice>{`${product.price.toLocaleString()}원`}</S.ItemPrice>
          </div>
          <S.Stepper>
            <S.StepButton
              onClick={() => {
                if (quantity === 1) showToast('수량이 1인 아이템은 삭제됩니다.');
                handleClickDecrease(id);
              }}>
              <img src="./minus-button.svg" alt="minus-button" />
            </S.StepButton>
            <p>{quantity}</p>
            <S.StepButton onClick={() => handleClickIncrease(id)}>
              <img src="./plus-button.svg" alt="plus-button" />
            </S.StepButton>
          </S.Stepper>
        </S.ItemInfoBox>
      </S.ItemBox>
    </S.Container>
  );
};

export default ItemCard;

const S = {
  Container: styled.div`
    border-top: 1px solid #e0e0e0;
    height: 160px;
    margin-bottom: 20px;
  `,

  ButtonBox: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 12px 0;
  `,

  ItemBox: styled.div`
    height: 112px;
    display: flex;
    align-items: center;
    gap: 24px;
  `,

  ItemImage: styled.img`
    width: 112px;
    height: 112px;
    object-fit: cover;
  `,

  ItemInfoBox: styled.div`
    height: 100%;
    padding: 10px 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,

  ItemName: styled.p`
    font-size: 12px;
    font-weight: 500;
    margin-bottom: 4px;
  `,

  ItemPrice: styled.p`
    font-size: 24px;
    font-weight: 700;
  `,

  Stepper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 4px;
    width: 80px;
  `,

  DeleteButton: styled.button`
    background-color: white;
    border: 2px solid #e6e6e6;
    border-radius: 8px;
    padding: 4px 8px;
  `,

  StepButton: styled.button`
    height: 24px;
  `,
};
