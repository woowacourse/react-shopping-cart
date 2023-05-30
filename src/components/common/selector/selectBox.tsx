import { PropsWithChildren } from "react";
import { SelectBoxProvider } from "../../../context/selector";

export default function SelectBox(props: PropsWithChildren) {
  const { children } = props;

  return <SelectBoxProvider>{children}</SelectBoxProvider>;
}
