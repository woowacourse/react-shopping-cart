import styled from '@emotion/styled';

const Container = styled.div`
  width: 250px;
  height: 120px;
  border: 1px solid #dddddd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const CloseButton = styled.div`
  margin: 5px;
  width: 30px;
  position: absolute;
  right: 3px;
  top: 3px;
  cursor: pointer;
  background: none;
  border: none;

  svg {
    display: block;
    pointer-events: none;

    path {
      stroke: gray;
      fill: transparent;
      stroke-linecap: round;
      stroke-width: 2;
      pointer-events: none;
    }
  }
`;

export { Container, CloseButton };
