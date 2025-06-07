import { CONFIG } from "@/constants";
import Api from "@/modules/Api/Api";

export const baseApi = new Api(CONFIG.baseUrl, {
  headers: {
    Authorization: `Basic ${CONFIG.token}`,
    "Content-Type": "application/json",
  },
});
