import { render } from "@testing-library/react";
import React from "react";
import { Nav } from "./Nav";
import { BrowserRouter } from "react-router-dom";

// Mock the @azure/msal-browser module
// jest.mock("@azure/msal-browser", () => ({
//   PublicClientApplication: jest.fn(),
// }));

describe("WorkOrders component", () => {
  it("should be in the document", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    );
    expect(getByText(/WorkOrders/i)).toBeInTheDocument();
  });
});
