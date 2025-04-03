import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addAsset } from "@/store/slices/portfolioSlice";
import { store } from "@/store/store";
import { Asset } from "@/types/portfolio";

export const useLocalStorage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedAssets = localStorage.getItem("portfolioAssets");
    if (savedAssets) {
      const assets = JSON.parse(savedAssets) as Asset[];
      assets.forEach((asset) => dispatch(addAsset(asset)));
    }
  }, [dispatch]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const state = store.getState().portfolio.assets;
      localStorage.setItem("portfolioAssets", JSON.stringify(state));
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);
};
