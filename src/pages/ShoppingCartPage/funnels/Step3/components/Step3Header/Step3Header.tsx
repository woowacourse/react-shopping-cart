import { Header } from "@/components";
import { useFunnelContext } from "@/modules";

export default function Step3Header() {
  const { goPrevStep } = useFunnelContext();

  return <Header onClick={goPrevStep} />;
}
