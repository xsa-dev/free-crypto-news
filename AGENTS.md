# AGENTS.md - Free Crypto News

## Project Overview
Free Crypto News is a Next.js 16 application providing a 100% free crypto news API. No API keys required. Aggregates news from 7 major crypto RSS sources.

## Build Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at http://localhost:3000 |
| `npm run build` | Build for production (Next.js build) |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint across the project |
| `npm run i18n:translate` | Run i18n translation scripts |
| `npm run i18n:validate` | Validate i18n translations |
| `npm run archive:collect` | Collect news data to archive |
| `npm run archive:stats` | Generate archive statistics |

**Node requirement:** >= 18.0.0

## Code Style Guidelines

### Imports & Path Aliases
- Use `@/*` aliases for internal imports: `import { func } from '@/lib/crypto-news'`
- Import from 'next/server' for API routes: `import { NextRequest, NextResponse } from 'next/server'`
- Third-party imports before internal imports
- Named imports preferred over default imports

### TypeScript
- **Strict mode enabled** - no implicit any
- Use `interface` for object types, `type` for unions/primitives
- Use `as const` for constant objects to preserve literal types
- Explicit return types for public API functions
- Generic types for utility functions when applicable

### Naming Conventions
- **Files:** camelCase for utilities (`crypto-news.ts`), PascalCase for components (`Header.tsx`)
- **Functions:** camelCase, descriptive verbs (`getLatestNews`, `fetchFeed`)
- **Constants:** SCREAMING_SNAKE_CASE for config (`RSS_SOURCES`)
- **Types/Interfaces:** PascalCase (`NewsArticle`, `NewsResponse`)
- **Variables:** camelCase, avoid abbreviations except `req`, `res`, `err`

### Error Handling
- Use try/catch blocks with descriptive error messages
- Non-critical errors (e.g., RSS fetch failures): `console.warn()` and return gracefully
- Critical errors: `console.error()` and throw or return error responses
- API routes: Return `NextResponse.json({ error, message }, { status: 500 })`

### API Routes Pattern
```typescript
export const runtime = 'edge';
export const revalidate = 300; // Cache duration in seconds

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  // Parse and validate params...
  try {
    const data = await getData(...);
    return NextResponse.json(data, { headers: {...} });
  } catch (error) {
    return NextResponse.json({ error: 'Failed', message: String(error) }, { status: 500 });
  }
}
```

### Data Fetching
- Use `Promise.allSettled()` for parallel independent fetches
- Cache external fetches with `next: { revalidate: seconds }`
- Validate and sanitize all user input (see `src/lib/validation.ts`)
- Sanitize HTML content with `sanitize-html` library

### Pagination & Limits
- Clamp limits to reasonable bounds: `Math.min(Math.max(1, limit), 100)`
- Support `page` and `per_page` query parameters
- Include `pagination` object in responses when applicable

### Component Structure
- Named exports for React components
- Use TypeScript interfaces for props
- Include metadata exports for pages where relevant

### Testing
- Tests use Node.js built-in `test` module (no test framework installed)
- Run individual test files directly with `node test/file.test.js`
- No CI/CD test command currently configured

### File Organization
- `src/app/api/` - Next.js API route handlers (one file per endpoint)
- `src/lib/` - Shared utilities and business logic
- `src/components/` - React UI components
- `scripts/` - Build/maintenance scripts
- `mcp/` - MCP server implementation (excluded from main build)

### Additional Notes
- `tsconfig.json` excludes: `node_modules`, `sdk`, `mcp`, `examples`
- Always run `npm run lint` before committing
- The project uses Tailwind CSS v4 for styling
