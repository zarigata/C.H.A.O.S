# ChatEra: Project Overview

## 1. Vision
Create a next-generation, self-hosted messaging platform that blends MSN Messenger’s ease-of-use with today’s chat, voice, and video features—ideal for communities, businesses, and hobbyists.

## 2. Core Features
- **Real-Time Chat**  
  - One-to-one & group text with presence, typing indicators, read receipts.
- **Rich Media & Reactions**  
  - File/image upload, audio clips, emoji/sticker reactions, link previews.
- **Voice & Video Calling**  
  - Peer-to-peer and SFU-powered group calls, screen sharing.
- **Security & Moderation**  
  - Optional end-to-end encryption, JWT-based auth, RBAC, profanity filters, abuse detection.
- **Extensibility**  
  - Plugin API for bots, custom slash commands, theme packs.
- **Desktop & Web**  
  - Web (Next.js) + desktop apps (Tauri/Electron) from same codebase.
- **Admin Dashboard**  
  - Server settings, user management, analytics, plugin marketplace.

## 3. Architecture

[ User Clients ]
└─ Next.js / Electron / Tauri
↕ WebSocket / HTTP REST
[ API Gateway (Node.js + Express) ]
├─ Auth Service (OAuth2 / JWT)
├─ Chat Service (Socket.IO / gRPC)
├─ Media Service (S3-compatible)
├─ Call Service (WebRTC SFU)
[ Datastore ]
├─ PostgreSQL
├─ Redis (presence, pub/sub)
[ Infra & DevOps ]
├─ Docker / Docker-Compose / Helm
├─ Terraform / Kubernetes
└─ GitHub Actions CI/CD

markdown
Copy
Edit

## 4. Tech Stack
- **Languages**: TypeScript (Node.js + React), Rust (optional for Tauri hooks)
- **Frontend**: Next.js, React, Tailwind CSS, Zustand/Vuex-like state
- **Backend**: Node.js (NestJS or Express + Socket.IO), TypeORM
- **Database**: PostgreSQL, Redis
- **Media**: MinIO or AWS S3
- **Calling**: mediasoup or Janus
- **Desktop**: Tauri (Rust + WebView) or Electron
- **Infra**: Docker, Kubernetes, Helm, Terraform

## 5. Deployment & Packaging
- **Local Dev**: `docker-compose up`  
- **Production**: Kubernetes + Helm charts, TLS via Let’s Encrypt  
- **Desktop Build**: `npm run tauri:build` (macOS/Linux/Windows)

## 6. Competitive Service Offering
- **“ChatEra Cloud”**: a one-click, managed Docker-Compose package with built-in backups, auto-TLS, plugin marketplace.  
- **Pricing Tiers**: Free (basic chat), Pro (calls & branding), Enterprise (SLA, dedicated support).

## 7. Timeline & Milestones
1. **Phase 1**: Repo scaffolding + core chat  
2. **Phase 2**: Rich media + UX polish  
3. **Phase 3**: Voice/video calls  
4. **Phase 4**: Desktop packaging & infra  
5. **Phase 5**: Plugins & Admin UI  
6. **Phase 6**: Testing, hardening, docs, release  