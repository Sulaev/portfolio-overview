"use client";

import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { removeAsset } from "@/store/portfolioSlice";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

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

  if (typeof window === "undefined") {
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
              <motion.div
                className="h-full bg-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${portfolioPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
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
  }

  return (
    <motion.div
      className="grid grid-cols-6 px-4 py-3 items-center relative group"
      whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.03)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="font-medium truncate">
        {asset.name} ({asset.symbol})
      </div>

      <div>{asset.amount.toFixed(6)}</div>

      <div>
        <motion.span
          key={`price-${asset.id}`}
          initial={{ color: "inherit" }}
          animate={{ color: ["#22c55e", "inherit"] }}
          transition={{ duration: 0.5 }}
        >
          {asset.price ? `$${asset.price.toFixed(2)}` : "—"}
        </motion.span>
      </div>

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
            <motion.div
              className="h-full bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${portfolioPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="text-xs">{portfolioPercentage.toFixed(2)}%</span>
        </div>
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="text-red-500 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Удалить актив"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
