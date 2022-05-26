import styled from 'styled-components';

const CartLayoutStyled = styled.div`
  width: 1320px;
  margin: 0 auto;
`;

const MainTitleWrapper = styled.div`
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin-top: 60px;
  margin-bottom: 30px;
`;

const LineWrapper = styled.div`
  margin-bottom: 50px;
`;

const BodyWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MenuWrapper = styled(BodyWrapper)`
  width: 736px;
  margin-bottom: 50px;
`;

const LeftWrapper = styled(BodyWrapper)`
  width: 736px;
  flex-direction: column;
`;

const MenuTitleWrapper = styled.div`
  margin-bottom: 15px;
`;

export {
  CartLayoutStyled,
  MainTitleWrapper,
  LineWrapper,
  BodyWrapper,
  MenuWrapper,
  MenuTitleWrapper,
  LeftWrapper,
};
