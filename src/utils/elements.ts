import { Attributes, Children, cloneElement, isValidElement } from "react";

export function createCustomElement<T>(
  children: any,
  props: (Partial<T> & Attributes) | undefined
) {
  const customElement = Children.only(children);
  if (isValidElement<T>(customElement)) {
    return cloneElement(customElement, props);
  }
  throw Error("Not Valid Element!");
}
