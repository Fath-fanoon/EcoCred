# EcoCred Backend

## Setup

1. Install dependencies:
   ```
   npm install
   ```
2. Create a `.env` file (already provided):
   ```
   MONGODB_URI=mongodb://localhost:27017/ecocred
   PORT=5000
   ```
3. Start MongoDB locally (default port 27017).
4. Run the server:
   ```
   node server.js
   ```

## API Endpoints

- `POST /users/signup` — Register user (name, email)
- `POST /users/login` — Login with email
- `POST /actions` — Submit eco action
- `GET /actions/:userId` — Get all actions by user
- `GET /tokens/:userId` — Get EcoToken balance
- `POST /tokens/reward` — Reward tokens for action

---

- Image URLs are mocked (string only)
- GPS is stored as text
- No authentication for MVP 