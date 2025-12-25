# Axoraco

> **AI Voice Bots & Web Development** - Enterprise automation for forward-thinking companies.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Tests](https://img.shields.io/badge/Tests-90+-green)](https://github.com/teamaxoraco-ui/Axoraco/actions)
[![License](https://img.shields.io/badge/License-Private-red)]()

---

## 🚀 Features

- **AI Voice Bots** - Human-like conversational agents
- **Web Development** - High-performance, SEO-optimized solutions
- **API Integration** - Seamless enterprise connectivity
- **Premium UI** - Scroll progress, custom cursor, magnetic buttons
- **Security** - Rate limiting, XSS prevention, input sanitization
- **Analytics** - Google Analytics 4 + GTM integration

## 📦 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion 12 |
| Validation | Zod |
| Analytics | Google Analytics + GTM |
| Deployment | Vercel |

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run E2E tests
npm run test:e2e
```

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/                # API routes (contact, newsletter)
│   ├── [page]/             # Page routes (about, contact, etc.)
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # 37 UI components
│   │   └── __tests__/      # Component tests
│   └── analytics/          # GA4, GTM integrations
├── lib/                    # Utility modules
│   ├── __tests__/          # Unit tests
│   ├── rate-limit.ts       # API rate limiting
│   ├── security.ts         # XSS prevention, sanitization
│   ├── validations.ts      # Zod form schemas
│   ├── email.ts            # Resend integration
│   ├── logger.ts           # Structured logging
│   └── error-tracking.ts   # Sentry integration
├── e2e/                    # Playwright E2E tests
├── public/                 # Static assets
└── .github/workflows/      # CI/CD pipeline
```

## 🔐 Environment Variables

Copy `.env.example` to `.env.local`:

```env
# Required
NEXT_PUBLIC_SITE_URL=https://axoraco.vercel.app

# Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_CONTAINER_ID=GTM-XXXXXXX

# Contact Form
DISCORD_CONTACT_WEBHOOK_URL=https://discord.com/api/webhooks/...

# Email Service (optional - get API key from resend.com)
RESEND_API_KEY=re_xxxxxxxx

# Error Tracking (optional - get DSN from sentry.io)
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage report
npm test -- --coverage

# Run specific test file
npm test -- lib/__tests__/security.test.ts

# Run E2E tests
npm run test:e2e
```

**Test Coverage:**
- Unit tests: 90+ tests
- Coverage targets: lib/* utilities
- E2E tests: Homepage, navigation, forms

## 🚀 Deployment

Deployed automatically via Vercel on push to `main`.

**CI/CD Pipeline:**
1. Lint & Type Check
2. Build
3. Unit Tests
4. E2E Tests (Chromium)
5. Lighthouse Audit
6. Security Scan

## 📄 License

Private - All rights reserved.

---

Built with ❤️ by [Axoraco](https://axoraco.vercel.app/)
