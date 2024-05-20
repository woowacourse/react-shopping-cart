import styled from "@emotion/styled";

export const Container = styled.div`
  max-width: 382px;
  width: 100%;
  margin: 0 auto;
`;

export const Info = styled.p`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.text};

  svg {
    margin-right: 8px;
  }
`;

export const InfoIcon = styled.img`
  display: block;
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;

export const PriceRow = styled.div`
  height: 42px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 20px;
  font-weight: bold;
`;

export const PriceRowContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;

  margin: 12px 0;

  background-color: ${({ theme }) => theme.colors.divider};
`;

export const Label = styled.span`
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
`;

export const Price = styled.span`
  display: block;

  font-size: 24px;
  font-weight: 700;
  line-height: 34.75px;
  text-align: right;
`;
