import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { TOP_20_CRYPTOS } from "@/constants/cryptoList";

export const useBinanceWebSocket = () => {
  const dispatch = useDispatch();
  const assets = useSelector((state: RootState) => state.portfolio.assets);

  useEffect(() => {
    if (assets.length === 0) return;

    const validAssets = assets.filter((asset) =>
      TOP_20_CRYPTOS.some((c) => c.symbol === asset.symbol)
    );

    if (validAssets.length === 0) return;

    const streams = validAssets
      .map((asset) => `${asset.symbol.toLowerCase()}usdt@ticker`)
      .join("/");

    const wsUrl = `wss://stream.binance.com:9443/stream?streams=${streams}`;
    const socket = new WebSocket(wsUrl);

    return () => socket.close();
  }, [assets, dispatch]);
};
