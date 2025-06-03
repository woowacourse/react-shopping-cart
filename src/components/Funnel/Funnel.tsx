import { useState } from "react";

import { PropsWithChildren, createContext, useContext } from "react";

interface FunnelContextType {
  step: number;
  goNextStep: () => void;
  goPrevStep: () => void;
}

interface FunnelProps {}

export const FunnelContext = createContext<FunnelContextType | null>(null);

export default function Funnel({ children }: PropsWithChildren<FunnelProps>) {
  const [step, setStep] = useState(1);

  const goNextStep = () => {
    setStep((step) => step + 1);
  };

  const goPrevStep = () => {
    setStep((step) => step - 1);
  };

  return <FunnelContext.Provider value={{ step, goNextStep, goPrevStep }}>{children}</FunnelContext.Provider>;
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
