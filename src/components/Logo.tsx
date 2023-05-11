import { Text as LogoTitle } from './common/Text';
import { LogoImage } from '../types/image';
import styled from 'styled-components';

export const Logo = ({ $color }: { $color: string }) => {
  return (
    <LogoWrapper>
      <LogoImage fill={$color} />
      <LogoTitle size={'40px'} weight={'900'} $color={$color}>
        SHOP
      </LogoTitle>
    </LogoWrapper>
  );
};

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    margin-left: 24px;
  }
`;
