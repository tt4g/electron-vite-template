import { vi } from "vitest";

export type { Mock } from "vitest";

type ViMocked<T> = typeof vi.mocked<T>;

export type MockedArgs<T> = Parameters<ViMocked<T>>;
export type MockedArgs1<T> = MockedArgs<T>[0];
export type MockedArgs2<T> = MockedArgs<T>[1];
export type MockObject<T extends object> = ReturnType<ViMocked<T>>;

export const mocked = vi.mocked;

/**
 * Create mock from partial `T` object (Typescript helper).
 *
 * See: https://github.com/vitest-dev/vitest/pull/1742
 *
 * Usage:
 *
 * ```typescript
 * import { expect, it, vi } from "vitest";
 * import { mockedObject } from "./mock-utils";
 * import type { MockObject } from "./mock-utils";
 *
 * type Foo = {
 *   foo(name: string): string;
 *   bar(age: number): string;
 * };
 *
 * const expectF = (f: Foo): string => f.foo("foo");
 *
 * it("Example mockedObject", () => {
 *   const mockFoo: MockObject<Foo> = mockedObject<Foo>({
 *     foo: vi.fn((name: string) => name.toUpperCase()),
 *   });
 *
 *   expect(expectF(mockFoo)).toBe("FOO");
 *   expect(mockFoo.foo).toHaveBeenCalledOnce();
 *   expect(mockFoo.foo).toHaveBeenCalledWith("foo");
 * });
 * ```
 *
 * @param {Partial<T>} implementation
 * @returns {MockObject<T>}
 */
export const mockedObject = <T extends object>(
  implementation: Partial<T>
): MockObject<T> => {
  return vi.mocked(implementation, { partial: true }) as MockObject<T>;
};
