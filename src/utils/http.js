const BASE_URL = "https://shopping-cart.techcourse.co.kr";

const http = {
  async get(url, { method, ...args } = {}) {
    const endpoint = `${BASE_URL}/${url}`;

    const response = await fetch(endpoint, {
      method: "GET",
      ...args,
    });

    if (response.status !== 200) {
      throw new Error(`Invalid response status: ${response.status}`);
    }

    return response.json();
  },
  async post(url, { method, headers, body, ...args } = {}) {
    const endpoint = `${BASE_URL}/${url}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      ...args,
    });

    if (response.status !== 201) {
      throw new Error(`Invalid response status: ${response.status}`);
    }

    const [, id] = response.headers.get("location").match(/\/([\d]+)$/);

    return Number(id);
  },
  async delete(url, { method, ...args } = {}) {
    const endpoint = `${BASE_URL}/${url}`;

    const response = await fetch(endpoint, {
      method: "DELETE",
      ...args,
    });

    if (response.status !== 204) {
      throw new Error(`Invalid response status: ${response.status}`);
    }
  },
};

export default http;
