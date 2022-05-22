import styled from "@emotion/styled";

const StyledHeader = styled.header`
  background-color: #03cf5b;
  margin-bottom: 25px;

  position: sticky;
  z-index: 999;
  top: 0;
  right: 0;
  left: 0;

  .logo-link {
    padding: 10px 0;
    flex-shrink: 0;
    width: 300px;
  }
`;

export default StyledHeader;
