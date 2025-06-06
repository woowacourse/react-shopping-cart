import { ReactElement, ReactNode, useEffect, useState } from "react";

export interface StepProps {
  name: string;
  children: ReactNode;
}
export interface FunnelProps {
  children: Array<ReactElement<StepProps>>;
}

const TRANSITION_MS = 300; // CSS 타이밍과 반드시 맞추기

export const useFunnel = (defaultStep: string) => {
  const [step, setStep] = useState(defaultStep); // 현재 단계
  const [prev, setPrev] = useState<string | null>(null); // 나가는 단계

  const Step = ({ children }: StepProps) => <>{children}</>;

  const Funnel = ({ children }: FunnelProps) => {
    useEffect(() => {
      if (!prev && step) return; // 초기 렌더는 건너뜀
      setPrev(step); // 나갈 대상 지정
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
