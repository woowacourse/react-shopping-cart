import styled from "@emotion/styled";

export const HeaderContainer = styled.header(({ theme }) => ({
  background: `${theme.colors.black}`,
  width: "100%",
  height: "64px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: `${theme.spacer.spacing3}`,
  img: {
    height: "16px",
  },
}));

export const HeaderButtonContainer = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacer.spacing2};
`;
