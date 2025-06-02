import { CONFIG } from "@/constants";

export default class BaseApi {
  private static baseUrl = CONFIG.baseUrl;

  protected static getHeaders() {
    return {
      Authorization: `Basic ${CONFIG.token}`,
      "Content-Type": "application/json",
    };
  }

  protected static async get(path: string, options?: RequestInit) {
    const response = await fetch(`${BaseApi.baseUrl}${path}`, {
      headers: BaseApi.getHeaders(),
      ...options,
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

    return response.json();
  }

  protected static async post(path: string, options?: RequestInit) {
    const response = await fetch(`${BaseApi.baseUrl}${path}`, {
      method: "POST",
      headers: BaseApi.getHeaders(),
      ...options,
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  }

  protected static async put(path: string, options?: RequestInit) {
    const response = await fetch(`${BaseApi.baseUrl}${path}`, {
      method: "PUT",
      headers: BaseApi.getHeaders(),
      ...options,
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  }

  protected static async patch(path: string, options?: RequestInit) {
    const response = await fetch(`${BaseApi.baseUrl}${path}`, {
      method: "PATCH",
      headers: BaseApi.getHeaders(),
      ...options,
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  }

  protected static async delete(path: string, options?: RequestInit) {
    const response = await fetch(`${BaseApi.baseUrl}${path}`, {
      method: "DELETE",
      headers: BaseApi.getHeaders(),
      ...options,
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  }
}
