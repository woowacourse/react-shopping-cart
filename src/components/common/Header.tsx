import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { HeaderIc } from '../../asset';

export default function Header({ children }: PropsWithChildren) {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <TitleWrapper onClick={() => navigate('/')}>
        <HeaderIc />
        <Title>WOOSINSA</Title>
      </TitleWrapper>
      {children}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 0.8rem 15vw;
  width: 100%;
`;

const Title = styled.h1`
  ${({ theme }) => theme.fonts.h1}
  color: ${({ theme }) => theme.colors.white};
  margin-left: 2.6rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  cursor: pointer;
`;
