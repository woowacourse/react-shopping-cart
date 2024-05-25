import styled from '@emotion/styled';

export const Header = styled.header(({ theme }) => ({
  background: `${theme.colors.black}`,
  width: '100%',
  height: '64px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `${theme.spacer.spacing3}`,
  img: {
    height: '16px',
  },
}));
