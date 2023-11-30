import { env } from "process";
import axios from "axios";

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
export const handler = async (event) => {
  const API_KEY = env.VITE_API_KEY;
  const API_BASE = env.VITE_BASE_URL;
  const icao = event.queryStringParameters.icao;
  const URL = `${API_BASE}${icao}/decoded`;

  const myHeaders = new Headers();
  myHeaders.append("X-API-Key", API_KEY);

  const config = {
    method: "get",
    url: URL,
    headers: { "X-API-Key": API_KEY },
  };
  try {
    const res = await axios(config);
    return {
      statusCode: 200,
      body: JSON.stringify(res.data),
    };
  } catch (error) {
    console.log(error);
    return { statusCode: error.response.status, body: error.toString() };
  }
};
