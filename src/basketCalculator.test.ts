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

test("returns line items", () => {
  const { lineItems } = sum(ITEMS, EXAMPLE_BASKET);
  expect(lineItems.length).toBe(6);
  expect(lineItems[0].name).toBe("Beans");
  expect(lineItems[0].price).toBe("0.50");
  expect(lineItems[3].name).toBe("Cola");
  expect(lineItems[3].price).toBe("0.70");
  expect(lineItems[5].name).toBe("Oranges");
  expect(lineItems[5].quantity).toBe("0.195 kg @ £1.99/kg");
  expect(lineItems[5].price).toBe("0.39");
});
