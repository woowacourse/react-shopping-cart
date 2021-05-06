import styled from 'styled-components';
import Container from '../../shared/Container';

export const ContentContainer = styled(Container)`
  padding: 0 0.875rem;

  img {
    width: 2rem;
    height: 2rem;
  }
`;

ContentContainer.defaultProps = {
  direction: 'row',
  justifyContent: 'space-between',
  alignCenter: true,
};
