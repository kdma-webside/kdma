# Vercel Environment Variables Setup

This document lists ALL environment variables that must be configured in the Vercel dashboard for production deployment.

## How to Add Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable below with its corresponding value
4. Select **Production** environment
5. Click **Save**
6. **Redeploy** your project for changes to take effect

---

## Required Environment Variables

### 🔐 Database Connection (Critical)

```bash
DATABASE_URL=https://kdma-kdma.aws-ap-south-1.turso.io
```
**Description**: Production Turso database URL. This MUST be the `https://` URL, not a local file path.

```bash
TURSO_AUTH_TOKEN=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJnaWQiOiI3ZjgzYzA2ZS1hNmRiLTQ4Y2UtOTM1Ny0wNGQyMDBhMjA3NjUiLCJpYXQiOjE3NzAzNTE1NzYsInJpZCI6IjNjZDc0YzM3LTcxODgtNGU1NS1iYzU1LTcyYWQzZDA0MGM1MCJ9.DJX1hiI65-U3hKa6p3IwzkJTZSdqqaBIavdpC7tLS1OTFwGpYFKIDDH9p8-RIcWDfBJdx_XtToQeGtD1oskODw
```
**Description**: Turso authentication token for database access.

---

### 💳 UPI Payment Configuration (Critical)

```bash
NEXT_PUBLIC_UPI_ID=lemuriaselvanr-5@okicici
```
**Description**: Your UPI ID for receiving payments. This will be displayed in the payment modal.

```bash
NEXT_PUBLIC_UPI_QR_CODE_URL=/images/payment-qr.jpeg
```
**Description**: Path to the UPI QR code image (already in the repository at `public/images/payment-qr.jpeg`).

---

### 🔒 Session Security (Critical)

```bash
SESSION_SECRET=k2kdma_legacy_warrior_portal_secret_key_2026_shakti
```
**Description**: Secret key for JWT session encryption. Must be a long, random string.

```bash
NODE_ENV=production
```
**Description**: Environment mode indicator.

---

### 📧 Email Configuration (Optional)

```bash
EMAIL_USER=hellokdma@gmail.com
```
**Description**: Gmail address for sending automated emails.

```bash
EMAIL_PASS=rvwq umki negi dwgv
```
**Description**: Gmail app password (not your regular password). Get it from [Google App Passwords](https://myaccount.google.com/apppasswords).

---

## Verification Checklist

After adding all environment variables and redeploying:

- [ ] UPI payment modal shows the correct UPI ID and QR code
- [ ] Committee members page displays all 8 members
- [ ] Store shows all 6 products
- [ ] Trainings page displays training programs
- [ ] Events page shows events including memories section
- [ ] Admin login works correctly

---

## Common Issues

### Issue: UPI modal shows "your-upi-id@paytm"
**Solution**: `NEXT_PUBLIC_UPI_ID` is not set. Add it to Vercel environment variables and redeploy.

### Issue: Committee/Store/Trainings pages are empty
**Solution**: `DATABASE_URL` is not set or is pointing to a local file. Ensure it's set to the Turso HTTPS URL and redeploy.

### Issue: Changes don't appear after saving environment variables
**Solution**: You MUST trigger a **redeploy** after changing environment variables. Go to Deployments → Click the three dots on the latest deployment → Redeploy.

---

## Security Notes

> [!CAUTION]
> **Never commit these values to Git**. Environment variables are automatically excluded from version control.

> [!WARNING]
> The `TURSO_AUTH_TOKEN` and `SESSION_SECRET` are sensitive credentials. Keep them secure and rotate them periodically.
