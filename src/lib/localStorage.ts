interface Asset {
  id: string;
  symbol: string;
  name: string;
  amount: number;
}

export const loadAssetsFromLocalStorage = (): Asset[] => {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem("portfolioAssets");
  return saved ? JSON.parse(saved) : [];
};

export const saveAssetsToLocalStorage = (assets: Asset[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("portfolioAssets", JSON.stringify(assets));
};
