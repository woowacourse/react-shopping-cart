import { Funnel } from "@/components";
import { Step1 } from "..";

export default function MainPage() {
  return (
    <>
      <Funnel>
        <Funnel.Step index={1}>
          <Step1 />
        </Funnel.Step>
        <Funnel.Step index={2}>
          <div>2</div>
        </Funnel.Step>
        <Funnel.Step index={3}>
          <div>3</div>
        </Funnel.Step>
      </Funnel>
    </>
  );
}
