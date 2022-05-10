import styled, { css, keyframes } from 'styled-components';

const refresh = keyframes`
  0% {
    background-position: calc(-100px);
  }
  40%,
  100% {
    background-position: 320px;
  }
`;

const StyledProductItem = styled.div`
  width: 282px;
`;

const StyledProductImage = styled.div`
  width: 282px;
  height: 282px;
  background-color: gray;
  background-image: linear-gradient(90deg, #e0e0e0 0px, #ededed 30px, #e0e0e0 60px);
  animation: ${refresh} 2s infinite ease-out;
`;

const StyledProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 75px;
`;

const StyledProductText = styled.div`
  background-color: gray;
  background-image: linear-gradient(90deg, #e0e0e0 0px, #ededed 30px, #e0e0e0 60px);
  margin-top: 13px;
  animation: ${refresh} 2s infinite ease-out;

  ${props =>
    props.name &&
    css`
      width: 100%;
      height: 22px;
    `}

  ${props =>
    props.price &&
    css`
      width: 80%;
      height: 27px;
    `}
`;

const Skeleton = () => {
  return (
    <StyledProductItem>
      <StyledProductImage></StyledProductImage>
      <StyledProductContainer>
        <StyledProductText name="true" />
        <StyledProductText price="true" />
      </StyledProductContainer>
    </StyledProductItem>
  );
};

export default Skeleton;
