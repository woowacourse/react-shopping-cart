import { setupWorker } from "msw";
import { prouctsHandlers, cartsHandlers } from "./handlers";

export const worker = setupWorker(...prouctsHandlers, ...cartsHandlers);
