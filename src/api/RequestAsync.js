import { 비동기_요청 } from 'constants/';

const errorReturn = (error) => ({
  status: 비동기_요청.FAIL,
  content: `서버와의 통신에 실패하였습니다. (${error.message})`,
});

class RequestAsync {
  constructor() {
    this.HOST_NAME = process.env.REACT_APP_API_URL;
    this.header = { 'Content-Type': 'application/json' };
  }

  async #getRefinedResponse(response) {
    return {
      status: response.ok ? 비동기_요청.SUCCESS : 비동기_요청.FAIL,
      content: await response.json(),
    };
  }

  async get(path) {
    try {
      const response = await fetch(`${this.HOST_NAME}/${path}`);

      return this.#getRefinedResponse(response);
    } catch (error) {
      return errorReturn(error);
    }
  }

  async post(path, bodyData) {
    try {
      const response = await fetch(`${this.HOST_NAME}/${path}`, {
        method: 'POST',
        headers: this.header,
        body: JSON.stringify(bodyData),
      });

      return this.#getRefinedResponse(response);
    } catch (error) {
      return errorReturn(error);
    }
  }
}

const requestAsync = new RequestAsync();
export default requestAsync;
