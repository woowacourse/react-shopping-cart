import { setupWorker } from "msw/browser";
import { handlers } from "./handlers/handlers.ts";

export const worker = setupWorker(...handlers);
