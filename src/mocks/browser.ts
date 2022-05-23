import { setupWorker, SetupWorkerApi } from "msw";
import { handlers } from ".";

export const worker: SetupWorkerApi = setupWorker(...handlers);
