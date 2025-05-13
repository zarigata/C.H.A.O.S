# ChatEra Development Roadmap

## Phase 1: Foundation
1. **Mono-repo Setup**  
   1.1 Create root folder & initialize git  
   1.2 Configure Lerna or pnpm workspaces  
   1.3 Add `.editorconfig`, ESLint, Prettier, Husky  
2. **Backend Scaffold**  
   2.1 `packages/backend` – NestJS/Express + TypeScript  
   2.2 Auth Module (JWT + OAuth2 endpoints)  
   2.3 Chat Module (Socket.IO endpoints, controllers)  
   2.4 Database config (TypeORM, migrations)  
3. **Frontend Scaffold**  
   3.1 `packages/frontend` – Next.js + TypeScript  
   3.2 Setup Tailwind & global styles  
   3.3 Basic pages: Login, Home, Chat layout  
4. **Infra Boilerplate**  
   4.1 `infra/docker-compose.yml` (Postgres, Redis, MinIO, API, Web)  
   4.2 Local env vars, `.env.example`

## Phase 2: Core Messaging & Media
1. **Chat UI**  
   1.1 Contact list & presence badges  
   1.2 Chat feed, message composer, markdown support  
2. **Media Upload**  
   2.1 Backend: S3 upload API + presigned URLs  
   2.2 Frontend: drag-drop, gallery carousel  
3. **Reactions & Threads**  
   3.1 Reaction picker, real-time updates  
   3.2 Thread UI nested replies

## Phase 3: Voice & Video
1. **Call Service**  
   1.1 Setup mediasoup/Janus SFU in Docker  
   1.2 Signaling via WebSocket  
2. **Frontend Integration**  
   2.1 Call UI, local/remote video elements  
   2.2 Screen sharing toggle

## Phase 4: Security & Moderation
1. **E2EE**  
   1.1 Client-side key management, Crypto API  
   1.2 Optional channel-level toggle  
2. **Moderation Tools**  
   2.1 Role-based permissions, admin panel UI  
   2.2 Profanity filter microservice

## Phase 5: Desktop & Packaging
1. **Tauri/Electron Bridge**  
   1.1 Configure build targets (macOS, Linux, Windows)  
   1.2 Native menus, tray icon, auto-update  
2. **Production Build Scripts**  
   2.1 `npm run build` + `tauri build`  
   2.2 Create binary installers (AppImage, DMG, EXE)

## Phase 6: Testing & Release
1. **Automated Tests**  
   1.1 Unit tests (Jest) for backend & frontend  
   1.2 Integration tests for auth + messaging  
   1.3 E2E tests (Playwright) for core flows  
2. **CI/CD Pipeline**  
   2.1 GitHub Actions: build + test + publish  
   2.2 Docker images → Docker Hub  
   2.3 Helm chart release to registry  
3. **Documentation & Tutorials**  
   3.1 README, CONTRIBUTING, Swagger/OpenAPI  
   3.2 Quickstart guide & deployment docs  

---

_Reminder:_ Before running any scaffold command, delete any old files from prior AI-generated runs:  
```bash
git clean -fdX .
