import { useState } from 'react';

export interface DataState<T> {
  data: T;
  isLoading: boolean;
  error: string | null;
}

export const useDataManager = <T>(initialData: T) => {
  const [state, setState] = useState<DataState<T>>({
    data: initialData,
    isLoading: false,
    error: null,
  });

  const updateState = (updates: Partial<DataState<T>>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const withErrorHandling = async <R>(operation: () => Promise<R>): Promise<R | undefined> => {
    const prevData = state.data;
    try {
      updateState({ isLoading: true, error: null });
      const result = await operation();
      if (result !== undefined) {
        updateState({ data: result as T });
      }
      return result;
    } catch (error) {
      updateState({
        data: prevData,
        error: error instanceof Error ? error.message : '오류가 발생했습니다',
      });
      return undefined;
    } finally {
      updateState({ isLoading: false });
    }
  };

  return {
    state,
    updateState,
    withErrorHandling,
  };
};
