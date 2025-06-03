import Description from "../@common/Description/Description";
import * as S from "./InfoMessage.styles";

interface Props {
  message: string;
  imageSrc?: string;
  imageAlt?: string;
}

const InfoMessage = ({ ...props }: Props) => {
  return (
    <S.InfoContainer>
      {props.imageSrc && (
        <img src={props.imageSrc} alt={props.imageAlt || "info"} />
      )}
      <Description>{props.message}</Description>
    </S.InfoContainer>
  );
};

export default InfoMessage;
