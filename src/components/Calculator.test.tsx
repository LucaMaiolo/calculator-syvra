import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import Calculator from "./Calculator";

function press(...buttons: string[]) {
  for (const name of buttons) {
    fireEvent.click(screen.getByRole("button", { name }));
  }
}

function expectDisplay(value: string) {
  expect(screen.getByRole("status").textContent).toBe(value);
}

beforeEach(() => {
  render(<Calculator />);
});

afterEach(cleanup);

describe("number entry", () => {
  it("starts at zero", () => {
    expectDisplay("0");
  });

  it("appends digits without leading zeros", () => {
    press("0", "0", "1", "2", "3");
    expectDisplay("123");
  });

  it("allows only one decimal point per number", () => {
    press(".", "5", ".", "2");
    expectDisplay("0.52");
  });

  it("starts a decimal operand after an operator", () => {
    press("2", "+", ".", "5", "=");
    expectDisplay("2.5");
  });

  it("toggles a number's sign in both directions", () => {
    press("4", "+/-");
    expectDisplay("-4");
    press("+/-");
    expectDisplay("4");
  });

  it("keeps zero unsigned", () => {
    press("+/-");
    expectDisplay("0");
  });

  it("converts a number to a percentage", () => {
    press("5", "0", "%");
    expectDisplay("0.5");
  });

  it("removes one digit at a time and returns to zero", () => {
    press("1", "2", "Back");
    expectDisplay("1");
    press("Back", "Back");
    expectDisplay("0");
  });

  it("does not leave a standalone minus sign after backspace", () => {
    press("4", "+/-", "Back");
    expectDisplay("0");
  });
});

describe("calculations", () => {
  it.each([
    ["+", "11"],
    ["-", "5"],
    ["x", "24"],
    ["÷", "2.66666666667"],
  ])("calculates 8 %s 3", (operator, expected) => {
    press("8", operator, "3", "=");
    expectDisplay(expected);
  });

  it("handles negative results", () => {
    press("2", "-", "5", "=");
    expectDisplay("-3");
  });

  it("formats decimal results without floating point noise", () => {
    press(".", "1", "+", ".", "2", "=");
    expectDisplay("0.3");
  });

  it("shows the pending expression with its operator symbol", () => {
    press("8", "x");
    expectDisplay("8×");
    press("3");
    expectDisplay("8×3");
  });

  it("evaluates chained operations from left to right", () => {
    press("2", "+", "3", "x", "4", "=");
    expectDisplay("20");
  });

  it("replaces an operator before the next operand is entered", () => {
    press("8", "+", "-", "3", "=");
    expectDisplay("5");
  });

  it("ignores equals until both operands have been entered", () => {
    press("5", "=");
    expectDisplay("5");
    press("+", "=");
    expectDisplay("5+");
  });

  it("starts a fresh number when typing after a result", () => {
    press("2", "+", "3", "=", "7");
    expectDisplay("7");
  });

  it("uses the previous result as the next first operand", () => {
    press("2", "+", "3", "=", "x", "4", "=");
    expectDisplay("20");
  });

  it("clears the display and pending calculation", () => {
    press("8", "+", "3", "AC");
    expectDisplay("0");
    press("4", "=");
    expectDisplay("4");
  });
});

describe("errors", () => {
  beforeEach(() => {
    press("8", "÷", "0", "=");
    expectDisplay("Error");
  });

  it("ignores operators while displaying an error", () => {
    press("+");
    expectDisplay("Error");
  });

  it.each(["AC", "Back"])("clears an error with %s", (button) => {
    press(button);
    expectDisplay("0");
    press("2", "+", "3", "=");
    expectDisplay("5");
  });

  it("recovers when a digit is entered", () => {
    press("7", "+", "2", "=");
    expectDisplay("9");
  });

  it("recovers when a decimal point is entered", () => {
    press(".", "5");
    expectDisplay("0.5");
  });
});

describe("keyboard input", () => {
  function typeKeys(...keys: string[]) {
    for (const key of keys) fireEvent.keyDown(window, { key });
  }

  it.each(["Enter", "="])("evaluates keyboard input with %s", (key) => {
    typeKeys("1", ".", "5", "+", "2", key);
    expectDisplay("3.5");
  });

  it.each(["*", "x", "X"])("accepts %s for multiplication", (key) => {
    typeKeys("6", key, "3", "Enter");
    expectDisplay("18");
  });

  it("handles division, subtraction, and percentages", () => {
    typeKeys("8", "/", "2", "-", "1", "Enter", "%");
    expectDisplay("0.03");
  });

  it("supports Backspace and Escape", () => {
    typeKeys("1", "2", "Backspace");
    expectDisplay("1");
    typeKeys("+", "3", "Escape", "4", "Enter");
    expectDisplay("4");
  });

  it.each(["ctrlKey", "metaKey", "altKey"])(
    "ignores shortcuts using %s",
    (modifier) => {
      fireEvent.keyDown(window, { key: "9", [modifier]: true });
      expectDisplay("0");
    },
  );

  it.each(["input", "textarea", "select"])(
    "ignores typing inside a %s",
    (tag) => {
      const field = document.createElement(tag);
      document.body.append(field);
      try {
        fireEvent.keyDown(field, { key: "9" });
        expectDisplay("0");
      } finally {
        field.remove();
      }
    },
  );

  it("removes its keyboard listener when unmounted", () => {
    cleanup();
    const event = new KeyboardEvent("keydown", { key: "9", cancelable: true });
    window.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
  });
});
