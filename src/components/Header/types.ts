import { NavigateFunction } from "react-router";

export interface HeaderConfigFunction {
  (navigate: NavigateFunction): JSX.Element;
}

export interface HeaderConfig {
  [key: string]: HeaderConfigFunction;
}
