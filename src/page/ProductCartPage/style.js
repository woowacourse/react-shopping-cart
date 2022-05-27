import Button from 'component/common/Button';
import {FlexColumn, FlexRow} from 'style/common';
import styled from 'styled-components';

const ProductCartPageLayout = styled(FlexColumn)`
  margin: 140px 10%;
`;

const CartInfoBox = styled(FlexRow)`
  gap: 80px;
`;

const HeaderSpan = styled.span`
  font-size: 32px;
  font-weight: 700;
  border-bottom: 4px solid #333333;
  text-align: center;
  padding-bottom: 20px;
  margin-bottom: 53px;
`;

const CheckBoxRow = styled(FlexRow)`
  align-items: center;
  gap: 5px;
  justify-content: space-between;
`;

const SelectDeleteRow = styled(FlexRow)`
  justify-content: space-between;
  margin-bottom: 30px;
`;

const DeleteButton = styled(Button)`
  border: 1px solid #bbbbbb;
  color: #333333;
  font-size: 16px;
  padding: 22px 12px;
  width: 117px;
  height: 50px;

  &:hover {
    opacity: 0.8;
    border: 1px solid red;
    box-sizing: border-box;
    color: red;
  }
`;
const ListHeaderSpan = styled.span`
  border-bottom: ${({theme}) => `4px solid ${theme.GRAY_700}`};
  padding-bottom: 16px;
  margin-bottom: 10px;
`;

const CartListBox = styled.div`
  width: 100%;
`;

const SelectCartBox = styled(FlexColumn)`
  width: 100%;
`;

export {
  ProductCartPageLayout,
  CartInfoBox,
  HeaderSpan,
  SelectDeleteRow,
  CheckBoxRow,
  ListHeaderSpan,
  CartListBox,
  SelectCartBox,
  DeleteButton,
};
