import { Typography as LogoTitle } from '../ui/Typography';
import { LogoImage } from '../types/image';
import * as Styled from './styles/Logo.styles';

export const Logo = ({ $color }: { $color: string }) => {
  return (
    <Styled.Wrapper>
      <LogoImage fill={$color} />
      <LogoTitle size="40px" weight="900" color={$color}>
        SHOP
      </LogoTitle>
    </Styled.Wrapper>
  );
};
