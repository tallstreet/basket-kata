import React from "react";
import "./App.css";
import { Basket } from "./Basket";
import { sum } from "./basketCalculator";
import { COUPONS, ITEMS } from "./data";

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
  return (
    <div className="App">
      <Basket {...basketTotals} />
    </div>
  );
}

export default App;
