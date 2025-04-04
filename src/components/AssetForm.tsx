"use client";

import { GetNewCoinForm } from "./forms/get-new-coin";
import { ResponsiveDialog } from "./responsive-dialog";

export const AssetForm = () => {
  return (
    <>
      <div className="flex justify-end">
        <ResponsiveDialog
          label={"Добавить валюту"}
          variant="outline"
          title={"Новая валюта"}
          description={"Выберите валюту и введите желаемое количество"}
          formComponent={<GetNewCoinForm onClose={() => {}} />}
        />
      </div>
    </>
  );
};
