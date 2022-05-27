import styled from "@emotion/styled";

const StyledHeader = styled.header`
  background-color: ${(props) => props.theme.colors.green};

  position: sticky;
  z-index: 999;
  top: 0;
  right: 0;
  left: 0;

  .logo-link {
    flex-shrink: 0;
    width: 300px;
  }
`;

export default StyledHeader;
