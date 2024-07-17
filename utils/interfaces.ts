export interface coinDetails {
  id: string;
  symbol: string;
  name: string;
}

export interface DataState {
  coinData: {
    data: any[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };
  symbol: string;
}
