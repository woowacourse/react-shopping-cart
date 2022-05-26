import styled from 'styled-components';

const ProductListPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 140px;
`;

const ProductListWrapper = styled.div`
  display: grid;
  gap: 10px;

  grid-template-columns: repeat(4, 1fr);
  @media ${({theme}) => theme.DEVICE.laptop} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${({theme}) => theme.DEVICE.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${({theme}) => theme.DEVICE.mobile} {
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;
  }

  margin: 0 10%;
`;

export {ProductListPageWrapper, ProductListWrapper};
