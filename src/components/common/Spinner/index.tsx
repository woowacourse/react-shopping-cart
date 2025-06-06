import { Container, SpinnerElement } from "./Spinner.style";

interface SpinnerProps {
  size?: "small" | "medium" | "large";
}

const Spinner = ({ size = "medium" }: SpinnerProps) => {
  return (
    <Container data-testid="loading-spinner">
      <SpinnerElement size={size} />
    </Container>
  );
};

export default Spinner;
