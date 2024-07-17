import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { connectToDatabase } from "@/utils/database";

const handler = async () => {
  await connectToDatabase();

  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/list`
    );

    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    console.error(`Error fetching coin list for:`, error);
    return new Response(`Error fetching coin list for`, { status: 500 });
  }
};

export { handler as GET };
