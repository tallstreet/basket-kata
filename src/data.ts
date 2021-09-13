export interface IItem {
  itemName: string;
  price: number;
  unit?: string;
}

export type ItemId = string;

export interface ICoupon {
  itemId: ItemId;
  quantity: number;
  saving: number;
  description: string;
}

export type ItemData = { [id: string]: IItem };

export type IBasket = { itemId: ItemId; quantity: number }[];

export const ITEMS: ItemData = {
  "1": { itemName: "Beans", price: 0.5 },
  "2": { itemName: "Cola", price: 0.7 },
  "3": { itemName: "Oranges", price: 1.99, unit: "kg" },
};

export const COUPONS: ICoupon[] = [
  { itemId: "1", quantity: 3, saving: -0.5, description: "Beans 3 for 2" },
  { itemId: "2", quantity: 2, saving: -0.4, description: "Cola 2 for £1" },
];
