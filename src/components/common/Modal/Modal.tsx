import styled from "styled-components";

interface ModalProps {
  onClose: () => void;
  text: string;
}
const Modal = ({ onClose, text }: ModalProps) => {
  return (
    <Style.Container>
      <Style.BackDrop />
      <Style.Content>
        <Style.TopSection>
          <Style.Message>{text}</Style.Message>
        </Style.TopSection>
        <Style.Button onClick={onClose}>
          <Style.Message>닫기</Style.Message>
        </Style.Button>
      </Style.Content>
    </Style.Container>
  );
};

export default Modal;

const Style = {
  Container: styled.div`
    z-index: 10;
    overflow: hidden;
  `,
  BackDrop: styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    background: #d9d9d953;
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);

    width: 250px;
    height: 120px;

    background: #fff;
    border-radius: 5px;
    border: 1px solid #000000;
    text-align: center;
  `,
  TopSection: styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 250px;
    height: 80px;
    align-items: center;
  `,
  Message: styled.h2`
    font-weight: bold;
    font-size: 20px;
    letter-spacing: 0.5px;

    word-break: keep-all;
  `,
  Button: styled.button`
    width: 250px;
    height: 40px;
    align-items: center;
    text-align: center;
    background-color: transparent;
    border-top: 1px solid #000000;
    border-radius: 5px;
  `,
};
