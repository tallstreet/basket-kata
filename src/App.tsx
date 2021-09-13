import React, { useCallback, useMemo, useState } from "react";
import "./App.css";
import { Basket } from "./Basket";
import { sum } from "./basketCalculator";
import { COUPONS, IBasket, ItemId, ITEMS } from "./data";
import { Items } from "./Items";

function App() {
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

  let basketTotals = useMemo(() => {
    return sum(ITEMS, basket, COUPONS);
  }, [basket]);

  return (
    <div className="App">
      <Items items={ITEMS} onAdd={onAdd} />
      <Basket {...basketTotals} onRemove={onRemove} />
    </div>
  );
}

export default App;
