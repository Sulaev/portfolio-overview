import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { io, Socket } from "socket.io-client";
import { updatePrices } from "@/store/slices/portfolioSlice";

interface BinanceTickerData {
  s: string;
  c: string;
  P: string;
}

export const useBinanceWebSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket: Socket = io("wss://stream.binance.com:9443/ws", {
      transports: ["websocket"],
    });

    const symbols = ["btcusdt", "ethusdt", "solusdt"];
    const streams = symbols.map((s) => `${s}@ticker`).join("/");

    socket.emit("subscribe", streams);

    socket.on("message", (data: BinanceTickerData) => {
      const price = parseFloat(data.c);
      const change24h = parseFloat(data.P);

      dispatch(
        updatePrices([
          {
            symbol: data.s.replace("USDT", ""),
            price,
            change24h,
          },
        ])
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);
};
