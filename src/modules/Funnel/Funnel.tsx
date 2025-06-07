import { useEffect, useState } from "react";

import { PropsWithChildren, createContext, useContext } from "react";
import { getCurrentStep } from "./util";
import { History } from "../History";

interface FunnelContextType {
  step: number;
  goNextStep: () => void;
  goPrevStep: () => void;
  resetStep: () => void;
}

export const FunnelContext = createContext<FunnelContextType | null>(null);

interface FunnelProps {
  initialStep?: number;
}

export default function Funnel({ children, initialStep = 1 }: PropsWithChildren<FunnelProps>) {
  const [step, setStep] = useState(initialStep);

  const goNextStep = () => {
    setStep((step) => step + 1);
    History.push({ url: `?step=${step + 1}` });
  };

  const goPrevStep = () => {
    setStep((step) => step - 1);
    History.back();
  };

  const resetStep = () => {
    setStep(initialStep);
    History.push({ url: `?step=${initialStep}` });
  };

  useEffect(() => {
    setStep(getCurrentStep(initialStep));

    const handlePopState = () => setStep(getCurrentStep(initialStep));

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [initialStep]);

  return (
    <FunnelContext.Provider value={{ step, goNextStep, goPrevStep, resetStep }}>{children}</FunnelContext.Provider>
  );
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
