// eslint-disable-next-line max-classes-per-file
import type { HttpMethod } from './http';
import type {
  ExtractBodyFromRestAPI,
  ExtractPathFromRestAPI,
  ExtractResponseFromRestAPI,
  RestAPI,
} from './rest/RestAPI';

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
    const path = Object.entries(this.internalParams ?? {}).reduce(
      (path, [name, value]) => path.replace(`:${name}`, String(value)),
      this.path as string,
    );
    const queryParams =
      Object.keys(this.internalQueryParams ?? {}).length === 0
        ? ''
        : `?${new URLSearchParams(this.internalQueryParams ?? {}).toString()}`;

    return path + queryParams;
  }
}

class Client<TRestAPI extends RestAPI> {
  constructor(private readonly baseUrl?: string) {}

  private getUrl(path: string) {
    return this.baseUrl ? new URL(path, this.baseUrl) : path;
  }

  async get<Path extends ExtractPathFromRestAPI<TRestAPI, 'GET'>>(
    path: Path | PathGenerator<TRestAPI, 'GET', Path>,
  ): Promise<ExtractResponseFromRestAPI<TRestAPI, 'GET', Path>> {
    const response = await fetch(this.getUrl(path.toString()));

    return {
      data: await response.json(),
      headers: Object.fromEntries(response.headers.entries()),
      statusCode: response.status,
    };
  }

  async post<Path extends ExtractPathFromRestAPI<TRestAPI, 'POST'>>(
    path: Path | PathGenerator<TRestAPI, 'POST', Path>,
    body: ExtractBodyFromRestAPI<TRestAPI, 'POST'>,
  ): Promise<ExtractResponseFromRestAPI<TRestAPI, 'POST', Path>> {
    const response = await fetch(this.getUrl(path.toString()), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    return {
      data: await response.json(),
      headers: Object.fromEntries(response.headers.entries()),
      statusCode: response.status,
    };
  }

  async patch<Path extends ExtractPathFromRestAPI<TRestAPI, 'PATCH'>>(
    path: Path | PathGenerator<TRestAPI, 'PATCH', Path>,
    body: ExtractBodyFromRestAPI<TRestAPI, 'PATCH'>,
  ): Promise<ExtractResponseFromRestAPI<TRestAPI, 'PATCH', Path>> {
    const response = await fetch(this.getUrl(path.toString()), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    return {
      data: await response.json(),
      headers: Object.fromEntries(response.headers.entries()),
      statusCode: response.status,
    };
  }

  async delete<Path extends ExtractPathFromRestAPI<TRestAPI, 'DELETE'>>(
    path: Path | PathGenerator<TRestAPI, 'DELETE', Path>,
  ): Promise<ExtractResponseFromRestAPI<TRestAPI, 'DELETE', Path>> {
    const response = await fetch(this.getUrl(path.toString()), {
      method: 'DELETE',
    });

    return {
      data: await response.json(),
      headers: Object.fromEntries(response.headers.entries()),
      statusCode: response.status,
    };
  }

  path<Method extends HttpMethod, Path extends TRestAPI['request']['path']>(
    path: Path,
    ...params: Extract<TRestAPI['request'], { method: Method; path: Path }>['params']
  ) {
    return new PathGenerator<TRestAPI, Method, Path>(path, ...params);
  }
}

export default Client;
