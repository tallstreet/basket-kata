import { render, fireEvent } from "@testing-library/react";
import { ITEMS } from "./data";
import { Items } from "./Items";

test("renders items", () => {
  const { getByText } = render(<Items onAdd={jest.fn()} items={ITEMS} />);
  expect(getByText("Cola")).toBeInTheDocument();
});

test("clicking button to add items triggers onAdd function", () => {
  const add = jest.fn();
  const { getAllByText } = render(<Items onAdd={add} items={ITEMS} />);
  fireEvent.click(getAllByText("Add")[0]);
  expect(add).toHaveBeenCalledTimes(1);
});
