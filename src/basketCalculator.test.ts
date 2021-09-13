import { sum } from "./basketCalculator";
import { ITEMS, COUPONS } from "./data";

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

test("applies coupons savings", () => {
  const { savings } = sum(ITEMS, EXAMPLE_BASKET, COUPONS);
  expect(savings.length).toBe(2);
  expect(savings[0].description).toBe("Beans 3 for 2");
  expect(savings[0].saving).toBe("-0.50");
  expect(savings[1].description).toBe("Cola 2 for £1");
  expect(savings[1].saving).toBe("-0.40");
});

test("returns savings total and basket total", () => {
  const { savingsTotal, total } = sum(ITEMS, EXAMPLE_BASKET, COUPONS);
  expect(savingsTotal).toBe("-0.90");
  expect(total).toBe("2.39");
});

test("applies a coupons multiple times if it applies multiple times", () => {
  const basket = [
    { itemId: "2", quantity: 1 },
    { itemId: "2", quantity: 1 },
    { itemId: "2", quantity: 1 },
    { itemId: "2", quantity: 1 },
    { itemId: "2", quantity: 1 },
    { itemId: "3", quantity: 0.195 },
  ];
  const { savings } = sum(ITEMS, basket, COUPONS);
  expect(savings.length).toBe(2);
  expect(savings[0].description).toBe("Cola 2 for £1");
  expect(savings[0].saving).toBe("-0.40");
  expect(savings[1].description).toBe("Cola 2 for £1");
  expect(savings[1].saving).toBe("-0.40");
});

test("a given item cannot recieve multiple coupons", () => {
  const basket = [
    { itemId: "2", quantity: 1 },
    { itemId: "2", quantity: 1 },
    { itemId: "2", quantity: 1 },
    { itemId: "2", quantity: 1 },
    { itemId: "2", quantity: 1 },
    { itemId: "3", quantity: 0.195 },
  ];
  const coupons = [
    { itemId: "2", quantity: 3, saving: -0.6, description: "Cola 3 for £1.50" },
    { itemId: "2", quantity: 2, saving: -0.4, description: "Cola 2 for £1" },
  ];

  const { savings } = sum(ITEMS, basket, coupons);
  expect(savings.length).toBe(2);
  expect(savings[0].description).toBe("Cola 3 for £1.50");
  expect(savings[0].saving).toBe("-0.60");
  expect(savings[1].description).toBe("Cola 2 for £1");
  expect(savings[1].saving).toBe("-0.40");
});
