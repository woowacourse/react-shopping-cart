import { setupWorker } from "msw/browser";
import { handler } from "./handlers";

export const worker = setupWorker(...handler);
