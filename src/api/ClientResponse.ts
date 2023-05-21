import type { HttpResponse } from './rest/RestAPI';

class ClientResponse<TResponse extends HttpResponse> {
  constructor(private readonly responseFn: () => Promise<TResponse>) {}

  private assertStatusCode<StatusCode extends TResponse['statusCode']>(
    response: TResponse,
    statusCodes: StatusCode[],
  ): response is Extract<TResponse, { statusCode: StatusCode }> {
    return (statusCodes as number[]).includes(response.statusCode);
  }

  async accept<StatusCode extends TResponse['statusCode']>(
    statusCodes: StatusCode | [StatusCode, ...StatusCode[]],
  ) {
    const response = await this.responseFn();
    if (
      !this.assertStatusCode(response, Array.isArray(statusCodes) ? statusCodes : [statusCodes])
    ) {
      return null;
    }
    return response;
  }

  async acceptOrThrow<StatusCode extends TResponse['statusCode']>(
    statusCodes: StatusCode | [StatusCode, ...StatusCode[]],
  ) {
    const response = await this.responseFn();
    if (
      !this.assertStatusCode(response, Array.isArray(statusCodes) ? statusCodes : [statusCodes])
    ) {
      throw new Error(`Server responses with status code ${response.statusCode}`);
    }
    return response;
  }
}

export default ClientResponse;
