import styled from 'styled-components';

const DetailItemPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 140px 10%;

  @media ${({theme}) => theme.DEVICE.mobile} {
    margin: 100px 5%;
  }
`;

export {DetailItemPageWrapper};
