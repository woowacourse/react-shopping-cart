import styled from 'styled-components';

export const TotalPrice = styled.div`
  width: 496px;
  display: inline-block;
  color: ${({ theme }) => theme.TEXT_COLOR};
`;

export const Title = styled.div`
  padding-bottom: 24px;
  font-weight: bold;
  font-size: 28px;
  line-height: 28px;
  letter-spacing: 0.5px;
  border-bottom: 3px solid ${({ theme }) => theme.GRAY_200};
`;

export const Container = styled.div`
  padding-top: 73px;
`;

export const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PriceLabel = styled.span`
  position: relative;
  font-size: 24px;
  line-height: 24px;
  letter-spacing: 0.5px;
  font-weight: bold;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 6px;
    background-color: ${({ theme }) => theme.PRIMARY_COLOR};
    opacity: 0.4;
  }
`;

export const Price = styled.span`
  position: relative;
  font-size: 24px;
  line-height: 24px;
  letter-spacing: 0.5px;
  font-weight: bold;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 6px;
    background-color: ${({ theme }) => theme.PRIMARY_COLOR};
    opacity: 0.4;
  }
`;
