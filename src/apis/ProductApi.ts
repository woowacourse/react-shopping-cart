import { API_PATH } from "@/constants";
import { GetProductResponse } from "@/types";
import { baseApi } from "./BaseApi";

interface GetProductParams {
  page?: number;
  size?: number;
  sort?: "asc" | "desc";
}

export default class ProductApi {
  static async getAllProducts({
    page = 0,
    size = 20,
    sort = "asc",
  }: GetProductParams = {}): Promise<GetProductResponse> {
    const searchParams = new URLSearchParams({
      page: String(page),
      size: String(size),
      sort,
    });
    return baseApi.get(`${API_PATH.products}?${searchParams.toString()}`);
  }
}
