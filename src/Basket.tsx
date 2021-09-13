import { BasketTotal } from "./basketCalculator";

function Savings({
  savings,
  savingsTotal,
}: Pick<BasketTotal, "savings" | "savingsTotal">) {
  return (
    <>
      <div className="row">
        <div>Savings</div>
      </div>
      <ol className="savingsList">
        {savings.map((saving, idx) => (
          <li className="row" key={idx}>
            <div className="couponName">{saving.description}</div>
            <div className="couponSaving">{saving.saving}</div>
          </li>
        ))}
      </ol>
      <div className="row savingsTotalRow">
        <div className="totalHeading">Total Savings</div>
        <div className="total" data-testid="savingsTotal">
          {savingsTotal}
        </div>
      </div>
    </>
  );
}

type BasketProps = BasketTotal & { onRemove: (idx: number) => void };

export function Basket({
  lineItems,
  subTotal,
  savings,
  savingsTotal,
  total,
  onRemove,
}: BasketProps) {
  return (
    <div className="basket">
      <h2>Basket</h2>
      <ol className="shoppingList">
        {lineItems.map((item, idx) => (
          <li className="row" key={idx}>
            <div className="name">
              {item.name} {item.quantity}
            </div>
            <div className="price">{item.price}</div>
            <button className="removeButton" onClick={() => onRemove(idx)}>
              Remove
            </button>
          </li>
        ))}
      </ol>
      <div className="row subTotalRow">
        <div className="totalHeading">Sub-Total</div>
        <div data-testid="subtotal" className="total">
          {subTotal}
        </div>
      </div>
      {savings.length ? (
        <Savings savings={savings} savingsTotal={savingsTotal} />
      ) : null}
      <div className="row totalRow">
        <div className="totalHeading">Total</div>
        <div className="total" data-testid="total">
          {total}
        </div>
      </div>
    </div>
  );
}
