# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Jake Tienda Electrónica is a Next.js 15 e-commerce application for an electronic/audio equipment store in Colombia. The application features product browsing, filtering, shopping cart functionality, and payment integration with PayU. It uses Strapi CMS as the backend content management system.

## Development Commands

### Core Development
```bash
# Development with Turbopack (faster builds)
npm run dev

# Alternative package managers
bun dev
yarn dev
pnpm dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Generate sitemap after build
npm run postbuild
```

### Data Management
```bash
# Fetch Colombian location data (departments/cities)
bun run prepare:co-data
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS 4 with animations
- **State Management**: Zustand with persistence
- **Backend Integration**: Strapi CMS via @strapi/client
- **Payment**: PayU integration
- **Animations**: Framer Motion
- **Content**: React Markdown with plugins

### Directory Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (Strapi proxy, PayU)
│   ├── about-us/          # About page
│   ├── brands/            # Brand listing page
│   ├── categories/        # Category listing page
│   ├── credit/            # Credit information page
│   ├── products/          # Products listing page
│   └── view-product/      # Individual product pages
├── components/            # React components organized by feature
│   ├── common/            # Shared components (navbar, footer, cart)
│   ├── home/              # Homepage-specific components
│   ├── products/          # Product listing components
│   ├── view-products/     # Product detail components
│   └── [feature]/         # Feature-specific components
├── hooks/                 # Custom React hooks
├── store/                 # Zustand state management
│   ├── products.ts        # Product filtering state
│   └── shopping-cart.ts   # Shopping cart state
├── service/api/           # API service layer for Strapi
├── types/                 # TypeScript type definitions
├── lib/                   # Utility functions and parsers
└── config/                # Configuration constants
```

### State Management Architecture
The application uses Zustand for state management with two main stores:

**Products Store** (`src/store/products.ts`):
- Manages product filtering (search, categories, brands, price)
- Handles product lists and filtered results
- Loading states for async operations

**Shopping Cart Store** (`src/store/shopping-cart.ts`):
- Persistent shopping cart using local storage
- Add/remove products, quantity management
- Calculate totals and product counts

### API Integration
- **Strapi CMS**: Backend content management via `/src/service/api/strapi.ts`
- **Internal APIs**: Next.js API routes in `/src/app/api/` for:
  - Product search and filtering
  - PayU payment integration
  - Strapi data proxy endpoints

### Key Features
- **Product Filtering**: Advanced filtering by categories, brands, price with real-time results
- **Shopping Cart**: Persistent cart with local storage, quantity management
- **Search**: Product search with debounced input
- **Payment**: PayU gateway integration for Colombian market
- **SEO**: Comprehensive metadata, sitemap generation, structured data
- **Responsive**: Mobile-first design with Tailwind CSS

## Development Guidelines

### Environment Variables
Ensure these environment variables are configured:
- `NEXT_PUBLIC_STRAPI_API_URL`: Strapi backend URL
- `NEXT_PUBLIC_STRAPI_API_TOKEN`: Strapi API authentication token
- PayU payment gateway credentials (for payment features)

### Component Organization
- Components are organized by feature/page in `/src/components/`
- Shared components go in `/src/components/common/`
- Each component directory contains related components for that feature

### API Routes Pattern
- Internal API routes proxy Strapi requests
- Located in `/src/app/api/strapi/` for CMS operations
- PayU integration in `/src/app/api/payu/`

### Type Safety
- Comprehensive TypeScript types in `/src/types/`
- Product types include filtering, cart, and display variants
- API response types match Strapi schema

### State Management Pattern
- Use Zustand hooks for global state
- Persist cart state to localStorage
- Filter state is ephemeral (session-based)

### Styling
- Tailwind CSS 4 with custom animations
- Prettier with tailwindcss plugin for class sorting
- Responsive design with mobile-first approach

## Testing and Quality

### Linting
```bash
npm run lint
```

### Build Validation
```bash
npm run build
```
Note: TypeScript and ESLint errors are ignored during builds (`ignoreBuildErrors: true`)

### Code Formatting
Uses Prettier with Tailwind CSS plugin for consistent formatting.
