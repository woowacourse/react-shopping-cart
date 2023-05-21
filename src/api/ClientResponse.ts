import type { HttpResponse } from './rest/RestAPI';

// Reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
const OK_STATUS_CODES = [
  200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300, 301, 302, 303, 304, 307, 308,
] as const;

class ClientResponse<TResponse extends HttpResponse> {
  private readonly responsePromise: Promise<TResponse>;

  constructor(responseFn: () => Promise<TResponse>) {
    this.responsePromise = responseFn();
  }

  private assertStatusCode<StatusCode extends TResponse['statusCode']>(
    response: TResponse,
    statusCodes: StatusCode | readonly [StatusCode, ...StatusCode[]],
  ): response is Extract<TResponse, { statusCode: StatusCode }> {
    return ((Array.isArray(statusCodes) ? statusCodes : [statusCodes]) as number[]).includes(
      response.statusCode,
    );
  }

  async accept<StatusCode extends TResponse['statusCode']>(
    statusCodes: StatusCode | readonly [StatusCode, ...StatusCode[]],
  ) {
    const response = await this.responsePromise;
    if (!this.assertStatusCode(response, statusCodes)) {
      return null;
    }
    return response;
  }

  async acceptOrThrow<StatusCode extends TResponse['statusCode']>(
    statusCodes: StatusCode | readonly [StatusCode, ...StatusCode[]],
  ) {
    const response = await this.responsePromise;
    if (!this.assertStatusCode(response, statusCodes)) {
      throw new Error(`Server responses with status code ${response.statusCode}`);
    }
    return response;
  }

  async acceptOkOrThrow() {
    return this.acceptOrThrow(OK_STATUS_CODES);
  }
}

export default ClientResponse;
