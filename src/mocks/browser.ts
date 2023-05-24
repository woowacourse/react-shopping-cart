import { setupWorker } from "msw";
import { handlers } from "./handleMock";

export const worker = setupWorker(...handlers);
