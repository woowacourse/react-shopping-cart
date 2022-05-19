import ErrorCase from './ErrorCase';
import LoadingCase from './LoadingCase';
import SuccessCase from './SuccessCase';

export { default as Then } from './Then';
export { default as IfAsync } from './IfAsync';

export const Case = { Success: SuccessCase, Loading: LoadingCase, Error: ErrorCase };
export { default as SwitchAsync } from './SwitchAsync';
