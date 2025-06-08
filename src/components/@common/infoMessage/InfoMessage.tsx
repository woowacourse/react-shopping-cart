import * as S from "./InfoMessage.styles";
import infoIcon from "/icon/ic_info.svg";
import { Description } from "../../../styles/@common/title/Title.styles";

interface InfoMessageProps {
  message: string;
}

export const InfoMessage = ({ message }: InfoMessageProps) => {
  return (
    <div css={S.InfoMessageContainer}>
      <img src={infoIcon} alt="information icon" />
      <p css={Description}>{message}</p>
    </div>
  );
};
