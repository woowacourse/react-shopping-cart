type Method = "GET" | "POST" | "PATCH" | "DELETE";

export interface Options extends Omit<RequestInit, "body"> {
  method?: Method;
  body?: BodyInit | undefined | null;
}
