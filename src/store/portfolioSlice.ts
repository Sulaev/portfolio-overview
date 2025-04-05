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

const loadAssetsFromLocalStorage = (): Asset[] => {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem("portfolioAssets");
  return saved ? JSON.parse(saved) : [];
};

const saveAssetsToLocalStorage = (assets: Asset[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("portfolioAssets", JSON.stringify(assets));
};

const initialState: PortfolioState = {
  assets: loadAssetsFromLocalStorage(),
};

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addAsset: {
      reducer: (state, action: PayloadAction<Asset>) => {
        state.assets.push(action.payload);
        saveAssetsToLocalStorage(state.assets);
      },
      prepare: (asset: Omit<Asset, "id">) => ({
        payload: {
          ...asset,
          id: uuidv4(),
          symbol: asset.symbol.toUpperCase(),
        },
      }),
    },

    removeAsset: (state, action: PayloadAction<string>) => {
      state.assets = state.assets.filter(
        (asset) => asset.id !== action.payload
      );
      saveAssetsToLocalStorage(state.assets);
    },

    updatePrices: (
      state,
      action: PayloadAction<
        {
          symbol: string;
          price: number;
          change24h: number;
        }[]
      >
    ) => {
      state.assets = state.assets.map((asset) => {
        const update = action.payload.find(
          (u) => u.symbol.toUpperCase() === asset.symbol
        );

        if (!update) return asset;

        return {
          ...asset,
          price: Number(update.price) || asset.price,
          change24h: Number(update.change24h) || asset.change24h,
        };
      });
      saveAssetsToLocalStorage(state.assets);
    },

    loadAssets: (state) => {
      state.assets = loadAssetsFromLocalStorage();
    },
  },
});

export const { addAsset, removeAsset, updatePrices, loadAssets } =
  portfolioSlice.actions;
export default portfolioSlice.reducer;
