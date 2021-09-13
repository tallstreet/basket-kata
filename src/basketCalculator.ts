import { IBasket, ItemData } from "./data";

export interface BasketTotal {
  subTotal: string;
  lineItems: {
    name: string;
    price: string;
    quantity?: string;
  }[];
}

export function displayNum(num: number) {
  return num.toFixed(2);
}

export function sum(items: ItemData, basket: IBasket): BasketTotal {
  const subTotal = basket.reduce(
    (acc, val) => items[val.itemId].price * val.quantity + acc,
    0
  );
  const lineItems = basket.map((val) => {
    return {
      name: items[val.itemId].itemName,
      price: displayNum(items[val.itemId].price * val.quantity),
      quantity: items[val.itemId].unit
        ? `${val.quantity} ${items[val.itemId].unit} @ £${displayNum(
            items[val.itemId].price
          )}/${items[val.itemId].unit}`
        : undefined,
    };
  });

  return {
    subTotal: displayNum(subTotal),
    lineItems,
  };
}
