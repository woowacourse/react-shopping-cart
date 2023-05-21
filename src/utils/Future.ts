const NotExists = Symbol('NotExists');

class Future<TData, TError = Error> {
  private promise: Promise<TData>;

  private data: typeof NotExists | TData = NotExists;

  private error: typeof NotExists | TError = NotExists;

  constructor(private readonly fn: () => Promise<TData>) {
    this.promise = this.fn();
    this.promise
      .then((data) => {
        this.data = data;
      })
      .catch((error) => {
        this.error = error;
        console.error(error);
      });
  }

  toPromise(): Promise<TData> {
    return this.promise;
  }

  unwrap(): TData {
    if (this.error !== NotExists) throw this.error;

    if (this.data === NotExists) throw this.promise;

    return this.data;
  }
}

export default Future;
