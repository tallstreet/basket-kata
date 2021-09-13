import { useState } from "react";
import { ItemId, ItemData, IItem } from "./data";

interface ItemProps {
  items: ItemData;
  onAdd: (itemId: ItemId, quantity: number) => void;
}

function Product({
  itemId,
  itemData,
  onAdd,
}: {
  itemId: ItemId;
  itemData: IItem;
  onAdd: (itemId: ItemId, quantity: number) => void;
}) {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="item">
      <div>{itemData.itemName}</div>
      {itemData.unit && (
        <div>
          <input
            type="number"
            value={quantity}
            onChange={(evt) => setQuantity(parseFloat(evt.target.value))}
          />{" "}
          {itemData.unit}
        </div>
      )}
      <button onClick={() => onAdd(itemId, quantity)}>Add</button>
    </div>
  );
}

export function Items({ items, onAdd }: ItemProps) {
  return (
    <>
      <h2>Items For Sale</h2>
      <div className="items">
        {Object.keys(items).map((itemId) => (
          <Product
            key={itemId}
            itemId={itemId}
            itemData={items[itemId]}
            onAdd={onAdd}
          />
        ))}
      </div>
    </>
  );
}
