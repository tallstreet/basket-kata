import { fireEvent, render } from "@testing-library/react";
import { Basket } from "./Basket";
import { sum } from "./basketCalculator";
import { COUPONS, ITEMS } from "./data";

const EXAMPLE_BASKET = [
  { itemId: "1", quantity: 1 },
  { itemId: "1", quantity: 1 },
  { itemId: "1", quantity: 1 },
  { itemId: "2", quantity: 1 },
  { itemId: "2", quantity: 1 },
  { itemId: "3", quantity: 0.195 },
];
const SUM = sum(ITEMS, EXAMPLE_BASKET, COUPONS);

test("renders basket", async () => {
  const { getByText, getByTestId, getAllByText } = render(
    <Basket {...SUM} onRemove={jest.fn()} />
  );
  expect(getAllByText("Beans")).toHaveLength(3);
  expect(getAllByText("Cola")).toHaveLength(2);
  expect(getAllByText(/Oranges/)).toHaveLength(1);
  expect(getAllByText(/0.195 kg @ £1.99\/kg/)).toHaveLength(1);
  expect(getByText("Sub-Total")).toBeInTheDocument();
  expect(getByTestId("subtotal")).toHaveTextContent("3.29");
  expect(getAllByText("Beans 3 for 2")).toHaveLength(1);
  expect(getAllByText("Cola 2 for £1")).toHaveLength(1);
  expect(getByTestId("savingsTotal")).toHaveTextContent("-0.90");
  expect(getByTestId("total")).toHaveTextContent("2.39");
});

test("clicking  remove button to triggers onRemove function", () => {
  const remove = jest.fn();
  const { getAllByText } = render(<Basket {...SUM} onRemove={remove} />);
  fireEvent.click(getAllByText("Remove")[0]);
  expect(remove).toHaveBeenCalledTimes(1);
});
