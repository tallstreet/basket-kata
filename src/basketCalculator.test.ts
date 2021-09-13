import { sum } from "./basketCalculator";
import { ITEMS } from "./data";

const EXAMPLE_BASKET = [
  { itemId: "1", quantity: 1 },
  { itemId: "1", quantity: 1 },
  { itemId: "1", quantity: 1 },
  { itemId: "2", quantity: 1 },
  { itemId: "2", quantity: 1 },
  { itemId: "3", quantity: 0.195 },
];

test("calculates the subtotal for a basket", () => {
  const { subTotal } = sum(ITEMS, EXAMPLE_BASKET);
  expect(subTotal).toBe("3.29");
});
