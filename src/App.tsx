import React, { useMemo } from "react";
import "./App.css";
import { Basket } from "./Basket";
import { sum } from "./basketCalculator";
import { COUPONS, ITEMS } from "./data";
import { Items } from "./Items";
import { useBasket } from "./useBasket";

function App() {
  const { basket, onAdd, onRemove } = useBasket();

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
