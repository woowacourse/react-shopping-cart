import { RecoilRoot } from "recoil";
import { Header } from "../layout/header/Header";
import { Meta } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "../GlobalStyle";

const meta = {
  title: "Header",
  component: Header,
  decorators: [
    (Story) => {
      return (
        <BrowserRouter>
          <RecoilRoot>
            <GlobalStyle />
            {Story()}
          </RecoilRoot>
        </BrowserRouter>
      );
    },
  ],
} satisfies Meta<typeof Header>;

export default meta;

export const HeaderComponent = () => <Header />;
