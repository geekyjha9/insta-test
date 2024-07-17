import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jasmine-dom";
import { BrowserRouter } from "react-router-dom";
import SignUp from "../src/pages/SignUp";

describe("SignUp component tests", () => {
  beforeEach(() => {
    // Mock fetch globally to spy on it
    spyOn(window, "fetch").and.returnValue(
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
    );
  });

  afterEach(() => {
    // Reset spy after each test
    window.fetch.calls.reset();
  });

  it("SignUp form should be rendered with all necessary fields", () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText(/Full Name/i)).toBeTruthy(); // Use .toBeTruthy() instead of .toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Email/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/Username/i)).toBeTruthy();
    expect(screen.getByPlaceholderText(/Password/i)).toBeTruthy();
  });

  it("should call the signup function on form submission", async () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    const nameInput = screen.getByPlaceholderText(/Full Name/i);
    fireEvent.change(nameInput, { target: { value: "John Doe" } });

    const emailInput = screen.getByPlaceholderText(/Email/i);
    fireEvent.change(emailInput, { target: { value: "geekyjha@gmail.com" } });

    const usernameInput = screen.getByPlaceholderText(/Username/i);
    fireEvent.change(usernameInput, { target: { value: "johndoe" } });

    const passwordInput = screen.getByPlaceholderText(/Password/i);
    fireEvent.change(passwordInput, {
      target: { value: "StrongPassword#123" },
    });

    const submitButton = screen.getByRole("button", { name: /Sign Up/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("http://localhost:4000/signup");
    });
  });


});
