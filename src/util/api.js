async function fetchData(url) {
  try {
    const response = await fetch(url);
    const body = await response.json();

    if (!response.ok) throw new Error(body.error.message);

    return body;
  } catch (error) {
    return error;
  }
}

export { fetchData };
