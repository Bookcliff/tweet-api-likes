const fetch = require("node-fetch");

export default async function handler(request, response) {
  const result = await fetch(
    `https://opensheet.elk.sh/1P9UiHQkm_NIOg5WieiDfOzsewNC89_vjz127maF7_R0/ava+employees`
  );
  const people = await result.json();

  return response.status(200).json({
    people,
  });
}
