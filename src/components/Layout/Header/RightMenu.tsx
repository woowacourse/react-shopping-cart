import styled from 'styled-components';
import PlainLink from '../../../styles/PlainLink';

export default styled.div`
  display: flex;
  gap: 44px;
  font-size: 24px;
  font-weight: 500;

  ${PlainLink}:hover {
    font-weight: 700;
  }
`;
