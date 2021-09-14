import { renderHook, act } from "@testing-library/react-hooks";
import { useBasket } from "./useBasket";

test("useBasket returns an empty basket", () => {
  const {
    result: {
      current: { basket },
    },
  } = renderHook(() => useBasket());
  expect(basket.length).toBe(0);
});

test("useBasket allows adding to basket", () => {
  const { result } = renderHook(() => useBasket());
  act(() => {
    result.current.onAdd("2", 1);
  });
  expect(result.current.basket.length).toBe(1);
});

test("useBasket allows removing from basket", () => {
  const { result } = renderHook(() => useBasket());
  act(() => {
    result.current.onAdd("2", 1);
  });
  act(() => {
    result.current.onAdd("2", 1);
  });
  act(() => {
    result.current.onAdd("2", 1);
  });
  act(() => {
    result.current.onRemove(1);
  });
  expect(result.current.basket.length).toBe(2);
});
