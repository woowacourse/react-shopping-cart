import Text from "../common/Text";
import * as S from "./ItemCard.styled";

interface ItemCardProps {
  children: React.ReactNode;
  direction?: "row" | "column";
  gap?: number;
}

const ItemCard = ({ children, direction = "column", gap = 0 }: ItemCardProps) => {
  return (
    <S.ListItem direction={direction} gap={gap}>
      {children}
    </S.ListItem>
  );
};

ItemCard.Top = ({ children }: { children: React.ReactNode }) => {
  return <S.Top>{children}</S.Top>;
};

ItemCard.Content = ({
  children,
  direction = "row",
  verticalPosition = "center",
  gap = 0,
}: {
  children: React.ReactNode;
  direction?: "row" | "column";
  verticalPosition?: "start" | "center" | "end";
  gap?: number;
}) => {
  return (
    <S.Content direction={direction} gap={gap} verticalPosition={verticalPosition}>
      {children}
    </S.Content>
  );
};

ItemCard.Image = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <S.Image>
      <img
        src={src}
        alt={alt}
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://www.next-t.co.kr/public/uploads/7b7f7e2138e29e598cd0cdf2c85ea08d.jpg";
        }}
      />
    </S.Image>
  );
};

ItemCard.Information = ({
  children,
  direction = "column",
  gap = 0,
}: {
  children: React.ReactNode;
  direction?: "row" | "column";
  gap?: number;
}) => {
  return (
    <S.Information direction={direction} gap={gap}>
      {children}
    </S.Information>
  );
};

ItemCard.Title = ({ text }: { text: string }) => {
  return <Text variant="body-3">{text}</Text>;
};

ItemCard.Price = ({ price }: { price: number }) => {
  return <Text>{price.toLocaleString()}원</Text>;
};

export default ItemCard;
