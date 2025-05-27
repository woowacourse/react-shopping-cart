import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 24px 0 24px 0;
  gap: 24px;
`;

export const ProductTitle = styled.h2`
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
`;

export const ProductPrice = styled.p`
  margin: 4px 0 0 0;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  vertical-align: middle;
`;

export const TotalContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 54px;
  padding: 8px 0;
`;

export const Title = styled.h2`
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
`;

export const TotalPrice = styled.h1`
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
  text-align: right;
`;

export const CloseButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: white;
  height: 44px;
  border-radius: 5px;
  background-color: #333333;
  font-weight: 700;
  font-size: 15px;
  line-height: 100%;
  text-align: center;
  cursor: pointer;
`;

export const StepperContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

export const StepperButton = styled.button`
  width: 24px;
  height: 24px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: white;
  font-size: 18px;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
    border-color: #ccc;
  }

  &:active {
    background-color: #e8e8e8;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    &:hover {
      background-color: white;
      border-color: #ddd;
    }
  }
`;

export const StepperQuantity = styled.span`
  min-width: 40px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  user-select: none;
`;

export const CartItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

export const ModifyRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
`;

export const DeleteButton = styled.button`
  width: 40px;
  height: 24px;
  font-size: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background: white;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

export const ProductRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

export const CartProductImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  background: #eee;
`;

export const CartContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 4px;
  flex: 1;
`;
