export type ErrorType = "network" | "server";

export type Error = {
  type: ErrorType;
  message: string;
};
