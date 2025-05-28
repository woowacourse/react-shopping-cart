import { ReactElement, useCallback, useState } from 'react';

type StepProps<T> = {
  name: T;
  children: React.ReactNode;
};

export const useFunnel = <T extends string>(stepNames: T) => {
  const [step, setStep] = useState<T>(stepNames);

  const StepComponent = useCallback(
    ({ children }: { children: ReactElement<StepProps<T>>[] }) => {
      const stepComponentIndex = children.findIndex((child) => child.props.name === step);
      const StepComponent = children[stepComponentIndex];

      return <>{StepComponent}</>;
    },
    [step]
  );

  const Step = useCallback(({ children }: StepProps<T>) => {
    return <>{children}</>;
  }, []);

  const Funnel = Object.assign(StepComponent, { Step });

  return { Funnel, setStep };
};
