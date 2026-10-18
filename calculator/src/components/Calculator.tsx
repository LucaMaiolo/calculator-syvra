"use client";
import {useState} from "react";
export default function Calculator() {






    return (
        <main className="flex min-h-dvh items-center justify-center bg-zinc-950 p-4">
        <section
          aria-label="Calculator"
          className="w-full max-w-sm rounded-3xl bg-zinc-900 p-6 space-y-2"
        >
          <output className="mb-6 block text-right text-6xl text-white">
            0
          </output>
  
          <div className="grid grid-cols-4 gap-3">
            <button
              type="button"
              className="aspect-square rounded-full bg-zinc-400 text-2xl text-white hover:bg-zinc-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              Back
            </button>
            <button
              type="button"
              className="aspect-square rounded-full bg-zinc-400 text-2xl text-white hover:bg-zinc-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              AC
            </button>
            <button
              type="button"
              className="aspect-square rounded-full bg-zinc-400 text-2xl text-white hover:bg-zinc-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              %
            </button>
            <button
              type="button"
              className="aspect-square rounded-full bg-orange-400 text-2xl text-white hover:bg-orange-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
                ÷
            </button>

          </div>
          <div className="grid grid-cols-4 gap-3">
            <button
              type="button"
              className="aspect-square rounded-full bg-zinc-700 text-2xl text-white hover:bg-zinc-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              7
            </button>
            <button
              type="button"
              className="aspect-square rounded-full bg-zinc-700 text-2xl text-white hover:bg-zinc-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              8
            </button>
            <button
              type="button"
              className="aspect-square rounded-full bg-zinc-700 text-2xl text-white hover:bg-zinc-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              9
            </button>
            <button
              type="button"
              className="aspect-square rounded-full bg-orange-400 text-2xl text-white hover:bg-orange-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
                x
            </button>

          </div>
    
          <div className="grid grid-cols-4 gap-3">
            <button
              type="button"
              className="aspect-square rounded-full bg-zinc-700 text-2xl text-white hover:bg-zinc-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              4
            </button>
            <button
              type="button"
              className="aspect-square rounded-full bg-zinc-700 text-2xl text-white hover:bg-zinc-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              5
            </button>
            <button
              type="button"
              className="aspect-square rounded-full bg-zinc-700 text-2xl text-white hover:bg-zinc-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              6
            </button>
            <button
              type="button"
              className="aspect-square rounded-full bg-orange-400 text-2xl text-white hover:bg-orange-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
                -
            </button>

          </div>
          <div className="grid grid-cols-4 gap-3">
            <button
              type="button"
              className="aspect-square rounded-full bg-zinc-700 text-2xl text-white hover:bg-zinc-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              1
            </button>
            <button
              type="button"
              className="aspect-square rounded-full bg-zinc-700 text-2xl text-white hover:bg-zinc-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              2
            </button>
            <button
              type="button"
              className="aspect-square rounded-full bg-zinc-700 text-2xl text-white hover:bg-zinc-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              3
            </button>
            <button
              type="button"
              className="aspect-square rounded-full bg-orange-400 text-2xl text-white hover:bg-orange-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
                +
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            <button
              type="button"
              className="aspect-square rounded-full bg-zinc-700 text-2xl text-white hover:bg-zinc-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              +/-
            </button>
            <button
              type="button"
              className="aspect-square rounded-full bg-zinc-700 text-2xl text-white hover:bg-zinc-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              0
            </button>
            <button
              type="button"
              className="aspect-square rounded-full bg-zinc-700 text-2xl text-white hover:bg-zinc-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              .
            </button>
            <button
              type="button"
              className="aspect-square rounded-full bg-orange-400 text-2xl text-white hover:bg-orange-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
                =
            </button>

          </div>
        </section>
      </main>
    );
  }