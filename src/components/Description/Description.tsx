import { Title, Subtitle, Container } from "./Description.styles";

interface DescriptionProps {
  cartItemCount: number;
}

function Description({ cartItemCount }: DescriptionProps) {
  return (
    <section css={Container}>
      <p css={Title}>장바구니</p>
      {cartItemCount !== 0 && (
        <p
          css={Subtitle}
        >{`현재 ${cartItemCount}종류의 상품이 담겨있습니다.`}</p>
      )}
    </section>
  );
}

export default Description;
