import styled from 'styled-components';
import { LogoImage } from '../types/image';
import { Text as LogoTitle } from './common/Text';

export const Logo = () => {
  return (
    <LogoWrapper>
      <img src={LogoImage} />
      <LogoTitle size={'40px'} weight={'900'} $color={'#ffffff'}>
        SHOP
      </LogoTitle>
    </LogoWrapper>
  );
};

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    margin-right: 24px;
  }
`;
