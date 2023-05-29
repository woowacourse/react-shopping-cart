import { ERROR_CODE } from '../constants/errors';
import { getValidURL, handleStatusCode } from '../validation/errorHandler';
import { CustomError } from '../validation/errors';

const BASE =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/react-shopping-cart/'
    : 'https://n0eyes.github.io/react-shopping-cart/';

export type FetchQueryInstance = {
  [m in Method]: <T>(path: string, config?: ExternalConfig) => Promise<T>;
};

type Method = 'get' | 'post' | 'patch' | 'delete';
type QueryParams = Parameters<FetchQueryInstance[Method]>;
type QueryParamsWith<Config extends RequestInit> = [QueryParams[0], Config];
type InternalConfig = Omit<ExternalConfig, 'body'> & RequestInit;
type ExternalConfig = Omit<RequestInit, 'body'> & {
  baseURL?: string;
  body?: unknown;
};

class FetchQuery implements FetchQueryInstance {
  defaultConfig: ExternalConfig = {};

  constructor(defaultConfig?: ExternalConfig) {
    this.defaultConfig = defaultConfig ?? {};
  }

  private getComposedConfigWithDefault(externalConfig?: ExternalConfig) {
    return { ...this.defaultConfig, ...externalConfig };
  }

  private getValidArgs(
    args: [Method, ...QueryParams]
  ): QueryParamsWith<InternalConfig> {
    const [method, path, config] = args;

    if (!config?.method || method === config.method) {
      const composedConfig = this.getComposedConfigWithDefault(config);

      return [
        path,
        {
          ...composedConfig,
          method,
          body: JSON.stringify(composedConfig.body),
        },
      ];
    }

    throw new CustomError({ code: ERROR_CODE.WRONG_METHOD });
  }

  private async fetchQuery<T>(
    path: string,
    config?: InternalConfig
  ): Promise<T> {
    const url = getValidURL(
      path,
      config?.baseURL ?? this.defaultConfig.baseURL
    );

    const response = await fetch(url, config);
    const body = await response.json();

    if (!response.ok) handleStatusCode(response.status);

    return body;
  }

  private request<T>(...args: [Method, ...QueryParams]): Promise<T> {
    const validArgs = this.getValidArgs(args);

    return this.fetchQuery(...validArgs);
  }

  get<T>(...args: QueryParams): Promise<T> {
    return this.request<T>('get', ...args);
  }

  post<T>(...args: QueryParams): Promise<T> {
    return this.request<T>('post', ...args);
  }

  patch<T>(...args: QueryParams): Promise<T> {
    return this.request<T>('patch', ...args);
  }

  delete<T>(...args: QueryParams): Promise<T> {
    return this.request<T>('delete', ...args);
  }

  create(defaultConfig: ExternalConfig) {
    return new FetchQuery(defaultConfig);
  }
}

export const fetchQuery = new FetchQuery({ baseURL: BASE });
