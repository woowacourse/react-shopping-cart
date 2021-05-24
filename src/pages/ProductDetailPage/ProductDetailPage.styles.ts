import styled from '@emotion/styled';

const Root = styled.section`
  width: 640px;
  margin: 0 auto;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageWrapper = styled.div`
  width: 570px;
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  width: 100%;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 700;
  margin: 20px 0 32px 0;
`;

const Divider = styled.hr`
  width: 100%;
  height: 4px;
  margin: 0;
  background-color: ${(props) => props.theme.borderColor.darkGrey};
  border: none;
  box-sizing: border-box;
`;

const PriceWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 20px 32px;
  box-sizing: border-box;
  justify-content: space-between;
`;

const PriceTitle = styled.div`
  font-size: 24px;
`;

const PriceValue = styled.div`
  font-size: 32px;
`;

const CartButton = styled.button`
  background-color: ${({ theme }) => theme.bgColor.brown};
  color: ${({ theme }) => theme.textColor.defaultWhite};
  width: 638px;
  height: 98px;
  font-weight: 700;
  font-size: 32px;
  text-align: center;
  border: none;
  cursor: pointer;
  outline: none;
`;

export default {
  Root,
  ImageWrapper,
  Image,
  Title,
  Divider,
  PriceWrapper,
  PriceTitle,
  PriceValue,
  CartButton,
};
