# FORGE — Train. Track. Transform. (MERN Stack Version)

Welcome to the **FORGE** fitness platform prototype! This project is organized as a full-stack **MERN** application. 

If you are new to MERN stack development, this document is written to give you a clear, easy-to-understand explanation of how the system works, how the folders are structured, and how to get it running.

---

## 1. What is the MERN Stack?

MERN represents four core technologies working together to build a modern web application:

```
  ┌──────────────────────────────────────────────────────────┐
  │                        R - React                         │
  │     (The Frontend: What you see in the browser)           │
  └────────────────────────────┬─────────────────────────────┘
                               │
            Sends HTTP Requests│Receives JSON Data
            (fetch / axios)    │(apiService)
                               ▼
  ┌──────────────────────────────────────────────────────────┐
  │                 E & N - Express & Node.js                │
  │     (The Backend: Receives requests, processes logic)    │
  └────────────────────────────┬─────────────────────────────┘
                               │
                    Saves/Loads│Mongoose
                    Documents  │ODM Mapping
                               ▼
  ┌──────────────────────────────────────────────────────────┐
  │                        M - MongoDB                       │
  │     (The Database: Stores user profiles & metrics)       │
  └──────────────────────────────────────────────────────────┘
```

1. **MongoDB (M - Database)**: A document-based database. Instead of rows and columns (like Excel or SQL), MongoDB stores data in structures resembling JSON files (documents). In this project, we use it to store your Name, Age, Height, Weight, and Body Fat %.
2. **Express (E - API Server)**: A backend web application framework for Node.js. It listens to requests sent by your browser and decides how to reply (for example, reading a profile, writing adjustments, or serving workouts).
3. **React (R - User Interface)**: The browser-side framework. It manages the buttons, active tabs, animated barbell plates, and input forms. It renders all components dynamically based on state.
4. **Node.js (N - Runtime environment)**: The engine that lets JavaScript run on your computer's server instead of just inside the browser. It runs our Express backend.

---

## 2. Project Folder Structure

The project has been separated into modular sections to keep it clean and readable:

```text
d:/fitness 2/
├── package.json         # Workspace scripts to run client & server together
├── client/              # React frontend (Vite scaffolded)
│   ├── src/
│   │   ├── index.css    # Colors, fonts, barbell animations, layout rules
│   │   ├── App.jsx      # Navigation, active page router, global state
│   │   ├── api.js       # Client API connector (uses localStorage or server fetch)
│   │   └── modules/     # Individual UI files for the 7 plates
│   │       ├── Profile.jsx
│   │       ├── FitnessLevel.jsx
│   │       ├── Workouts.jsx
│   │       ├── Nutrition.jsx
│   │       ├── Supplements.jsx
│   │       ├── DietGoal.jsx
│   │       └── AdultZone.jsx
└── server/              # Express backend server
    ├── server.js        # Server entry point (configures ports and middlewares)
    ├── .env             # Environment file (defines MongoDB connection URI)
    ├── config/db.js     # Mongoose MongoDB connection setup
    ├── models/          # MongoDB Mongoose collection schemas
    │   └── Profile.js   # Defines variables saved in the database
    └── routes/          # API endpoint paths
        └── api.js       # List of routes (/api/profile, /api/fitness, etc.)
```

---

## 3. How to Run FORGE

You can run FORGE in two modes: **Frontend-Only** (offline, zero-configuration) or **Full-Stack MERN** (with database connection).

### Mode A: Frontend-Only Mode (Easiest to start)
By default, the React frontend is set up to run using browser `localStorage` as a mock database. This requires **no database configuration** and runs out of the box.

1. Open your terminal in the main folder `d:/fitness 2`.
2. Start the React development client:
   ```bash
   npm run client
   ```
3. Open your browser and navigate to the address shown (usually `http://localhost:5173`).
4. Enter profile metrics, click barbell plates, select fitness levels or diet goals. Try refreshing the page — your data persists in the browser cache!

---

### Mode B: Full-Stack MERN Mode (Connecting the Backend)
To run the full stack with MongoDB and Express:

#### Step 1: Install MongoDB
Ensure MongoDB is installed and running on your local machine:
- Download the free **MongoDB Community Server** online and install it.
- Alternatively, you can use a cloud database (MongoDB Atlas) and paste your connection string inside `server/.env`.

#### Step 2: Install Backend Dependencies
Open a second terminal window (or run in root) and run:
```bash
npm run install-all
```
This automatically runs `npm install` inside both the `client/` and `server/` directories.

#### Step 3: Enable Server API Connection in React
Open the file [client/src/api.js](file:///d:/fitness%202/client/src/api.js):
- Change `const USE_REAL_BACKEND = false;` to `true`.
- Save the file.

#### Step 4: Run Both Servers Concurrently
In your main terminal, run:
```bash
npm run dev
```
This single command runs the React client (on port `5173`) and the Express server (on port `5000`) concurrently.

The server will print:
`MongoDB Connected successfully: localhost`

Now, whenever you save your profile metrics, the React frontend calls `apiService.saveProfile()`, which fires an HTTP request to the Express server, saving the metrics permanently into your MongoDB database!

---

## 4. Where to Inspect the Code

For a clear understanding of the MERN architecture, review these key files:
- **How data is designed**: Inspect the database model in [server/models/Profile.js](file:///d:/fitness%202/server/models/Profile.js).
- **How backend endpoints are defined**: Inspect the endpoints in [server/routes/api.js](file:///d:/fitness%202/server/routes/api.js).
- **How the frontend communicates**: Inspect [client/src/api.js](file:///d:/fitness%202/client/src/api.js) to see how frontend calls map to backend fetches.
- **How state propagates**: Check [client/src/App.jsx](file:///d:/fitness%202/client/src/App.jsx) to trace how user inputs flow down to other components (like workouts and diet).
