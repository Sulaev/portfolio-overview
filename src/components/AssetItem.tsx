"use client";

import { useDispatch } from "react-redux";
import { removeAsset } from "@/store/portfolioSlice";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";

interface AssetItemProps {
  asset: {
    id: string;
    name: string;
    symbol: string;
    amount: number;
    price?: number;
    change24h?: number;
  };
  portfolioTotal: number;
}

export const AssetItem = ({ asset, portfolioTotal }: AssetItemProps) => {
  const dispatch = useDispatch();
  const totalValue = asset.price ? asset.price * asset.amount : 0;
  const portfolioPercentage =
    portfolioTotal > 0 ? (totalValue / portfolioTotal) * 100 : 0;

  const handleDelete = () => {
    dispatch(removeAsset(asset.id));
  };

  return (
    <div className="grid grid-cols-6 px-4 py-3 items-center">
      <div className="font-medium truncate">
        {asset.name} ({asset.symbol})
      </div>
      <div>{asset.amount.toFixed(6)}</div>
      <div>{asset.price ? `$${asset.price.toFixed(2)}` : "—"}</div>
      <div>{totalValue ? `$${totalValue.toFixed(2)}` : "—"}</div>
      <div
        className={cn(
          asset.change24h &&
            (asset.change24h > 0 ? "text-green-500" : "text-red-500")
        )}
      >
        {asset.change24h
          ? `${asset.change24h > 0 ? "+" : ""}${asset.change24h.toFixed(2)}%`
          : "—"}
      </div>
      <div className="flex justify-between gap-2">
        <div className="min-w-[100px]">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <Progress className="h-full" value={portfolioPercentage} />
          </div>
          <span className="text-xs">{portfolioPercentage.toFixed(2)}%</span>
        </div>
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            aria-label="Удалить актив"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
