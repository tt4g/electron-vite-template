import type { FC, ReactElement, ReactNode } from "react";
import { render as testingLibraryRender } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";

type TestProviderProps = Readonly<{
  children: ReactNode;
}>;

const TestProvider: FC<TestProviderProps> = ({ children }) => {
  // Wrap `children` here with `React.Provider` for testing.
  return <>{children}</>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => {
  // See:
  //  - https://testing-library.com/docs/react-testing-library/setup
  //  - https://github.com/testing-library/testing-library-docs/blob/b6f8cf595c8bc46ffc1cffc740e10d00bc40d1d8/docs/react-testing-library/setup.mdx#custom-render
  return testingLibraryRender(ui, { wrapper: TestProvider, ...options });
};

export * from "@testing-library/react";
export { customRender as render };
