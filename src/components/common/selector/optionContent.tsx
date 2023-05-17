import { PropsWithChildren } from "react";

interface OptionContentProps {
  asChild?: boolean;
  children?: React.ReactElement | React.ReactElement[] | undefined;
}

export function OptionContent(props: OptionContentProps) {
  const { children, asChild = false } = props;
  return <div data-testid="content">{children}</div>;
}
