import styled from "styled-components";

const PageTitle = styled.h1`
  border-bottom: 3px solid ${({ theme }) => theme.colors.GRAY_800};
  text-align: center;
  padding-bottom: 10px;
  font-size: 25px;
`;

export default PageTitle;
