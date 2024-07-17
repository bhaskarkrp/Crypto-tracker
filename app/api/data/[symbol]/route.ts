import { connectToDatabase } from "@/utils/database";

import CryptoData from "@/models/cryptoData";

const handler = async (_: any, { params }: any) => {
  const { symbol } = params;
  await connectToDatabase();

  const data = await CryptoData.find({ symbol })
    .sort({ timestamp: -1 })
    .limit(20);

  return new Response(JSON.stringify(data), { status: 200 });
};

export { handler as GET };
