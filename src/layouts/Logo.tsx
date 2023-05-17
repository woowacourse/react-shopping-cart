import { Typography as LogoTitle } from '../ui/Typography';
import { LogoImage } from '../types/image';
import * as Styled from './styles/Logo.styles';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

export const Logo = memo(({ $color }: { $color: string }) => {
  const navigator = useNavigate();

  return (
    <Styled.Wrapper
      onClick={() => {
        navigator('/');
      }}
    >
      <LogoImage fill={$color} />
      <LogoTitle size="40px" weight="900" color={$color}>
        SHOP
      </LogoTitle>
    </Styled.Wrapper>
  );
});
