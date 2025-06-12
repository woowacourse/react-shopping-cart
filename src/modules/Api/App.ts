import { Api } from ".";

export const baseApi = new Api("https://jsonplaceholder.typicode.com");
const data = await baseApi.get("/todos/1");
console.log(data);
