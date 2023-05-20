class Client {
  constructor(private readonly baseUrl?: string) {}

  private getUrl(path: string) {
    return this.baseUrl ? new URL(path, this.baseUrl) : path;
  }

  async get(path: string) {
    const response = await fetch(this.getUrl(path));
    const data = await response.json();
    return data.response;
  }
}

export default Client;
