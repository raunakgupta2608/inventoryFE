import { render, screen } from "@testing-library/react";
import GlobalState from "../context/GlobalState";
import Home from "../components/Home";
import { MemoryRouter } from "react-router-dom";

test("Testing the landing page", () => {
  render(
    <MemoryRouter>
      <GlobalState>
        <Home />
      </GlobalState>
    </MemoryRouter>
  );

  const welcomeText = screen.getByText(/welcome to the inventory app/i);
  expect(welcomeText).toBeInTheDocument();

  const inventoryText = screen.getByRole("heading", {
    name: /have a look at our inventory\./i,
  });
  expect(inventoryText).toBeInTheDocument();

  const loginButton = screen.getByRole("button", {
    name: /login/i,
  });
  expect(loginButton).toBeInTheDocument();

  const registerButton = screen.getByRole("button", {
    name: /register/i,
  });
  expect(registerButton).toBeInTheDocument();
});
