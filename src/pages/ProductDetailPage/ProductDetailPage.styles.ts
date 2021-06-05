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
  height: 570px;
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  width: 100%;
`;

const Title = styled.div`
  width: 570px;
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
  width: 570px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 32px 0;
`;

const PriceWrapperTitle = styled.div`
  font-size: 24px;
`;

const PriceWrapperPrice = styled.div`
  font-size: 32px;
`;

const Button = styled.button`
  width: 640px;
  height: 100px;
  font-weight: 700;
  font-size: 32px;
  color: ${({ theme }) => theme.textColor.defaultWhite};
  background: ${({ theme }) => theme.bgColor.brown};
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
  PriceWrapperTitle,
  PriceWrapperPrice,
  Button,
};
