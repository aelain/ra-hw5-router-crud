export default async function createRequest(options = {}) {
  try {
    const url = options.url;
    const response = await fetch(url, options);

    if (options.method === 'GET') {
      return await response.json();
    }
  } catch (error) {
    console.error(error);
  }
}
