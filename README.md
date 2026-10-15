# Learn Finance Monolith

A modern full-stack monolith repository configured with **pnpm workspaces**, separating the Next.js frontend and Express backend into decoupled, independent TypeScript packages.

## Architecture

```
learn-finance/
├── package.json               # Root workspace scripts & orchestration
├── pnpm-workspace.yaml        # pnpm workspaces definition
├── .gitignore                 # Root git ignore
│
├── frontend/                  # Next.js 16 + Tailwind CSS (App Router)
│   ├── package.json           # Frontend-specific dependencies
│   ├── tsconfig.json          # Frontend TypeScript config
│   ├── .env.local             # Frontend environment variables (Port 3000)
│   └── src/app/               # Next.js App Router & Tailwind styles
│
└── backend/                   # Express + TypeScript
    ├── package.json           # Backend-specific dependencies
    ├── tsconfig.json          # Backend TypeScript config
    ├── .env                   # Backend environment variables (Port 5000)
    └── src/index.ts           # Express server entry point with CORS
```

## Getting Started

### 1. Install Dependencies
Run from the root directory:
```bash
pnpm install
```

### 2. Development Mode
Run both services concurrently:
```bash
pnpm dev
```
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)

### 3. Run Individual Services
- **Frontend only**:
  ```bash
  pnpm dev:frontend
  ```
- **Backend only**:
  ```bash
  pnpm dev:backend
  ```

### 4. Build for Production
- **Build all packages**:
  ```bash
  pnpm build
  ```
- **Build backend only**:
  ```bash
  pnpm build:backend
  ```
- **Build frontend only**:
  ```bash
  pnpm build:frontend
  ```

## API Endpoints
- `GET /api/health` — Service health check
- `GET /api/hello` — Sample greeting endpoint
