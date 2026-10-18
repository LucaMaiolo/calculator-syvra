"use client";
import { useEffect, useState } from "react";

export default function Calculator() {
    const [display, setDisplay] = useState("0");
    const [firstNumber, setFirstNumber] = useState<number | null>(null);
    const [operator, setOperator] = useState<string | null>(null);
    const [startNewNumber, setStartNewNumber] = useState(false);

    //ai generated - view link in readme for convo
    const operatorSymbol =    
    operator === "*" ? "×" :
    operator === "/" ? "÷" :
    operator;
    const displayText =
        firstNumber !== null && operatorSymbol !== null
        ? `${firstNumber}${operatorSymbol}${startNewNumber ? "" : display}`
        : display;


    //ai generated - view link in readme for convo
    const fontSize = Math.max(
        28,
        60 - Math.max(0, displayText.length - 8) * 4
      );
  
    function inputDigit(digit: string) {
        if (startNewNumber || display === "Error") {
          setDisplay(digit);
          setStartNewNumber(false);
          return;
        }
      
        setDisplay((current) => (current === "0" ? digit : current + digit));
      }

      function clear() {
        setDisplay("0");
        setFirstNumber(null);
        setOperator(null);
        setStartNewNumber(false);
      }
      
      
    function backspace() {
        if (display === "Error") {
            clear();
            return;
          }
        setDisplay((current) => {
          const remaining = current.slice(0, -1);
          return remaining === "" || remaining === "-" ? "0" : remaining;
        });
      }
    
        function inputDecimal() {
        if (startNewNumber || display === "Error") {
          setDisplay("0.");
          setStartNewNumber(false);
          return;
        }
      
        setDisplay((current) =>
          current.includes(".") ? current : current + "."
        );
      }
    function toggleSign() {
        setDisplay((current) => {
          if (Number(current) === 0) return current;
      
          return current.startsWith("-")
            ? current.slice(1)
            : "-" + current;
        });
      }  
     
    function percentage() {
        setDisplay((current) => String(Number(current) / 100));
      }

      function calculate(left: number, right: number, operation: string) {
        switch (operation) {
          case "+":
            return left + right;
          case "-":
            return left - right;
          case "*":
            return left * right;
          case "/":
            return right === 0 ? NaN : left / right;
          default:
            return right;
        }
      }
      
      function formatResult(value: number) {
        return Number.isFinite(value)
          ? String(Number(value.toPrecision(12)))
          : "Error";
      }
      
      function selectOperator(nextOperator: string) {
        if (display === "Error") return;
      
        let value = Number(display);
      
        if (firstNumber !== null && operator !== null && !startNewNumber) {
          value = calculate(firstNumber, value, operator);
          setDisplay(formatResult(value));
        }
      
        if (!Number.isFinite(value)) {
          setFirstNumber(null);
          setOperator(null);
          setStartNewNumber(true);
          return;
        }
      
        setFirstNumber(value);
        setOperator(nextOperator);
        setStartNewNumber(true);
      }
      
      function equals() {
        if (
          firstNumber === null ||
          operator === null ||
          startNewNumber ||
          display === "Error"
        ) {
          return;
        }
      
        const result = calculate(firstNumber, Number(display), operator);
      
        setDisplay(formatResult(result));
        setFirstNumber(null);
        setOperator(null);
        setStartNewNumber(true);
      }

      //ai generated - view link in readme for convo
      useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
          if (event.ctrlKey || event.metaKey || event.altKey) return;
      
          const target = event.target;
          if (
            target instanceof HTMLElement &&
            (target.isContentEditable ||
              target.closest("input, textarea, select"))
          ) {
            return;
          }
      
          const { key } = event;
      
          if (/^[0-9]$/.test(key)) {
            event.preventDefault();
            inputDigit(key);
            return;
          }
      
          switch (key) {
            case "+":
            case "-":
            case "*":
            case "/":
              event.preventDefault();
              selectOperator(key);
              break;
      
            case ".":
              event.preventDefault();
              inputDecimal();
              break;
      
            case "=":
            case "Enter":
              event.preventDefault();
              equals();
              break;
      
            case "Backspace":
              event.preventDefault();
              backspace();
              break;
      
            case "Escape":
              event.preventDefault();
              clear();
              break;
      
            case "%":
              event.preventDefault();
              percentage();
              break;
            case "x":
            case "X":
              event.preventDefault();
              selectOperator("*");
              break;
          }
          
        }
      
        window.addEventListener("keydown", handleKeyDown);
      
        return () => {
          window.removeEventListener("keydown", handleKeyDown);
        };
      });
    return (
        <main className="flex min-h-dvh items-center justify-center bg-zinc-950 p-4">
        <section
          aria-label="Calculator"
          className="w-full max-w-sm rounded-3xl bg-zinc-900 p-6 space-y-2"
        >
          {/* //ai generated - view link in readme for convo */}
          <output
            className="mb-6 flex h-20 items-center overflow-x-auto whitespace-nowrap text-white">
            <span
                className="block w-max min-w-full shrink-0 text-right leading-none"
                style={{ fontSize: `${fontSize}px` }}>
                {displayText}
            </span>
        </output>
          <div className="grid grid-cols-4 gap-3">
            <button
              type="button"
              onClick={backspace}
              className="aspect-square rounded-full bg-zinc-400 text-2xl text-white hover:bg-zinc-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              Back
            </button>
            <button
                type="button"
                onClick={clear}
                className="aspect-square rounded-full bg-zinc-400 text-2xl text-white hover:bg-zinc-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              AC
            </button>
            <button
              type="button"
              onClick={percentage}
              className="aspect-square rounded-full bg-zinc-400 text-2xl text-white hover:bg-zinc-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              %
            </button>
            <button
              type="button"
              onClick={() => selectOperator("/")}
              className="aspect-square rounded-full bg-orange-400 text-2xl text-white hover:bg-orange-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
                ÷
            </button>

          </div>
          <div className="grid grid-cols-4 gap-3">
            <button
              type="button"
              onClick={() => inputDigit("7")}
              className="aspect-square rounded-full bg-zinc-700 text-2xl text-white hover:bg-zinc-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              7
            </button>
            <button
              type="button"
              onClick={() => inputDigit("8")}
              className="aspect-square rounded-full bg-zinc-700 text-2xl text-white hover:bg-zinc-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              8
            </button>
            <button
              type="button"
              onClick={() => inputDigit("9")}
              className="aspect-square rounded-full bg-zinc-700 text-2xl text-white hover:bg-zinc-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              9
            </button>
            <button
              type="button"
              onClick={() => selectOperator("*")}
              className="aspect-square rounded-full bg-orange-400 text-2xl text-white hover:bg-orange-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
                x
            </button>

          </div>
    
          <div className="grid grid-cols-4 gap-3">
            <button
              type="button"
              onClick={() => inputDigit("4")}
              className="aspect-square rounded-full bg-zinc-700 text-2xl text-white hover:bg-zinc-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              4
            </button>
            <button
              type="button"
              onClick={() => inputDigit("5")}
              className="aspect-square rounded-full bg-zinc-700 text-2xl text-white hover:bg-zinc-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              5
            </button>
            <button
              type="button"
              onClick={() => inputDigit("6")}
              className="aspect-square rounded-full bg-zinc-700 text-2xl text-white hover:bg-zinc-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              6
            </button>
            <button
              type="button"
              onClick={() => selectOperator("-")}
              className="aspect-square rounded-full bg-orange-400 text-2xl text-white hover:bg-orange-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
                -
            </button>

          </div>
          <div className="grid grid-cols-4 gap-3">
            <button
              type="button"
              onClick={() => inputDigit("1")}
              className="aspect-square rounded-full bg-zinc-700 text-2xl text-white hover:bg-zinc-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              1
            </button>
            <button
              type="button"
              onClick={() => inputDigit("2")}
              className="aspect-square rounded-full bg-zinc-700 text-2xl text-white hover:bg-zinc-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              2
            </button>
            <button
              type="button"
              onClick={() => inputDigit("3")}
              className="aspect-square rounded-full bg-zinc-700 text-2xl text-white hover:bg-zinc-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              3
            </button>
            <button
              type="button"
              onClick={() => selectOperator("+")}
              className="aspect-square rounded-full bg-orange-400 text-2xl text-white hover:bg-orange-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
                +
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            <button
              type="button"
              onClick={toggleSign}
              className="aspect-square rounded-full bg-zinc-700 text-2xl text-white hover:bg-zinc-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              +/-
            </button>
            <button
              type="button"
              onClick={() => inputDigit("0")}
              className="aspect-square rounded-full bg-zinc-700 text-2xl text-white hover:bg-zinc-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              0
            </button>
            <button
              type="button"
              onClick={inputDecimal}
              className="aspect-square rounded-full bg-zinc-700 text-2xl text-white hover:bg-zinc-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              .
            </button>
            <button
              type="button"
              onClick={equals}
              className="aspect-square rounded-full bg-orange-400 text-2xl text-white hover:bg-orange-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
                =
            </button>

          </div>
        </section>
      </main>
    );
  }