import { DataState } from "@/utils/interfaces";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: DataState = {
  coinData: {
    data: [],
    status: "idle",
    error: null,
  },
  symbol: "",
};

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (symbol: string) => {
    const response = await axios.get(`/api/data/${symbol}`);
    return response.data;
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setSymbol: (state, action: PayloadAction<string>) => {
      state.symbol = action.payload;
    },
    addCoinData: (state, action: PayloadAction<any>) => {
      if (action.payload.symbol === state.symbol) {
        state.coinData.data.unshift(action.payload);
        if (state.coinData.data.length > 20) {
          state.coinData.data.pop();
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, ({ coinData }) => {
        coinData.status = "loading";
      })
      .addCase(fetchData.fulfilled, ({ coinData }, action) => {
        coinData.status = "succeeded";
        coinData.data = action.payload;
      })
      .addCase(fetchData.rejected, ({ coinData }, action) => {
        coinData.status = "failed";
        coinData.error = action.error.message || null;
      });
  },
});

export const { setSymbol, addCoinData } = dataSlice.actions;

export default dataSlice.reducer;
