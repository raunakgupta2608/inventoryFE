import { fireEvent, render, screen } from "@testing-library/react";
import GlobalState from "../context/GlobalState";
import LoginAndRegister from "../components/LoginAndRegister";
import userEvent from "@testing-library/user-event";
const Router = require("react-router-dom");

describe("Testing Login Page", () => {
  test("Testing input fields in login", async () => {
    await userEvent.setup();
    render(
      <Router.MemoryRouter
        initialEntries={[
          "/login",
          {
            pathname: "/login",
            search: "",
            hash: "",
            state: {
              type: "Login",
            },
          },
        ]}
      >
        <GlobalState>
          <LoginAndRegister />
        </GlobalState>
      </Router.MemoryRouter>
    );

    const detailsText = screen.getByText(/please enter your details\./i);
    expect(detailsText).toBeInTheDocument();

    const emailInputField = screen.getByRole("textbox", {
      name: /email/i,
    });
    expect(emailInputField).toBeInTheDocument();

    const passwordInputField = screen.getByLabelText(/password/i);
    expect(passwordInputField).toBeInTheDocument();

    const loginButton = screen.getByRole("button", {
      name: /login/i,
    });
    expect(loginButton).toBeInTheDocument();

    await userEvent.type(emailInputField, "dummy@gmail.com");
    await userEvent.type(passwordInputField, "dummyPassword");

    expect(emailInputField).toHaveValue("dummy@gmail.com");
    expect(passwordInputField).toHaveValue("dummyPassword");

    await userEvent.click(loginButton);
  });
  test("Testing input fields in register", async () => {
    await userEvent.setup();
    render(
      <Router.MemoryRouter
        initialEntries={[
          "/register",
          {
            pathname: "/register",
            search: "",
            hash: "",
            state: {
              type: "Register",
            },
          },
        ]}
      >
        <GlobalState>
          <LoginAndRegister />
        </GlobalState>
      </Router.MemoryRouter>
    );

    const detailsText = screen.getByText(/please enter your details\./i);
    expect(detailsText).toBeInTheDocument();

    const emailInputField = screen.getByRole("textbox", {
      name: /email/i,
    });
    expect(emailInputField).toBeInTheDocument();

    const passwordInputField = screen.getByLabelText(/password/i);
    expect(passwordInputField).toBeInTheDocument();

    const firstNameInputField = screen.getByRole("textbox", {
      name: /first name/i,
    });
    expect(firstNameInputField).toBeInTheDocument();

    const lastNameInputField = screen.getByRole("textbox", {
      name: /last name/i,
    });
    expect(lastNameInputField).toBeInTheDocument();

    const registerAsText = screen.getByText(/register as:/i);
    expect(registerAsText).toBeInTheDocument();

    const registerButton = screen.getByRole("button", {
      name: /register/i,
    });
    expect(registerButton).toBeInTheDocument();

    const managerRadioButton = screen.getByRole("radio", {
      name: /manager/i,
    });
    expect(managerRadioButton).toBeInTheDocument();

    const managerLabel = screen.getByText(/manager/i);
    expect(managerLabel).toBeInTheDocument();

    const assistantRadioButton = screen.getByRole("radio", {
      name: /assistant/i,
    });
    expect(assistantRadioButton).toBeInTheDocument();

    const assistantLabel = screen.getByText(/assistant/i);
    expect(assistantLabel).toBeInTheDocument();

    await userEvent.type(emailInputField, "dummy@gmail.com");
    await userEvent.type(passwordInputField, "dummyPassword");
    await userEvent.type(firstNameInputField, "Sam");
    await userEvent.type(lastNameInputField, "James");

    expect(managerRadioButton).not.toBeChecked();
    fireEvent.click(managerRadioButton);
    expect(managerRadioButton).toBeChecked();

    expect(assistantRadioButton).not.toBeChecked();
    fireEvent.click(assistantRadioButton);
    expect(assistantRadioButton).toBeChecked();

    expect(emailInputField).toHaveValue("dummy@gmail.com");
    expect(passwordInputField).toHaveValue("dummyPassword");
    expect(firstNameInputField).toHaveValue("Sam");
    expect(lastNameInputField).toHaveValue("James");

    await userEvent.click(registerButton);
  });
});
