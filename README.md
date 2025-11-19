# Pre Setup Hackathon Template

A handcrafted MERN starter that feels bespoke, not auto-generated. It ships with animated logo loading, full auth flow (register, login, forgot password), role and plan management, AI chat playground, premium dashboard, subscription view, and placeholder pages ready for hackathon twists.

## Folder Structure

```
Pre set-up Hackathon/
├── backend/
│   ├── env.sample
│   ├── package.json
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── services/
│       ├── utils/
│       └── server.js
└── frontend/
    ├── index.html
    ├── package.json
    └── src/
        ├── components/
        ├── context/
        ├── data/
        ├── hooks/
        ├── layouts/
        ├── pages/
        ├── services/
        ├── styles/
        ├── App.tsx
        └── main.tsx
```

## Quick Start

### 1. Backend (API)

```powershell
cd backend
copy env.sample .env   # or use cp on mac/linux
# Update placeholders: {{PROJECT_NAME}}, {{PROJECT_LOGO}}, {{MONGO_CONNECTION_URL}}, {{AI_API_KEY}}
npm install
npm run dev
```

The server runs on `http://localhost:5000` by default. Routes:
- `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/forgot-password`, `GET /api/auth/me`
- `PUT /api/users/role`, `PUT /api/users/plan`, `PUT /api/users/profile`
- `GET /api/chat`, `POST /api/chat`

### 2. Frontend (Vite + React)

```powershell
cd frontend
npm install
npm run dev
```

The client expects `VITE_API_URL` in `frontend/.env` (defaults to `http://localhost:5000` if unset).

### 3. Production builds

```powershell
cd backend && npm run start    # uses compiled server.js
cd frontend && npm run build   # outputs to frontend/dist
```

## Customization Tips

- Replace `{{PROJECT_LOGO}}`, `{{PROJECT_NAME}}`, and `{{AI_API_KEY}}` placeholders in UI/env files.
- Update role and plan options in `frontend/src/data/navLinks.ts`.
- Connect a real AI provider by swapping the placeholder logic in `backend/src/services/chatService.js`.
- All UI cards/tiles pull styles from `frontend/src/styles/global.css` for easy theming.

## Notes

- Mongoose handles local auth storage; swap `{{MONGO_CONNECTION_URL}}` with local Mongo or Atlas.
- Chat history persists per user document via the `ChatMessage` collection.
- Dashboard, chatbot, subscriptions, and placeholder pages are routed via React Router and guarded by the auth context.

