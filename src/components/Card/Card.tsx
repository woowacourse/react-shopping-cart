import Text from "../Text/Text";
import * as S from "./Card.styles";

export default function Card({ children }: { children: React.ReactNode }) {
  return <S.CardWrapper>{children}</S.CardWrapper>;
}

function Image({ src, alt }: { src: string; alt: string }) {
  return <S.CardImage src={src} alt={alt} />;
}

function Info({ children }: { children: React.ReactNode }) {
  return <S.CardInfo>{children}</S.CardInfo>;
}

function Name({ children }: { children: React.ReactNode }) {
  return <Text variant="body-1">{children}</Text>;
}

function Description({ children }: { children: React.ReactNode }) {
  return <Text variant="title-2">{children}</Text>;
}

Card.Image = Image;
Card.Info = Info;
Card.Name = Name;
Card.Description = Description;
