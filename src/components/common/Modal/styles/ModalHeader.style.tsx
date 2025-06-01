import styled from "@emotion/styled";

export const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderContainer = styled.div`
  position: relative;
`;

export const CloseButton = styled.button`
  &:hover {
    cursor: pointer;
  }
`;

export const Title = styled.h2`
  font-family: "Noto Sans KR";
  font-weight: 700;
  font-size: 18px;
  margin: 0;
  margin-block: 0;
  margin-inline: 0;
  line-height: 100%;
  letter-spacing: 0px;
  vertical-align: middle;
  width: fit-content;
  white-space: nowrap;
`;
