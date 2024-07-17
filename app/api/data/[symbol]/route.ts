import { connectToDatabase } from "@/utils/database";

import CryptoData from "@/models/cryptoData";
import axios from "axios";

const handler = async (_, { params }) => {
  const { symbol } = params;
  await connectToDatabase();

  const data = await CryptoData.find({ symbol })
    .sort({ timestamp: -1 })
    .limit(20);

  // console.log({ data });

  return new Response(JSON.stringify(data), { status: 200 });
};

export { handler as GET };
