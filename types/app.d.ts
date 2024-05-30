declare const _brand: unique symbol;

declare global {
  /**
   * Custom utility types
   */
  export type Nullable<T> = T | null;

  export type Keys<T extends Record<string, unknown>> = keyof T;

  export type Values<T extends Record<string, unknown>> = T[Keys<T>];

  export type Indexed<T = unknown> = { [key: string]: T };

  export type Brand<K, T> = K & { [_brand]: T };

  /**
   * Type aliases
   */
  export type KRW = number;

  export type Url = string;

  export type CartItemId = Brand<number, 'CartItemId'>;

  export type ProductId = Brand<number, 'ProductId'>;
}

export {};
