import styled from "@emotion/styled";

export const CartPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacer.spacing5};
`;

export const CartListWrapper = styled.div`
  flex: 1;
`;

export const CartHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacer.spacing2};
  text-align: start;
`;
