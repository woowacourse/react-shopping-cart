import styled from "@emotion/styled";
import Flex from "../Flex";

type MessageType = "error" | "info";

interface ToastMeesageProps {
  message: string;
  type: MessageType;
  onClose: () => void;
}

function ToastMessage({ message, type, onClose }: ToastMeesageProps) {
  setTimeout(() => {
    if (onClose) {
      onClose();
    }
  }, 3000);
  return (
    <Container>
      <Wrapper type={type}>
        <ErrorText>{message}</ErrorText>
      </Wrapper>
    </Container>
  );
}

const MESSAGE_TYPE_COLOR_MAP: Record<MessageType, string> = {
  error: "#FFC9C9",
  info: "#ffffff",
};

const Container = styled.div`
  width: 100%;
`;

const Wrapper = styled(Flex)<{ type: MessageType }>`
  width: 400px;
  height: 40px;
  background-color: ${({ type }) => MESSAGE_TYPE_COLOR_MAP[type]};
  border-radius: 8px;
`;

const ErrorText = styled.p`
  font-size: 16px;
`;
export default ToastMessage;
