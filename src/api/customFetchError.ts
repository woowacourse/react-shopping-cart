interface Props {
  errorMessage: string;
  statusCode: number;
}

class FetchError extends Error {
  public statusCode;
  constructor({ errorMessage, statusCode }: Props) {
    super();
    this.message = errorMessage;
    this.statusCode = statusCode;
  }
}

export default FetchError;
