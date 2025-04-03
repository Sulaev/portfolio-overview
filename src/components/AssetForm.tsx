"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addAsset } from "@/store/portfolioSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CRYPTO_OPTIONS = [
  { symbol: "BTC", name: "Bitcoin" },
  { symbol: "ETH", name: "Ethereum" },
  { symbol: "SOL", name: "Solana" },
];

export const AssetForm = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const crypto = CRYPTO_OPTIONS.find((c) => c.symbol === selectedCrypto);
    if (!crypto || !amount) return;

    dispatch(
      addAsset({
        symbol: crypto.symbol,
        name: crypto.name,
        amount: parseFloat(amount),
      })
    );
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 items-end">
      <div className="w-full max-w-[200px]">
        <label className="block text-sm mb-1">Криптовалюта</label>
        <Select onValueChange={setSelectedCrypto} value={selectedCrypto}>
          <SelectTrigger>
            <SelectValue placeholder="Выберите" />
          </SelectTrigger>
          <SelectContent>
            {CRYPTO_OPTIONS.map((crypto) => (
              <SelectItem key={crypto.symbol} value={crypto.symbol}>
                {crypto.name} ({crypto.symbol})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full max-w-[200px]">
        <label className="block text-sm mb-1">Количество</label>
        <Input
          type="number"
          step="0.000001"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
        />
      </div>

      <Button type="submit">Добавить</Button>
    </form>
  );
};
