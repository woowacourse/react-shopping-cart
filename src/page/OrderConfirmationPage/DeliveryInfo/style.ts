import styled from '@emotion/styled';

export const Container = styled.div({
  height: '56px',
  marginBottom: '32px',
  display: 'flex',

  flexDirection: 'column',
  rowGap: '16px',
});

export const Title = styled.p({
  fontSize: '16px',
  fontWeight: 700,
  lineHeight: '16px',
});

export const CheckItem = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  columnGap: '8px',

  fontSize: '12px',
  fontWeight: 500,
});
