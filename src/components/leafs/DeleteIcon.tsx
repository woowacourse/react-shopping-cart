import styled from 'styled-components';

export default function DeleteIcon() {
  return (
    <>
      <Img src="./delete.svg" />
    </>
  );
}

const Img = styled.img`
  width: 24px;
  height: 24px;

  cursor: pointer;
`;
