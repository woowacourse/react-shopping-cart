import { useEffect, useState } from "react";

import { PropsWithChildren, createContext, useContext } from "react";

interface FunnelContextType {
  step: number;
  goNextStep: () => void;
  goPrevStep: () => void;
  goToStep: (step: number) => void;
}

export const FunnelContext = createContext<FunnelContextType | null>(null);

const getCurrentStep = () => Number(new URLSearchParams(window.location.search).get("step"));
interface FunnelProps {
  initialStep?: number;
}
export default function Funnel({ children, initialStep = 1 }: PropsWithChildren<FunnelProps>) {
  const [step, setStep] = useState(initialStep);

  const goNextStep = () => {
    setStep((step) => step + 1);
    history.pushState(null, "", `?step=${step + 1}`);
  };

  const goPrevStep = () => {
    setStep((step) => step - 1);
    history.back();
  };

  const goToStep = (step: number) => {
    setStep(step);
    history.pushState(null, "", `?step=${step}`);
  };

  useEffect(() => {
    setStep(getCurrentStep() || initialStep);

    const handlePopState = () => {
      setStep(getCurrentStep() || initialStep);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [initialStep]);

  console.log(step);

  return <FunnelContext.Provider value={{ step, goNextStep, goPrevStep, goToStep }}>{children}</FunnelContext.Provider>;
}

export const useFunnelContext = () => {
  const value = useContext(FunnelContext);

  if (value === null) throw new Error(`FunnelContext value must be used within a FunnelProvider Component!!`);

  return value;
};

interface StepProps {
  index: number;
}

export function Step({ children, index }: PropsWithChildren<StepProps>) {
  const { step } = useFunnelContext();

  if (step !== index) return null;
  return <>{children}</>;
}

Funnel.Step = Step;
