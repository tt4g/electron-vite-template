import { expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "./react-utils";

it("Example user-event", async () => {
  const user = userEvent.setup();
  const mockOnClick = vi.fn();

  const { asFragment } = render(<button role="button" onClick={mockOnClick} />);
  const element = screen.getByRole("button");
  await user.click(element);

  expect(element).toBeInTheDocument();
  expect(mockOnClick).toHaveBeenCalledOnce();
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <button
        role="button"
      />
    </DocumentFragment>
  `);
});
