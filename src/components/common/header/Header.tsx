import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Text } from '../Text/Text';
import { CartIcon } from '../../../assets';
import UserCartInfo from './UserCartInfo';

const Header = () => {
  const navigate = useNavigate();

  const handleClickLogoWrapper = () => {
    navigate('');
  };

  const handleClickCartWrapper = () => {
    navigate('/cartlist');
  };

  return (
    <HeaderWrapper>
      <HeaderInner>
        <LogoWrapper onClick={handleClickLogoWrapper}>
          <CartIcon fill="#FFFFFF" style={{ marginRight: '20px' }} />
          <Text color="#FFFFFF" size="largest" weight="bold" lineHeight="58px">
            SHOP
          </Text>
        </LogoWrapper>
        <CartWrapper onClick={handleClickCartWrapper}>
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
`;

const HeaderInner = styled.div`
  width: 1300px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  justify-content: space-between;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

const CartWrapper = styled.div`
  display: flex;
  cursor: pointer;
`;
