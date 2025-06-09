import Text from "../../common/Text";
import * as S from "./CartItem.styled";

interface CartItemProps {
  children: React.ReactNode;
  direction?: "row" | "column";
  gap?: number;
}

const CartItem = ({ children, direction = "column", gap = 0 }: CartItemProps) => {
  return (
    <S.ListItem direction={direction} gap={gap}>
      {children}
    </S.ListItem>
  );
};

CartItem.Top = ({ children }: { children: React.ReactNode }) => {
  return <S.Top>{children}</S.Top>;
};

CartItem.Content = ({
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

CartItem.Image = ({ src, alt }: { src: string; alt: string }) => {
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

CartItem.Information = ({
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

CartItem.Title = ({ text }: { text: string }) => {
  return <Text variant="title-2">{text}</Text>;
};

CartItem.Price = ({ price }: { price: number }) => {
  return <Text variant="body-2">{price.toLocaleString()}원</Text>;
};

export default CartItem;
