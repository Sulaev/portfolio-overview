import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updatePrices } from "@/store/portfolioSlice";

interface BinanceTickerData {
  s: string;
  c: string;
  P: string;
}

export const useBinanceWebSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedAssets = localStorage.getItem("portfolioAssets");
    if (!savedAssets) return;

    const assets: { symbol: string }[] = JSON.parse(savedAssets);
    if (!assets.length) return;

    const symbols = assets.map(
      (asset) => `${asset.symbol.toLowerCase()}usdt@ticker`
    );
    const streamName = symbols.join("/");
    const wsUrl = `wss://stream.binance.com:9443/stream?streams=${streamName}`;

    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.stream && data.data) {
          const streamData: BinanceTickerData = data.data;
          dispatch(
            updatePrices([
              {
                symbol: streamData.s.replace("USDT", ""),
                price: parseFloat(streamData.c),
                change24h: parseFloat(streamData.P),
              },
            ])
          );
        }
      } catch (e) {
        console.error("WebSocket parse error:", e);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [dispatch]);
};
