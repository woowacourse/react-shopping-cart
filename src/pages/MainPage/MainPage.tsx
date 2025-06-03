import { Funnel } from "@/components";
import { Step1, Step2, Step3 } from "..";
import { useState } from "react";

export default function MainPage() {
  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);

  return (
    <>
      <Funnel initialStep={2}>
        <Funnel.Step index={1}>
          <Step1 selectedItemIds={selectedItemIds} setSelectedItemIds={setSelectedItemIds} />
        </Funnel.Step>
        <Funnel.Step index={2}>
          <Step2 selectedItemIds={selectedItemIds} />
        </Funnel.Step>
        <Funnel.Step index={3}>
          <Step3 />
        </Funnel.Step>
      </Funnel>
    </>
  );
}
