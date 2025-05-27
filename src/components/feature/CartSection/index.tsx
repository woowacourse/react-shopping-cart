import * as S from "./CartSection.styles";
import Card from "./CartProducts/Card";
import Header from "./Header";

const CartSection = () => {
  return (
    <S.Container>
      <Header />
      <Card />
    </S.Container>
  );
};

export default CartSection;
