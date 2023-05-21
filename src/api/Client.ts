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

  async post(path: string, body: any) {
    const response = await fetch(this.getUrl(path), {
      method: 'POST',
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  }

  async patch(path: string, itemId: number, body: any) {
    const response = await fetch(this.getUrl(path), {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log(data);
    return data;
  }

  async delete(path: string, itemId: number) {
    const response = await fetch(this.getUrl(path), {
      method: 'DELETE',
      // body: JSON.stringify(itemId),
    });
    const data = await response.text();
    return data;
  }
}

export default Client;
