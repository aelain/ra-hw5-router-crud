export default async function createRequest(options = {}) {
  try {
    const url = options.url;
    const response = await fetch(url, options);

    if (options.method === 'GET') {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}
