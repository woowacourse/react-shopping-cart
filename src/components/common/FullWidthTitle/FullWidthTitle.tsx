import styled from "styled-components";

interface FullWidthTitleProps {
  children: string;
}

const FullWidthTitle = ({ children }: FullWidthTitleProps) => {
  return (
    <Container>
      <Title>{children}</Title>
      <BottomBorder />
    </Container>
  );
};

const colors = {
  lightGold: "#ffe8a4",
  goldGradient:
    "linear-gradient(90deg, #a47a1e 0%, #d3a84c 15%, #fff699 30%, #e6be69 50%, #ffd87c 67%, #b58f3e 84%, #956d13 100%);",
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 98px;
`;

const Title = styled.div`
  height: 96px;
  line-height: 96px;
  font-size: 32px;
  text-align: center;
  font-weight: 600;
  color: ${colors.lightGold};
  font-family: "Noto Sans KR";
  letter-spacing: 0.5px;
`;

const BottomBorder = styled.div`
  height: 2px;
  background: ${colors.goldGradient};
`;

export default FullWidthTitle;
