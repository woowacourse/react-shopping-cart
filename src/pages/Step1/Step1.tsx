import { Text } from "@/components";
import { CartItemList, Step1Footer, Step1Header } from "./components";
import * as S from "./Step1.styles";

export default function Step1() {
  return (
    <>
      <Step1Header />
      <S.ShoppingCartSection>
        <Text variant="title-1">장바구니</Text>
        <CartItemList />
      </S.ShoppingCartSection>
      <Step1Footer />
    </>
  );
}
