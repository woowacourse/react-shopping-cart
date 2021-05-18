const isDefined = <T>(argument: T | undefined): argument is T => argument !== undefined;

export { isDefined };
