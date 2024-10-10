// App.test.jsx
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import App from "../App";

test("renders an h1 tag", () => {
    render(<App />);
    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent("Create New User");
  });
