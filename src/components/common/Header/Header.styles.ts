import styled from 'styled-components';

import { Button } from '../Button/Button.styles';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  padding: ${({ theme }) => theme.spacer.spacing4};
  background-color: ${({ theme }) => theme.color.white};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray2};
  z-index: 2;
`;

const HeaderContentContainer = styled.div`
  position: relative;
  max-width: 1080px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 600px) {
    justify-content: space-between;
  }
`;

const Logo = styled.img`
  height: 40px;
`;

const CartButton = styled(Button)`
  position: absolute;
  right: 0;
  width: initial;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const CartItemCount = styled.span`
  position: absolute;
  height: 14px;
  right: 10px;
  top: 9px;
  padding: 0px ${({ theme }) => theme.spacer.spacing1};

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.color.orange};
  color: ${({ theme }) => theme.color.white};
  text-align: center;
  font-size: 10px;
  line-height: 12px;
  border-radius: 7px;
  letter-spacing: -0.2px;
  font-weight: 600;
  white-space: nowrap;
  pointer-events: none;
  transform: translateX(calc(50% - 7px));
`;

const CartIcon = styled.img`
  width: 32px;
  height: 32px;
  margin-bottom: ${({ theme }) => theme.spacer.spacing1};
`;

const HeaderButtonLabel = styled.span`
  font-size: 10px;
  font-weight: 400;
`;

export {
  HeaderContainer,
  HeaderContentContainer,
  Logo,
  CartButton,
  CartItemCount,
  CartIcon,
  HeaderButtonLabel,
};
