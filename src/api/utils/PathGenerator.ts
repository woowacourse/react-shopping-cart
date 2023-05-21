import type { ExtractPathFromRestAPI, RestAPI } from '../rest/RestAPI';
import type { HttpMethod } from './http';

class PathGenerator<
  TRestAPI extends RestAPI,
  Method extends HttpMethod,
  Path extends ExtractPathFromRestAPI<TRestAPI, Method>,
> {
  private path: Path;

  internalParams: Extract<TRestAPI['request'], { method: Method; path: Path }>['params'];

  internalQueryParams:
    | Extract<TRestAPI['request'], { method: Method; path: Path }>['queryParams']
    | null = null;

  constructor(
    path: Path,
    ...params: Extract<TRestAPI['request'], { method: Method; path: Path }>['params']
  ) {
    this.path = path;
    this.internalParams = params;
  }

  queryParams(queryParams: (typeof this)['internalQueryParams']) {
    this.internalQueryParams = queryParams;
    return this;
  }

  toString(): string {
    const copiedParams = [...this.internalParams];
    const path = this.path
      .split('/')
      .map((pathToken) => (pathToken.startsWith(':') ? copiedParams.shift() : pathToken))
      .join('/');

    const queryParams =
      Object.keys(this.internalQueryParams ?? {}).length === 0
        ? ''
        : `?${new URLSearchParams(this.internalQueryParams ?? {}).toString()}`;

    return path + queryParams;
  }
}

export default PathGenerator;
