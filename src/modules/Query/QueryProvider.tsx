import { createContext, useContext, useState } from "react";
import { Status } from "./types";
import { StrictPropsWithChildren } from "@/types";

interface QueryProviderProps extends StrictPropsWithChildren {}

interface QueryClientContextType {
  getQueryData: (queryKey: string) => unknown;
  setQueryData: (queryKey: string, data: unknown) => void;
  getQueryStatus: (queryKey: string) => Status;
  setQueryStatus: (queryKey: string, status: Status) => void;
}

const QueryClientContext = createContext<QueryClientContextType>({
  getQueryData: () => {
    throw new Error("QueryProvider를 찾을 수 없습니다.");
  },
  setQueryData: () => {
    throw new Error("QueryProvider를 찾을 수 없습니다.");
  },
  getQueryStatus: () => "idle",
  setQueryStatus: () => {
    throw new Error("QueryProvider를 찾을 수 없습니다.");
  },
});
export const useQueryClient = () => useContext(QueryClientContext);

export default function QueryProvider({ children }: QueryProviderProps) {
  const [data, setData] = useState<Record<string, unknown>>({});
  const [status, setStatus] = useState<Record<string, Status>>({});

  const setQueryData = (queryKey: string, data: unknown) => {
    setData((prev) => ({ ...prev, [queryKey]: data }));
  };

  const getQueryData = (queryKey: string) => {
    return data[queryKey];
  };

  const setQueryStatus = (queryKey: string, status: Status) => {
    setStatus((prev) => ({ ...prev, [queryKey]: status }));
  };

  const getQueryStatus = (queryKey: string) => {
    return status[queryKey] ?? "idle";
  };

  return (
    <QueryClientContext.Provider
      value={{
        getQueryData,
        setQueryData,
        getQueryStatus,
        setQueryStatus,
      }}
    >
      {children}
    </QueryClientContext.Provider>
  );
}
