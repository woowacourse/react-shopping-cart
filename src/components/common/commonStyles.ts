import styled from '@emotion/styled';

export const Price = styled.span`
  display: block;

  font-size: 24px;
  font-weight: 700;
  line-height: 34.75px;
  text-align: right;
`;

export const Info = styled.p`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

export const InfoIcon = styled.img`
  display: block;
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
`;

export const SubTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
`;

export const Description = styled.p`
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
`;
