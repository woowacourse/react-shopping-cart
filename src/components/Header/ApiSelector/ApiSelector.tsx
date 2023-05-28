import { ChangeEvent } from 'react';

import * as styled from './ApiSelector.styled';

import { useApiBaseUrlState } from '../../../recoils/recoilApiBaseUrl';

export const ApiSelector = () => {
  const [apiBaseUrlKey, setApiBaseUrlKey] = useApiBaseUrlState();

  const onChange = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    setApiBaseUrlKey(value);
  };

  return (
    <styled.Selector onChange={onChange} value={apiBaseUrlKey}>
      <option value="이리내">이리내</option>
      <option value="채채">채채</option>
    </styled.Selector>
  );
};
