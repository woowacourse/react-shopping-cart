import { styled } from 'styled-components';
import { Logo } from './Logo';

export const Header = () => {
  return (
    <HeaderWrapper>
      <StyledHeader>
        <Logo />
      </StyledHeader>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: #333333;
`;

const StyledHeader = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
`;
