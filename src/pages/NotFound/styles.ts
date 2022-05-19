import styled from "styled-components";

const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    margin-bottom: 10px;
  }

  button {
    border: none;
    padding: 10px;
    background-color: ${({ theme }) => theme.colors.GRAY_800};
    color: ${({ theme }) => theme.colors.GRAY_50};
    border-radius: 10px;
  }
`;

export { NotFoundWrapper };
