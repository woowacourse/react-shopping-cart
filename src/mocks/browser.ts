import { setupWorker } from "msw";
import { handlers } from "./worker";

export const worker = setupWorker(...handlers);
