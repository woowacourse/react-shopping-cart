import styled from 'styled-components';

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const Font = styled.span`
  font-size: ${(props) => props.fontSize || '16px'};

  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.5px;
`;
export {FlexColumn, FlexRow, Font};
