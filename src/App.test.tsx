import { render, screen } from "@testing-library/react"
import App from "./App"

test("contains clear button", async () => {
  render(<App />)

  const clearButton = screen.getAllByText("CLEAR")

  expect(clearButton).toBeInTheDocument()
})
