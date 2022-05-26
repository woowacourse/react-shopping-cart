import styled from 'styled-components';

const CartProductStyled = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #ccc;
  width: 736px;
  padding-top: 22px;
  margin-bottom: 24px;
`;

const LeftWrapper = styled.div`
  display: flex;
`;

const RightWrapper = styled(LeftWrapper)`
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
`;

const ImageWrapper = styled.div`
  margin-right: 20px;
`;

export { CartProductStyled, LeftWrapper, RightWrapper, ImageWrapper };
