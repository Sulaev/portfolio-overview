"use client";

import { AssetTable } from "@/components/AssetTable";
import { AssetForm } from "@/components/AssetForm";
import { useBinanceWebSocket } from "@/hooks/useBinanceWebSocket";

export default function PortfolioPage() {
  useBinanceWebSocket();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Мой портфель</h1>
      <div className="grid gap-6">
        <AssetForm />
        <AssetTable />
      </div>
    </div>
  );
}
