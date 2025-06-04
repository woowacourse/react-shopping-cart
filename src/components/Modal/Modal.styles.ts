import styled from "@emotion/styled";

export const ModalBackDrop = styled.div<{ position: "center" | "bottom" }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: ${(props) =>
    props.position === "center" ? "center" : "flex-end"};
  z-index: 9998;
`;

export const ModalContainer = styled.div<{
  position: "center" | "bottom";
  size: "small" | "medium" | "large";
}>`
  z-index: 9999;
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${(props) => {
    if (props.position === "bottom") return "500px";
    switch (props.size) {
      case "small":
        return "320px";
      case "medium":
        return "480px";
      case "large":
        return "600px";
      default:
        return "60%";
    }
  }};
  height: auto;
  padding: 24px 32px;
  border-radius: 8px;
  background-color: #fff;
  font-family: "Noto Sans KR", sans-serif;
`;

export const StyledTitle = styled.div`
  font-weight: 700;
  font-size: 18px;
  line-height: 100%;
  margin: 10px 0;
`;
export const StyledDescription = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
`;

export const StyledInput = styled.input`
  font-size: 14px;
  color: #333;
  margin: 16px 0;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 12px;
`;

export const StyledCloseButton = styled.button<{
  size?: "small" | "medium" | "large";
}>`
  width: ${(props) => {
    switch (props.size) {
      case "small":
        return "80px";
      case "medium":
        return "160px";
      case "large":
        return "240px";
      default:
        return "80px";
    }
  }};
  padding: 8px 0px;
  border: 1px solid #8b95a1;
  text-align: center;
  font-size: 15px;
  font-weight: 700;
  border-radius: 5px;
  background: #fff;
  color: #333333;
  cursor: pointer;
`;

export const StyledConfirmButton = styled.button<{
  size?: "small" | "medium" | "large";
}>`
  width: ${(props) => {
    switch (props.size) {
      case "small":
        return "80px";
      case "medium":
        return "160px";
      case "large":
        return "240px";
      default:
        return "80px";
    }
  }};
  padding: 8px 0px;
  border: none;
  text-align: center;
  font-size: 15px;
  font-weight: 700;
  border-radius: 5px;
  color: #fff;
  background: #333;
  cursor: pointer;
`;
