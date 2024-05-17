import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  height: calc(100vh - 210px);
  width: 100%;
  text-align: center;
`;

export const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 18px;
`;

export const PriceWrapper = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.ExtraBold};
`;

export const PriceText = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 16px;
`;

export const Price = styled.div`
  margin-top: 12px;
  font-size: ${({ theme }) => theme.fontSize.xl};
  line-height: 35px;
`;
