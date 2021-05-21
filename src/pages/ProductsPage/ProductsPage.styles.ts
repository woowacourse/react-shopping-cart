import styled from '@emotion/styled';

const Root = styled.section`
  margin: 60px 0;
`;

const ProductList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 282px);
  column-gap: 40px;
  row-gap: 24px;
  justify-content: center;
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const NoResultMessage = styled.div`
  text-align: center;
  font-size: 24px;
  margin: 2em 0;
`;

export default {
  Root,
  ProductList,
  SpinnerWrapper,
  NoResultMessage,
};
