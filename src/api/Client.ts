class Client {
  constructor(private readonly baseUrl?: string) {}

  private getUrl(path: string) {
    return this.baseUrl ? new URL(path, this.baseUrl) : path;
  }

  async get(path: string) {
    const response = await fetch(this.getUrl(path));
    return response;
  }

  async post(path: string, body: object) {
    const response = await fetch(this.getUrl(path), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return response;
  }

  async patch(path: string, body: object) {
    const response = await fetch(this.getUrl(path), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return response;
  }

  async delete(path: string) {
    const response = await fetch(this.getUrl(path), {
      method: 'DELETE',
    });
    return response;
  }
}

export default Client;
