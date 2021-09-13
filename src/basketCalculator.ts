import { IBasket, ItemData, ICoupon } from "./data";

export interface BasketTotal {
  subTotal: string;
  lineItems: {
    name: string;
    price: string;
    quantity?: string;
  }[];
  savings: {
    description: string;
    saving: string;
  }[];
  savingsTotal: string;
  total: string;
}

export function displayNum(num: number) {
  return num.toFixed(2);
}

export function sum(
  items: ItemData,
  basket: IBasket,
  coupons?: ICoupon[]
): BasketTotal {
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

  const savings = [];
  let savingsTotal = 0;
  if (coupons) {
    const quantityByItem = basket.reduce((acc, val) => {
      if (!acc[val.itemId]) {
        acc[val.itemId] = 0;
      }
      acc[val.itemId] += val.quantity;
      return acc;
    }, {} as { [id: string]: number });

    for (const coupon of coupons) {
      if (coupon.quantity <= quantityByItem[coupon.itemId]) {
        const times = Math.floor(
          quantityByItem[coupon.itemId] / coupon.quantity
        );
        savings.push(
          ...Array(times).fill({
            description: coupon.description,
            saving: displayNum(coupon.saving),
          })
        );
        savingsTotal += coupon.saving * times;
        quantityByItem[coupon.itemId] -= times * coupon.quantity;
      }
    }
  }

  return {
    subTotal: displayNum(subTotal),
    lineItems,
    savings,
    savingsTotal: displayNum(savingsTotal),
    total: displayNum(subTotal + savingsTotal),
  };
}
