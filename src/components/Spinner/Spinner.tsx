import styled from 'styled-components';
import ICONS from '../../constants/icons';

function Spinner() {
  return (
    <StyledSpinner>
      {ICONS.SPINNER}
      <span className="visually-hidden">Loading...</span>
    </StyledSpinner>
  );
}

const StyledSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .spinner {
    width: 2rem;
    height: 2rem;
    fill: ${({ theme: { colors } }) => colors.gray};
    color: transparent;

    animation: spin 1s linear infinite;

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
`;

export default Spinner;
