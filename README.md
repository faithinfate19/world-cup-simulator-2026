# World-cup-simulator-2026
Here's a full README for your project:

---

# ⚽ FIFA World Cup 2026 Simulator

A frontend-only React application that simulates the entire 2026 FIFA World Cup — from group stage through to the final — using real historical international football data and probabilistic match simulation.

---

## What it does

- Loads and parses historical international match results from a CSV file
- Builds ELO-based strength ratings for every team from that historical data
- Simulates all 12 group stages with round-robin fixtures
- Applies the correct 2026 qualification rules — top 2 from each group plus the 8 best third-place teams advance
- Runs a full 32-team knockout bracket across 5 rounds (Round of 32 → Round of 16 → Quarter Finals → Semi Finals → Final)
- Runs 500 Monte Carlo simulations to produce championship win probabilities for every qualifier
- Lets you randomize group assignments and re-simulate instantly

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React 18 |
| Build tool | Vite |
| CSV parsing | PapaParse |
| Animations | Framer Motion |
| Styling | Plain CSS with CSS variables |
| Data | `results.csv` — historical international match results |

No backend. No database. No external API calls. Runs entirely in the browser.

---

## Project structure

```
world-cup-simulator/
│
├── public/
│   └── results.cs
