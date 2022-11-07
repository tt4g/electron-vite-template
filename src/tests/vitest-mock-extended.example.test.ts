import { beforeEach, describe, expect, it, vi } from "vitest";
import { mock, mockFn, any } from "vitest-mock-extended";
import type { MockProxy } from "vitest-mock-extended";

describe("mockedObject", () => {
  type Foo = {
    foo(name: string): string;
    bar(age: number): string;
  };

  const expectF = (f: Foo): string => f.foo("foo");

  let mockFoo: MockProxy<Foo>;
  beforeEach(() => {
    mockFoo = mock<Foo>({
      foo: vi.fn((name: string) => name.toUpperCase()),
    });
  });

  it("Should call mock function", () => {
    expect(expectF(mockFoo)).toBe("FOO");
    expect(mockFoo.foo).toHaveBeenCalledOnce();
    expect(mockFoo.foo).toHaveBeenCalledWith("foo");
  });
});
