# Majesty AI: responsive, installable app and free deployment

## What was updated
- Corrected `Frontend/.env` to use the current Render API base URL (`.../api`).
- Added PWA manifest, app icons and service-worker registration so supported browsers can install Majesty AI.
- Added responsive global rules and mobile navigation styling.
- Improved database-pool error handling and made login configuration failures easier to identify in Render logs.
- Added a safe SQL migration for the `users.avatar` field used by profile endpoints.

## Before deploying
1. **Never commit `.env` files.** For local frontend development, copy `Frontend/.env.example` to `Frontend/.env`. Set the same `VITE_API_URL` value in your frontend host settings.
2. In Render backend Environment, configure `DATABASE_URL` to your PostgreSQL database and `JWT_SECRET` to a strong random value. `PORT` is supplied by Render automatically; a local value is optional.
3. In Render Shell or your PostgreSQL SQL console, run `Backend/src/config/migrations/001_add_user_avatar.sql` against the same database used by `DATABASE_URL`. It only adds the missing `avatar` column if needed.
4. Deploy the backend from the repository root with Root Directory `Backend`, Build Command `npm install`, Start Command `npm start`.
5. Set frontend environment variable `VITE_API_URL=https://majesty-backend-inux.onrender.com/api` on the frontend host, then rebuild/redeploy the frontend.
6. Verify `https://majesty-backend-inux.onrender.com/api/health` and `/api/health/db`. Health endpoints should return `status: ok`. Then try login and check Render Logs if it fails.

## Render free-tier caveat
Render free web services can spin down after inactivity and take time to wake up. A free web service is not the same as a permanently awake server. Render free PostgreSQL instances also have time/retention limits, so **do not assume the database will remain available indefinitely on the free tier**. Review the current limits shown in your Render dashboard before relying on it for long-term data. Export backups regularly. No deployment can be completed inside this source archive; you must connect/push the project and deploy it from your Render account.

## Install the app
- **Android / desktop Chrome or Edge:** open the deployed HTTPS website, then choose the browser's `Install app` option (or `Add to Home screen` on Android).
- **iPhone/iPad:** open in Safari, tap Share, then `Add to Home Screen`.
- The app shell may open after first visit, but login, translation and history still need an internet connection and a working backend.

## Local setup
- Frontend: `cd Frontend && npm install && npm run dev`
- Backend: create `Backend/.env` from `.env.example`, fill in your real credentials, then `cd Backend && npm install && npm start`.
