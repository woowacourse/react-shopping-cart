class CustomError extends Error {
  type;

  constructor(type: string, message: string) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.type = type;
  }
}

export default CustomError;
