import React, { FC, useState, useEffect, ReactElement } from "react";

import { Container, Inner, RoundContainer } from "./style";

interface AnimationProps {
  Contents: ReactElement<HTMLDivElement>;
  title: string;
}

const Animation: FC<AnimationProps> = ({ Contents, title }) => {
  const [opacity, setOpacity] = useState<number>(0);

  useEffect(() => {
    setOpacity(1);
  }, []);

  return (
    <Container opacity={opacity}>
      <Inner>
        <RoundContainer>{Contents}</RoundContainer>
        <p>{title}</p>
      </Inner>
    </Container>
  );
};

export default Animation;
export { AnimationProps };
