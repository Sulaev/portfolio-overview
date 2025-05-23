import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TOP_CRYPTOS } from "@/constants/cryptoList";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addAsset } from "@/store/portfolioSlice";
import { toast } from "sonner";

interface GetNewCoinFormProps {
  onClose?: () => void;
}

export const GetNewCoinForm = ({ onClose }: GetNewCoinFormProps) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!selectedCrypto) {
        toast.error("Выберите криптовалюту");
        return;
      }

      const amountValue = parseFloat(amount);
      if (isNaN(amountValue)) {
        toast.error("Введите корректное количество");
        return;
      }

      if (amountValue <= 0) {
        toast.error("Количество должно быть больше нуля");
        return;
      }

      const crypto = TOP_CRYPTOS.find((c) => c.symbol === selectedCrypto);
      if (!crypto) return;

      dispatch(
        addAsset({
          symbol: crypto.symbol,
          name: crypto.name,
          amount: amountValue,
        })
      );

      toast.success(`${crypto.name} добавлен в портфель`);
      setAmount("");
      setSelectedCrypto("");
      onClose?.();
    } catch (error) {
      toast.error("Не удалось добавить актив");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex gap-4 flex-wrap items-end">
      {" "}
      <div className="w-full">
        <label className="block text-sm mb-1">Криптовалюта</label>
        <Select
          onValueChange={setSelectedCrypto}
          value={selectedCrypto}
          disabled={isSubmitting}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Выберите криптовалюту" />
          </SelectTrigger>
          <SelectContent>
            {TOP_CRYPTOS.map((crypto) => (
              <SelectItem key={crypto.symbol} value={crypto.symbol}>
                {crypto.name} ({crypto.symbol})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-full">
        <label className="block text-sm mb-1">Количество</label>
        <Input
          type="number"
          step="0.000001"
          min="0"
          value={amount}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
              setAmount(value);
            }
          }}
          placeholder="0.00"
          disabled={isSubmitting}
        />
      </div>
      <div>
        <Button type="submit" className="w-full md:w-auto">
          Добавить
        </Button>
      </div>
    </form>
  );
};
