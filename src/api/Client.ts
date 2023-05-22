/* eslint-disable @typescript-eslint/no-unused-vars */
class Client {
  constructor(private readonly baseUrl?: string) {}

  private getUrl(path: string) {
    return this.baseUrl ? new URL(path, this.baseUrl) : path;
  }

  async get(path: string) {
    const response = await fetch(this.getUrl(path));
    const data = await response.json();
    return data;
  }

  async post(path: string, body: unknown) {
    const response = await fetch(this.getUrl(path), {
      method: 'POST',
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  }

  async patch(path: string, _itemId: number, body: unknown) {
    const response = await fetch(this.getUrl(path), {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  }

  async delete(path: string, _itemId: number) {
    const response = await fetch(this.getUrl(path), {
      method: 'DELETE',
    });
    const data = await response.text();
    return data;
  }
}

export default Client;
