# 🧩 Sudoku Game

A fully functional, interactive Sudoku game built with **React + Vite** and deployed via **Vercel**.  
Includes smart features like cell highlighting, input validation, undo, hints, and a victory animation!

> 🚀 [Play it live here!](https://sudoku-omega-sepia.vercel.app/)

---

## ✨ Features

- ✅ Sudoku board with random puzzle generation
- 🎯 Real-time input validation (shows wrong numbers)
- 🎯 Multiple difficulty levels
- 🔄 Undo feature
- 💡 Hint system
- 🟨 Highlight matching numbers
- 🧠 Victory detection and animation
- 📱 Responsive design – works on mobile too!

---

## 🧠 How Puzzle Generation Works

This game includes a fully custom-built Sudoku puzzle engine that guarantees **validity** and **uniqueness** for each board.

### Step-by-Step:

1. **Solved Board Generation**

   - A full Sudoku board is filled using a backtracking algorithm.
   - The board is randomized but legal, forming a valid solution.

2. **Deep Copy**

   - Before removing values, the solution board is deeply copied to preserve the final answer for:
     - Hint logic
     - Final victory validation

3. **Clue Removal With Uniqueness Guarantee**

   - A list of all cell positions is generated and shuffled.
   - For each cell:
     - Temporarily remove its value.
     - Count total solutions using a solution-counter function.
     - Solution-counter function counts total number of possible solutions of a puzzle.
     - Only remove it permanently if the board still has **exactly one solution**.

4. **Difficulty Control**
   - The engine removes clues based on desired difficulty:
     - Easy: ~35–40 clues
     - Medium: ~28–34 clues
     - Hard: ~22–27 clues
   - However, the engine may **stop early** if further removals break uniqueness — preserving solvability.

### ✅ Guarantees

- Every puzzle has **exactly one valid solution**
- Clue removal is optimized to make the board as challenging as possible without ambiguity

---

## 🛠️ Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Vercel](https://vercel.com/)
- Custom JS game logic (Sudoku engine, backtracking solver, validation, UI state)

---

## 🚀 Getting Started

Clone and run locally:

```bash
git clone https://github.com/u-cant-see-me/Sudoku.git
cd Sudoku
npm install
npm run dev
```

---

## 🙌 Acknowledgements

Made with ❤️ by **Yash Gupta**  
Thanks to the many online Sudoku tools and tutorials that inspired the logic design.
Design, highlighting interactions, and several UI features were inspired by [sudoku.com](https://sudoku.com/).
All logic — including board generation, uniqueness validation, hint systems, and animations — was implemented entirely from scratch.
