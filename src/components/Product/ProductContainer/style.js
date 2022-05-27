import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Container = styled.section`
  max-width: 1020px;
  padding: 0;
  margin: 40px 0;
  display: grid;
  gap: 30px 36px;

  @media ${({ theme }) => theme.DEVICE.EXTRA_SMALL} {
    grid-template-columns: repeat(1, 1fr);
  }

  @media ${({ theme }) => theme.DEVICE.MOBILE} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${({ theme }) => theme.DEVICE.TABLET} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${({ theme }) => theme.DEVICE.LAPTOP} {
    grid-template-columns: repeat(4, 1fr);
  }
`;
