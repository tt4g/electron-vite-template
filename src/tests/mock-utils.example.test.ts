import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockedObject } from "./mock-utils";
import type { MockObject } from "./mock-utils";

describe("mockedObject", () => {
  type Foo = {
    foo(name: string): string;
    bar(age: number): string;
  };

  const expectF = (f: Foo): string => f.foo("foo");

  let mockFoo: MockObject<Foo>;
  beforeEach(() => {
    mockFoo = mockedObject<Foo>({
      foo: vi.fn((name: string) => name.toUpperCase()),
    });
  });

  it("Should call mock function", () => {
    expect(expectF(mockFoo)).toBe("FOO");
    expect(mockFoo.foo).toHaveBeenCalledOnce();
    expect(mockFoo.foo).toHaveBeenCalledWith("foo");
  });
});
