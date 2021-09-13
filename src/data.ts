export interface IItem {
  itemName: string;
  price: number;
  unit?: string;
}

export type ItemId = string;

export type ItemData = { [id: string]: IItem };

export type IBasket = { itemId: ItemId; quantity: number }[];

export const ITEMS: ItemData = {
  "1": { itemName: "Beans", price: 0.5 },
  "2": { itemName: "Cola", price: 0.7 },
  "3": { itemName: "Oranges", price: 1.99, unit: "kg" },
};
