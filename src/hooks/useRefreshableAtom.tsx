import { useEffect, useState } from "react";
import {
  Loadable,
  RecoilState,
  RecoilValue,
  useRecoilStateLoadable,
  useRecoilValueLoadable,
} from "recoil";

function useRefreshableState<T>(loadable: Loadable<T>) {
  const [value, setValue] = useState<T>(() => handleState(loadable.state));

  function handleState(
    state: Loadable<T>["state"],
    options?: { skip: Loadable<T>["state"] }
  ): T {
    if (options?.skip === state) return value;

    switch (state) {
      case "loading":
        throw loadable.toPromise();
      case "hasError":
        throw loadable.contents;
      case "hasValue":
        return loadable.contents;
      default:
        throw new Error("something wrong!");
    }
  }

  useEffect(() => {
    setValue(handleState(loadable.state, { skip: "loading" }));
  }, [loadable]);

  return [value, setValue] as const;
}

export function useRefreshableRecoilValue<T>(recoilValue: RecoilValue<T>) {
  const loadable = useRecoilValueLoadable(recoilValue);
  const [value] = useRefreshableState(loadable);

  return value;
}

export function useRefreshableRecoilState<T>(recoilState: RecoilState<T>) {
  const [loadable, setLoadable] = useRecoilStateLoadable(recoilState);
  const [value] = useRefreshableState(loadable);

  return [value, setLoadable] as const;
}
