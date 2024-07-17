import { model, models, Schema } from "mongoose";

const CryptoSchema = new Schema({
  symbol: {
    type: "string",
    required: [true, "symbol is required"],
  },
  price: { type: "number", required: [true, "price is required"] },
  timestamp: { type: Date, default: Date.now },
});

const cryptoData = models.CryptoData || model("CryptoData", CryptoSchema);

export default cryptoData;
