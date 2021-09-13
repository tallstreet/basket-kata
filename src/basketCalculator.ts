import { IBasket, ItemData } from "./data";

export interface BasketTotal {
  subTotal: string;
}

export function displayNum(num: number) {
  return num.toFixed(2);
}

export function sum(items: ItemData, basket: IBasket): BasketTotal {
  const subTotal = basket.reduce(
    (acc, val) => items[val.itemId].price * val.quantity + acc,
    0
  );

  return {
    subTotal: displayNum(subTotal),
  };
}
