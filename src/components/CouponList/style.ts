import styled from "@emotion/styled";

export const CouponListTitle = styled.div`
  display: flex;
  gap: 5px;
`;

interface CouponListSectionProps {
  isApplicable: boolean;
}

export const CouponListDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacer.spacing1};

  p {
    padding: 0;
    margin: 0;
    })}
  }
`;

export const CouponListSection = styled.section<CouponListSectionProps>`
  height: 110px;
  color: ${({ theme, isApplicable }) =>
    isApplicable ? theme.colors.black : theme.colors.gray};
`;
