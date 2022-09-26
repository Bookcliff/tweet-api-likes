const fetch = require("node-fetch");

export default async function handler(request, response) {
  const { id } = request.query;

  const result = await fetch(
    `https://api.twitter.com/2/tweets/${id}/liking_users`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      },
    }
  );
  const data = await result.json();

  console.log(data);

  return response.status(200).json({
    data,
  });
}
