import * as S from "./Modal.styles";
import closeIcon from "/icon/ic_close.svg";
import { Title } from "../../../styles/@common/title/Title.styles";
import useOutsideClick from "../../../hooks/@common/useOutsideClick";
import ModalPortal from "./ModalPortal";

interface ModalProps {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ title, content, onClose }: ModalProps) => {
  const { ref } = useOutsideClick({ callback: onClose });

  return (
    <ModalPortal>
      <div css={S.modalBackground}>
        <div css={S.modalContainer} ref={ref}>
          <div css={S.modalHeaderContainer}>
            <p css={Title}>{title}</p>
            <button type="button" onClick={onClose}>
              <img src={closeIcon} alt="모달 닫기" />
            </button>
          </div>

          {content}
        </div>
      </div>
    </ModalPortal>
  );
};

export default Modal;
