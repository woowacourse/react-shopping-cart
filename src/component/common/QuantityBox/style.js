import {FlexColumn, FlexRow} from 'style/common';
import styled from 'styled-components';
import Button from 'component/common/Button';
import {Font} from 'style/common';

const Layout = styled(FlexRow)`
  width: 114px;
  height: 60px;

  justify-content: space-between;
  align-items: center;
`;

const QuantityFont = styled(Font)`
  width: 73px;
  height: 60px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 18px;

  border: 1px solid ${({theme}) => theme.GRAY_500};
  box-sizing: border-box;
`;

const EditQuantityButton = styled(Button)`
  width: 42px;
  height: 30px;

  font-size: 11px;
  color: ${({theme}) => theme.BLACK};

  box-sizing: border-box;
  border: 1px solid ${({theme}) => theme.GRAY_500};
  border-collapse: collapse;

  &:hover {
    color: ${({theme}) => theme.GRAY_700};
  }
`;

const ButtonBox = styled(FlexColumn)`
  display: flex;
`;

export {Layout, EditQuantityButton, QuantityFont, ButtonBox};
