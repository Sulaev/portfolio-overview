"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 20;

export const AssetTable = () => {
  const assets = useSelector((state: RootState) => state.portfolio.assets);
  const [currentPage, setCurrentPage] = useState(1);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  const formatPercent = (value: number) =>
    `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;

  const totalPages = Math.ceil(assets.length / ITEMS_PER_PAGE);
  const paginatedAssets = assets.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="grid grid-cols-6 bg-gray-100 dark:bg-gray-800 px-4 py-2 font-semibold">
        <div>Название</div>
        <div>Количество</div>
        <div>Цена</div>
        <div>Стоимость</div>
        <div>24ч</div>
        <div>Доля</div>
      </div>

      <div className="divide-y">
        {paginatedAssets.map((asset) => {
          const totalValue = asset.price ? asset.price * asset.amount : 0;
          const portfolioPercentage =
            (totalValue /
              assets.reduce((sum, a) => sum + (a.price || 0) * a.amount, 0)) *
            100;

          return (
            <motion.div
              key={asset.id}
              className="grid grid-cols-6 px-4 py-3 items-center"
              whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.03)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="font-medium truncate">{asset.name}</div>
              <div>{asset.amount.toFixed(6)}</div>
              <div>
                <motion.span
                  key={`price-${asset.id}`}
                  initial={{ color: "inherit" }}
                  animate={{ color: ["#22c55e", "inherit"] }}
                  transition={{ duration: 0.5 }}
                >
                  {asset.price ? formatCurrency(asset.price) : "—"}
                </motion.span>
              </div>
              <div>{totalValue ? formatCurrency(totalValue) : "—"}</div>
              <div
                className={cn(
                  asset.change24h &&
                    (asset.change24h > 0 ? "text-green-500" : "text-red-500")
                )}
              >
                {asset.change24h ? formatPercent(asset.change24h) : "—"}
              </div>
              <div className="min-w-[100px]">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${portfolioPercentage}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-xs">
                  {portfolioPercentage.toFixed(2)}%
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {assets.length > ITEMS_PER_PAGE && (
        <div className="flex justify-between items-center p-4 border-t">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            Назад
          </Button>
          <span className="text-sm">
            Страница {currentPage} из {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            Вперед
          </Button>
        </div>
      )}
    </div>
  );
};
