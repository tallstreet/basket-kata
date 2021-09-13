import React from "react";
import "./App.css";
import { Basket } from "./Basket";
import { sum } from "./basketCalculator";
import { COUPONS, ITEMS } from "./data";
import { Items } from "./Items";

const EXAMPLE_BASKET = [
  { itemId: "1", quantity: 1 },
  { itemId: "1", quantity: 1 },
  { itemId: "1", quantity: 1 },
  { itemId: "2", quantity: 1 },
  { itemId: "2", quantity: 1 },
  { itemId: "3", quantity: 0.195 },
];

function App() {
  const basketTotals = sum(ITEMS, EXAMPLE_BASKET, COUPONS);
  const onAdd = () => undefined;
  return (
    <div className="App">
      <Items items={ITEMS} onAdd={onAdd} />
      <Basket {...basketTotals} />
    </div>
  );
}

export default App;
