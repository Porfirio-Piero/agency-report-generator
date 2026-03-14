# Agency Report Generator

## Environment Setup

Copy `.env.example` to `.env.local` and fill in:

```env
# Database
DATABASE_URL="postgresql://..."

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"

# Email
RESEND_API_KEY="re_..."

# OAuth (Platform Connections)
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
FACEBOOK_APP_ID="..."
FACEBOOK_APP_SECRET="..."
LINKEDIN_CLIENT_ID="..."
LINKEDIN_CLIENT_SECRET="..."
```

## Getting Started

```bash
npm install
npm run db:push  # Push schema to database
npm run dev
```

## Features

### P0 - Platform Connections
- Google Analytics OAuth
- Facebook Ads OAuth (includes Instagram)
- LinkedIn Ads OAuth

### P0 - Client Management
- Add/Edit/Delete clients
- Assign platforms per client
- View connection status

### P0 - Report Generation
- Pull data from connected platforms
- Generate branded PDF reports
- Schedule weekly delivery

### P1 - Automated Delivery
- Monday 6 AM delivery
- Email templates
- BCC for agency records

### P2 - Template Customization
- Agency logo
- Brand colors
- Custom messaging