# Zoom Clone

A full-stack video calling application with chat functionality, built with Node.js (Express, Socket.io) for the backend and React (Material-UI) for the frontend.

---

## Project Structure

```
ZOOM GIT/
│
├── backend/
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── src/
│       ├── app.js                  # Main Express app entry point
│       ├── controllers/
│       │   ├── socketManager.js    # Socket.io logic
│       │   └── user.controller.js  # User-related logic
│       ├── models/
│       │   ├── meeting.model.js    # Meeting schema
│       │   └── user.model.js       # User schema
│       └── routes/
│           └── users.routes.js     # User routes
│
├── frontend/
│   ├── .gitignore
│   ├── package.json
│   ├── public/
│   │   ├── background.png
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo3.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   ├── mobile.png
│   │   └── robots.txt
│   └── src/
│       ├── App.js                  # Main React app entry point
│       ├── App.css                 # Global styles
│       ├── App.test.js             # App tests
│       ├── environment.js          # API endpoint config
│       ├── index.js                # ReactDOM render
│       ├── index.css               # Global CSS
│       ├── logo.svg
│       ├── reportWebVitals.js
│       ├── setupTests.js
│       ├── contexts/
│       │   ├── AuthContext.jsx     # Auth context provider
│       │   └── backend.code-workspace
│       ├── pages/
│       │   ├── authentication.jsx  # Auth page
│       │   ├── history.jsx         # Meeting history page
│       │   ├── home.jsx            # Home page
│       │   ├── landing.jsx         # Landing page
│       │   └── VideoMeet.jsx       # Video meeting page
│       ├── styles/
│       │   └── videoComponent.module.css
│       └── utils/
│           └── withAuth.jsx        # Auth HOC
│
└── README.md
```

---

## Prerequisites

- Node.js (v16 or above recommended)
- npm (comes with Node.js)

---

## Backend Setup

1. **Navigate to the backend folder:**
   ```sh
   cd backend
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Start the backend server (development mode):**
   ```sh
   npm run dev
   ```
   Or to start normally:
   ```sh
   node src/app.js
   ```
   The backend will start (by default) on port 8000 or as configured in your code.

---

## Frontend Setup

1. **Open a new terminal and navigate to the frontend folder:**
   ```sh
   cd frontend
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Start the React development server:**
   ```sh
   npm start
   ```
   The frontend will be available at [http://localhost:3000](http://localhost:3000) by default.

---

## Usage

- Register or login to your account.
- Join as a guest or create/join a meeting using a meeting code.
- Use the video call and chat features.
- View your meeting history from the history page.

---

## Notes

- Make sure both backend and frontend servers are running simultaneously for full functionality.
- Update the backend API URL in `frontend/src/environment.js` if your backend runs on a different port or host.

---

## License

This project is for educational purposes.
