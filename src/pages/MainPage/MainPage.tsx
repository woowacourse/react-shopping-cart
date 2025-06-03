import { Funnel } from "@/components";
import { Step1, Step2, Step3 } from "..";

export default function MainPage() {
  return (
    <>
      <Funnel>
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
    </>
  );
}
