import infoOutline from "@/assets/images/infoOutline.png";
import * as S from "./styled";

interface NotificationText {
  text: string;
}

const NotificationText = ({ text }: NotificationText) => {
  return (
    <S.Container>
      <img src={infoOutline} />
      <div>{text}</div>
    </S.Container>
  );
};

export default NotificationText;
