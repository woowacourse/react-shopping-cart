import { Funnel } from "@/components";
import { Step1, Step2, Step3 } from "..";
import { ShoppingCartProvider } from "./context";

export default function MainPage() {
  return (
    <ShoppingCartProvider>
      <Funnel initialStep={2}>
        <Funnel.Step index={1}>
          <Step1 />
        </Funnel.Step>
        <Funnel.Step index={2}>
          <Step2 />
        </Funnel.Step>
        <Funnel.Step index={3}>
          <Step3 />
        </Funnel.Step>
      </Funnel>
    </ShoppingCartProvider>
  );
}
