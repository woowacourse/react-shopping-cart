import styled from '@emotion/styled';

const Root = styled.section`
  margin: 60px 0;
`;

const Product = styled.div`
  width: 640px;
  margin: 0 auto;
  letter-spacing: 0.5px;
`;

const Image = styled.img`
  width: 570px;
  height: 570px;
  object-fit: contain;
  margin: 0 auto;
  display: block;
`;

const Title = styled.h3`
  font-size: 32px;
  margin: 20px auto;
  padding: 0 35px;
`;

const Line = styled.hr`
  border: 4px solid ${({ theme }) => theme.borderColor.darkGrey};
  margin: 33px 0;
`;

const Detail = styled.div`
  margin: 20px auto 57px auto;
  padding: 0 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DetailLabel = styled.span`
  font-size: 24px;
`;

const DetailValue = styled.span`
  font-size: 32px;
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default {
  Root,
  Product,
  Image,
  Title,
  Line,
  Detail,
  DetailLabel,
  DetailValue,
  SpinnerWrapper,
};
