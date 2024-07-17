import axios, { AxiosError } from "axios";
import { connectToDatabase } from "@/utils/database";
import CryptoData from "@/models/cryptoData";
import { symbolsList } from "@/utils/constants";

const handler = async () => {
  await connectToDatabase();

  const promises = symbolsList?.map(async ({ id, symbol }) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`
      );

      const price = response.data[id].usd;
      const data = { symbol, price, timestamp: new Date() };

      const existingPrice = await CryptoData.find({ symbol })
        .sort({ timestamp: -1 })
        .limit(1);

      if (existingPrice.length && existingPrice[0].price == price)
        return "Price did not change!";

      await CryptoData.create(data);
      return "Data fetched and stored successfully";
    } catch (error) {
      console.error(
        `Error fetching data for ${symbol}:`,
        (error as AxiosError).message
      );
      return new Response(`Error fetching data for ${symbol}`, { status: 500 });
    }
  });

  try {
    const resolvedPromises = await Promise.all(promises);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

setInterval(() => {
  handler();
}, 10000);
