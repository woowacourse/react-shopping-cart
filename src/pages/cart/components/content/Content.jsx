import StyledContent from "@/pages/cart/components/content/Content.styled";

function Content({ children }) {
  return (
    <StyledContent>
      <div>{children}</div>
    </StyledContent>
  );
}

export default Content;
