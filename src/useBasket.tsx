import { useCallback, useState } from "react";
import { IBasket, ItemId } from "./data";

export function useBasket() {
  const [basket, setBasket] = useState<IBasket>([]);

  const onAdd = useCallback(
    (itemId: ItemId, quantity: number) => {
      setBasket([...basket, { itemId: itemId, quantity }]);
    },
    [setBasket, basket]
  );

  const onRemove = useCallback(
    (idx: number) => {
      const newBasket = [...basket];
      newBasket.splice(idx, 1);
      setBasket(newBasket);
    },
    [setBasket, basket]
  );

  return { basket, onAdd, onRemove };
}
