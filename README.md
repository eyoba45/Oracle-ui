# Oracle UI — AI Agent Frontend

> Beautiful dark-themed React interface for Oracle — the AI agent that searches the web and reasons step by step.

![React](https://img.shields.io/badge/React-18-blue)
![Axios](https://img.shields.io/badge/Axios-1.x-green)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black)

---

## What it looks like

A sleek dark interface where you can:
- Ask Oracle any question
- Watch it think and search in real time — each step is shown as it happens
- See the sources it searched and read
- Get intelligent answers with full reasoning transparency

---

## Features

- **Step-by-step transparency** — see every search, every page read, every calculation Oracle makes
- **Real-time reasoning display** — watch the agent think before it answers
- **Suggestion cards** — quick-start prompts on the home screen
- **Capability chips** — shows what Oracle can do at a glance
- **New Chat** — one click to reset and start fresh
- **Floating logo navigation** — click Oracle logo to go home
- **Animated hero** — floating icon with glow effects
- **Dark professional UI** — purple gradient theme with smooth animations
- **Enter to send** — keyboard-first design
- **Responsive layout** — works on all screen sizes

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| HTTP Client | Axios |
| Styling | Pure CSS with animations |
| Build Tool | Create React App |
| Deployment | Vercel |

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/eyoba45/oracle-ui.git
cd oracle-ui
```

### 2. Install dependencies

```bash
npm install
```

### 3. Make sure Oracle backend is running

This frontend requires the Oracle backend running on port 8000.

See: https://github.com/eyoba45/oracle

```bash
# In the oracle folder
uvicorn app.api:app --reload
```

### 4. Start the app

```bash
npm start
```

Opens at `http://localhost:3000`

---

## Connecting to a deployed backend

Open `src/App.js` and change:

```javascript
const API = "http://127.0.0.1:8000";
```

To your deployed backend URL:

```javascript
const API = "https://your-oracle-backend.onrender.com";
```

---

## Project Structure

```
oracle-ui/
├── public/
│   └── index.html
├── src/
│   ├── App.js          # Main component — all UI logic
│   ├── App.css         # Complete dark theme styles
│   ├── index.js        # React entry point
│   └── index.css       # Global reset styles
└── package.json
```

---

## How the UI works

```
User types question → hits Enter
        ↓
Axios sends POST /ask to Oracle backend
        ↓
Oracle backend runs ReAct loop (search, read, reason)
        ↓
Returns { answer, steps, total_steps }
        ↓
UI renders each step as a card
        ↓
Final answer displayed below steps
```

The steps array shows exactly what Oracle did:
- 🔍 Every web search with the query used
- 🌐 Every webpage read with the URL
- 📅 Date checks
- 🧮 Calculations

---

## Backend

The FastAPI backend for Oracle is available at:
https://github.com/eyoba45/oracle

---

## Author

**Eyob Mulugeta**
GitHub: [@eyoba45](https://github.com/eyoba45)
