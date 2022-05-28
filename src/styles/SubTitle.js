import styled from 'styled-components';

export default styled.h2`
  width: 100%;
  padding-bottom: 30px;
  text-align: center;
  font-size: 3.2rem;
  color: ${({ theme }) => theme.black};
  border-bottom: 4px solid ${({ theme }) => theme.black};
`;
