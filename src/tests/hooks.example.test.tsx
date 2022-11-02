import { it } from "vitest";
import { renderHook } from "@testing-library/react";
import { useState, useCallback } from "react";

const useCounter = () => {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount((x) => x + 1), []);
  return { count, increment };
};

it("should use counter", () => {
  const { result } = renderHook(() => useCounter());

  expect(result.current.count).toBe(0);
  expect(typeof result.current.increment).toBe("function");
});
