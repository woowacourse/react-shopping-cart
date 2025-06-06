import { Funnel } from "@/components";
import { ShoppingCartProvider } from "./contexts";
import { Step1, Step2, Step3 } from "./funnels";

export default function ShoppingCartPage() {
  return (
    <ShoppingCartProvider>
      <Funnel initialStep={1}>
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
