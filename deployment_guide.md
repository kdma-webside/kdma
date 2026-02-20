# Deployment Hand-off Guide

This document contains the technical requirements and configuration needed to deploy the **Mallakhambam Website**.

## 🚀 Environment Variables
The following environment variables must be configured in the production environment:

| Variable | Description | Example/Requirement |
| :--- | :--- | :--- |
| `DATABASE_URL` | Turso connection string | `libsql://your-db-name.turso.io` |
| `TURSO_AUTH_TOKEN` | Turso authentication token | From Turso Dashboard |
| `SESSION_SECRET` | Secret key for JWT session encryption | Use a long random string |
| `NODE_ENV` | Environment mode | `production` |

## 🛠️ Build & Runtime Requirements
- **Node.js**: version `18.x` or higher.
- **Package Manager**: `npm` (version `10.x` or higher).

### Build Commands
1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Generate Database Client**:
   ```bash
   npx prisma generate
   ```
3. **Build the Application**:
   ```bash
   npm run build
   ```
   > [!NOTE]
   > The build command is pre-configured as `next build --webpack` in `package.json`.

## 🌐 Deploying to Hostinger

### Recommended Plan: VPS or Managed Node.js
Do **not** use Hostinger's standard "Web Hosting" (Shared) for this project, as it restricted to static sites. To support the Admin Dashboard and database features, you need a **VPS** or **Managed Node.js** plan.

### Hostinger VPS Setup Steps
1. **Choose OS**: Ubuntu 22.04 or higher is recommended.
2. **Setup Environment**:
   ```bash
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2 (Process Manager)
   npm install pm2 -g
   ```
3. **Deployment**:
   - Clone the repository to the VPS.
   - Set up the `.env` file with the variables listed above.
   - Run `npm install` and `npm run build`.
   - Start the app using PM2:
     ```bash
     pm2 start npm --name "malla-shakti" -- start
     ```
4. **Reverse Proxy**: Configure Nginx to point your domain to `http://localhost:3000`.

## 📦 Database Management
The project uses **Prisma** with **Turso (SQLite via LibSQL)**.

- **Initialization**: Run `npx prisma db push` to synchronize the schema with the production Turso instance (if not already synced).
- **Client Generation**: The `postinstall` script in `package.json` handles `prisma generate` automatically.

## ⚠️ Special Configurations
The `next.config.mjs` is configured to handle external server packages required for Turso and Prisma:
```javascript
serverExternalPackages: ['@libsql/client', '@prisma/adapter-libsql', '@libsql/isomorphic-fetch', '@prisma/client']
```

## 📧 Email Configuration (If Required)
If automated emails for enquiries or news letters are enabled, the following should also be configured (check current implementation in `src/app/actions/enquiries.ts`):
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
