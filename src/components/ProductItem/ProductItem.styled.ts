import styled from 'styled-components';

export const ProductItem = styled.li`
  width: 100%;
  height: 100%;
`;

export const ProductDetailDiv = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 8px 0;
`;

export const NameParagraph = styled.p`
  max-width: 186px;
  height: 25.02px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  color: #333333;
`;

export const PriceParagraph = styled.p`
  max-width: 186px;
  height: 32.72px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  letter-spacing: 0.5px;

  color: #333333;
`;
