import { createContext, useContext, PropsWithChildren } from "react";
import { useFunnel } from "@/hooks/Funnel/useFunnel";
import { steps } from "@/constants/steps";
import { StepProps, FunnelProps } from "@/hooks/Funnel/useFunnel";

interface FunnelContextType {
  Funnel: React.ComponentType<FunnelProps>;
  Step: React.ComponentType<StepProps>;
  setStep: (step: string) => void;
  currentStep: string;
  nextClickHandler: (nextStep: string) => void;
  prevClickHandler: (prevStep: string) => void;
  resetClickHandler: () => void;
}

const FunnelContext = createContext<FunnelContextType | null>(null);

export const useFunnelContext = () => {
  const context = useContext(FunnelContext);
  if (!context) {
    throw new Error("useFunnelContext must be used within a FunnelProvider");
  }
  return context;
};

interface FunnelProviderProps extends PropsWithChildren {}

export const FunnelProvider = ({ children }: FunnelProviderProps) => {
  const { Funnel, Step, setStep, currentStep } = useFunnel(steps[0]);

  const nextClickHandler = (nextStep: string) => {
    setStep(nextStep);
  };

  const prevClickHandler = (prevStep: string) => {
    setStep(prevStep);
  };

  const resetClickHandler = () => {
    setStep(steps[0]);
  };

  const value: FunnelContextType = {
    Funnel,
    Step,
    setStep,
    currentStep,
    nextClickHandler,
    prevClickHandler,
    resetClickHandler,
  };

  return (
    <FunnelContext.Provider value={value}>{children}</FunnelContext.Provider>
  );
};
