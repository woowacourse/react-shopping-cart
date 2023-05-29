import type { PathParams, ResponseResolver, RestContext, RestRequest } from 'msw';
import { rest as mswRest } from 'msw';
import type { ExtractPathFromRestAPI, RestAPI } from '../api/rest/RestAPI';
import type { ShoppingCartRestAPI } from '../api/rest/ShoppingCartRestAPI';
import { joinPath } from '../api/utils/http';

type RestOptions = {
  baseUrl?: string;
};

class Rest<TRestAPI extends RestAPI> {
  constructor(private readonly options: RestOptions = {}) {}

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
    return mswRest[method.toLowerCase() as Lowercase<Method>](
      joinPath(this.options.baseUrl, path),
      resolver,
    );
  }
}

const rest = new Rest<ShoppingCartRestAPI>({
  baseUrl: import.meta.env.BASE_URL,
});

export default rest;
