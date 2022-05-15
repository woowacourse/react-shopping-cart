import styled from 'styled-components';

const ProductCartPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 140px 10% 0;
`;

const CartInfoWrapper = styled.div`
  display: flex;
  gap: 80px;
`;

const HeaderWrapper = styled.div`
  font-size: 32px;
  font-weight: 700;
  border-bottom: 4px solid #333333;
  text-align: center;
  padding-bottom: 20px;
  margin-bottom: 53px;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: space-between;
`;

const SelectDeleteWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;

  & button {
    border: 1px solid #bbbbbb;
    color: #333333;
    font-size: 16px;
    padding: 22px 12px;
  }
`;

const ListHeaderWrapper = styled.div`
  border-bottom: ${({theme}) => `4px solid ${theme.COLOR.GRAY_700}`};
  padding-bottom: 16px;
  margin-bottom: 10px;
`;

const CartListWrapper = styled.div`
  width: 100%;
`;

const SelectCartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export {
  ProductCartPageWrapper,
  HeaderWrapper,
  ListHeaderWrapper,
  CartListWrapper,
  SelectDeleteWrapper,
  CheckBoxWrapper,
  CartInfoWrapper,
  SelectCartWrapper,
};
