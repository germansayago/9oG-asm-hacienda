const ENDPOINT = process.env.NEXT_PUBLIC_API_URL;

export async function sendData(form = {}) {
  return fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}
