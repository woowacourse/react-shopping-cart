import { ReactNode } from "react";
import styled from "styled-components";

const Page = ({ children }: { children: ReactNode }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.section`
  display: flex;

  padding: 110px 5%;
`;

export default Page;
