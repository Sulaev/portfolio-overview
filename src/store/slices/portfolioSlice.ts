import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface Asset {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  price?: number;
  change24h?: number;
}

interface PortfolioState {
  assets: Asset[];
}

const initialState: PortfolioState = {
  assets: [],
};

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addAsset: (state, action: PayloadAction<Omit<Asset, "id">>) => {
      const newAsset = {
        id: uuidv4(),
        ...action.payload,
      };
      state.assets.push(newAsset);
    },
    removeAsset: (state, action: PayloadAction<string>) => {
      state.assets = state.assets.filter(
        (asset) => asset.id !== action.payload
      );
    },
    updatePrices: (
      state,
      action: PayloadAction<
        { symbol: string; price: number; change24h: number }[]
      >
    ) => {
      action.payload.forEach((update) => {
        const asset = state.assets.find((a) => a.symbol === update.symbol);
        if (asset) {
          asset.price = update.price;
          asset.change24h = update.change24h;
        }
      });
    },
  },
});

export const { addAsset, removeAsset, updatePrices } = portfolioSlice.actions;
export default portfolioSlice.reducer;
