import styled from 'styled-components';

export default styled.div`
  display: flex;
  gap: 44px;

  font-size: 20px;
  text-shadow: -0.5px 0 ${({ theme: { colors } }) => colors.gray},
    0 0.5px ${({ theme: { colors } }) => colors.gray},
    0.5px 0 ${({ theme: { colors } }) => colors.gray},
    0 -0.5px ${({ theme: { colors } }) => colors.gray};

  a:hover {
    font-weight: 900;
  }
`;
