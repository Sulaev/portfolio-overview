"use client";

import { AssetItem } from "./AssetItem";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ITEMS_PER_PAGE = 100;

export const AssetTable = () => {
  const assets = useSelector((state: RootState) => state.portfolio.assets);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(assets.length / ITEMS_PER_PAGE);
  const paginatedAssets = assets.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const portfolioTotal = assets.reduce(
    (sum, asset) => sum + (asset.price || 0) * asset.amount,
    0
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
        {paginatedAssets.map((asset) => (
          <AssetItem
            key={asset.id}
            asset={asset}
            portfolioTotal={portfolioTotal}
          />
        ))}
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
