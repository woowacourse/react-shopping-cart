import { Typography as LogoTitle } from './common/Typography';
import { LogoImage } from '../types/image';
import styled from 'styled-components';

export const Logo = ({ $color }: { $color: string }) => {
  return (
    <Wrapper>
      <LogoImage fill={$color} />
      <LogoTitle size="40px" weight="900" color={$color}>
        SHOP
      </LogoTitle>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    margin-left: 24px;
  }
`;
