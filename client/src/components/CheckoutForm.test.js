import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
  render(<CheckoutForm />);
});

test("form shows success message on submit with form details", async () => {
  const container = render(<CheckoutForm />);

  const f_name = container.getByTestId("f_name");
  //   const l_name = container.getByTestId("l_name");
  //   const address = container.getByTestId("address");
  //   const city = container.getByTestId("city");
  //   const state = container.getByTestId("state");
  //   const zip = container.getByTestId("zip");
  const submit = container.getByTestId("submit");

  fireEvent.change(f_name, { target: { value: "Nathaniel" } });
  expect(f_name.value).toBe("Nathaniel");

  fireEvent.click(submit);
  const message = await container.getByTestId("successMessage");
  expect(message).toBeVisible();
});
