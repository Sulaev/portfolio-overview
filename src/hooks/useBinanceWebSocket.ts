import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { TOP_20_CRYPTOS } from "@/constants/cryptoList";
import { updatePrices } from "@/store/portfolioSlice";

export const useBinanceWebSocket = () => {
  const dispatch = useDispatch();
  const assets = useSelector((state: RootState) => state.portfolio.assets);

  useEffect(() => {
    if (assets.length === 0) return;

    const MAX_STREAMS_PER_CONNECTION = 10;
    const validAssets = assets
      .filter((asset) => TOP_20_CRYPTOS.some((c) => c.symbol === asset.symbol))
      .slice(0, MAX_STREAMS_PER_CONNECTION);

    if (validAssets.length === 0) return;

    const streams = validAssets
      .map((asset) => `${asset.symbol.toLowerCase()}usdt@ticker`)
      .join("/");

    const wsUrl = `wss://stream.binance.com:9443/stream?streams=${streams}`;
    const socket = new WebSocket(wsUrl);

    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (!data?.stream || !data?.data) return;

        const symbol = data.stream
          .split("@")[0]
          .toUpperCase()
          .replace("USDT", "");
        const price = parseFloat(data.data.c);
        const change24h = parseFloat(data.data.P);

        if (!isNaN(price) && !isNaN(change24h)) {
          dispatch(updatePrices([{ symbol, price, change24h }]));
        }
      } catch (error) {
        console.error("WebSocket parse error:", error);
      }
    };

    socket.addEventListener("message", handleMessage);

    return () => {
      socket.removeEventListener("message", handleMessage);
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [assets, dispatch]);
};
