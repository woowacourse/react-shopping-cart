import styled from '@emotion/styled';
import { Text } from '../Text/Text';
import { CartIcon } from '../../../assets';
import UserCartInfo from './UserCartInfo';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderInner>
        <LogoWrapper to="/">
          <CartIcon fill="#FFFFFF" style={{ marginRight: '20px' }} />
          <Text color="#FFFFFF" size="largest" weight="bold" lineHeight="58px">
            SHOP
          </Text>
        </LogoWrapper>
        <CartWrapper>
          <UserCartInfo />
        </CartWrapper>
      </HeaderInner>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 80px;
  background-color: #333333;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  z-index: 1000;
`;

const HeaderInner = styled.div`
  width: 1280px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  justify-content: space-between;

  @media screen and (max-width: 1320px) {
    width: 940px;
  }

  @media screen and (max-width: 1000px) {
    width: 620px;
  }

  @media screen and (max-width: 660px) {
    width: 330px;
  }
`;

const LogoWrapper = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CartWrapper = styled.div`
  display: flex;
`;
