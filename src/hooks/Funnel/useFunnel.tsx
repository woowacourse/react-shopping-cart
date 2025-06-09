import { ReactElement, PropsWithChildren, useEffect, useState } from "react";

export interface StepProps extends PropsWithChildren {
  name: string;
}
export interface FunnelProps {
  children: Array<ReactElement<StepProps>>;
}

const TRANSITION_MS = 300;

export const useFunnel = (defaultStep: string) => {
  const [step, setStep] = useState(defaultStep);
  const [prev, setPrev] = useState<string | null>(null);

  const Step = ({ children }: StepProps) => <>{children}</>;

  const Funnel = ({ children }: FunnelProps) => {
    useEffect(() => {
      if (!prev && step) return;
      setPrev(step);
      const id = setTimeout(() => setPrev(null), TRANSITION_MS);
      return () => clearTimeout(id);
    }, [step]);

    const render = (name: string | null, phase: "enter" | "exit") => {
      if (!name) return null;
      const el = children.find((c) => c.props.name === name);
      if (!el) return null;
      return (
        <div key={name} className={`funnel-step ${phase}`}>
          {el}
        </div>
      );
    };

    return (
      <div className="funnel-wrapper">
        {render(prev, "exit")}
        {render(step, "enter")}
      </div>
    );
  };

  return { Funnel, Step, setStep, currentStep: step } as const;
};
