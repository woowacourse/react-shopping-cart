import type { PathParams, ResponseResolver, RestContext, RestRequest } from 'msw';
import { rest as mswRest } from 'msw';
import type { ExtractPathFromRestAPI, RestAPI } from '../api/rest/RestAPI';
import type { ShoppingCartRestAPI } from '../api/rest/ShoppingCartRestAPI';

class Rest<TRestAPI extends RestAPI> {
  constructor(private readonly baseUrl: string) {}

  on<
    Method extends TRestAPI['request']['method'],
    Path extends ExtractPathFromRestAPI<TRestAPI, Method>,
  >(
    endpoint: `${Method} ${Path}`,
    resolver: ResponseResolver<
      RestRequest<
        Extract<TRestAPI['request'], { method: Method; path: Path }>['body'],
        PathParams<string>
      >,
      RestContext
    >,
  ) {
    const [method, path] = endpoint.split(' ');
    return mswRest[method.toLowerCase() as Lowercase<Method>](path + this.baseUrl, resolver);
  }
}

const rest = new Rest<ShoppingCartRestAPI>(import.meta.env.BASE_URL);

export default rest;
