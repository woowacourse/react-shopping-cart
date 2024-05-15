import styled from '@emotion/styled';

const HeaderContainer = styled.header({
  width: '100%',
  height: '64px',
  padding: '0 24px',
  color: 'white',
  fontWeight: '800',
  fontSize: '20px',
  background: 'black',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

export default function Header() {
  return <HeaderContainer>SHOP</HeaderContainer>;
}
