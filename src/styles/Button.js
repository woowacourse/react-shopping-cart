import styled from 'styled-components';

export default styled.button`
  cursor: pointer;
  border: none;
  background-color: ${({ theme }) => theme.green};
  color: white;
  font-size: 2.4rem;
  transition: opacity 0.2s;

  width: 100%;
  height: 73px;

  &:hover {
    opacity: 0.6;
  }
`;
