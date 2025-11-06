# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack for faster builds
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run Next.js linting
- `npm run test` - Run Vitest tests
- `npm run test:ui` - Run tests with UI interface

## Architecture Overview

**Shinobi** is a Next.js 15 blog application built as a Claude Code learning project. The architecture follows modern React patterns with App Router.

### Key Technologies

- **Next.js 15** with App Router and Turbopack
- **React 19** with TypeScript
- **Tailwind CSS v4** with custom CSS variables for theming
- **Vitest** for testing with JSDOM environment
- **DOMPurify** for HTML sanitization
- **GraphQL** for content management via Hygraph CMS

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with header and dark mode toggle
│   ├── page.tsx           # Homepage with navigation to blog/preview
│   ├── blog/              # Blog listing and individual posts
│   └── preview/           # Component preview page
├── components/            # Reusable React components
│   ├── ui/                # UI component library
│   │   ├── Avatar/        # Avatar component with initials display
│   │   ├── Button/        # Button component with variants and sizes
│   │   ├── Calendar/      # Calendar component with date/range selection
│   │   ├── Card/          # Card container component with variants
│   │   ├── Icon/          # Icon wrapper component with styling
│   │   └── Modal/         # Modal dialog component
│   ├── BlogSidebar.tsx    # Blog page sidebar
│   └── DarkModeToggle.tsx # Theme switching component
├── hooks/                 # Reusable hooks
└── lib/                   # Utility functions and types
    ├── queries.ts         # GraphQL queries for blog data
    ├── types.ts           # TypeScript type definitions
    ├── sanitize.ts        # HTML sanitization utilities
    └── mockData.ts        # 120 mock blog posts for development
```

### Data Architecture

- **External CMS**: Uses Hygraph (GraphQL CMS) for blog content (optional)
- **Mock Data Fallback**: App includes sample blog posts when Hygraph is not configured
- **Environment Variables**: Optional `HYGRAPH_ENDPOINT` for GraphQL API
- **Data Fetching**: Server-side rendering with 1-hour revalidation
- **Content Security**: HTML content is sanitized using DOMPurify with strict allowlists

#### Blog Content Setup

The blog works in two modes:

1. **Development Mode (Default)**: Uses mock blog posts from `src/lib/mockData.ts`
   - No setup required - just run the app
   - Includes 120 sample blog posts about AI tools, Vite, MCP, and modern web development
   - Perfect for UI development and testing

2. **Production Mode (Optional)**: Fetches real content from Hygraph CMS
   - Create a free account at [hygraph.com](https://hygraph.com)
   - Set up a blog content model with these fields:
     - `blogTitle` (String)
     - `blogPostSlug` (String, unique)
     - `blogPostContent` (Rich Text)
     - `createdBy` (Reference to User)
     - `createdAt` (DateTime)
   - Add your Hygraph endpoint to `.env.local`:
     ```
     HYGRAPH_ENDPOINT=https://your-region.hygraph.com/v2/your-project-id/master
     ```

#### Blog Features

- **Dynamic Categories**: Keyword-based categorization system automatically categorizes posts
  - Categories include: Vite, ChatGPT & OpenAI, Claude & Anthropic, GitHub Copilot, Google Gemini, Grok, AI Editors, AI Agents, MCP, RAG & Embeddings, Prompt Engineering, General
  - Category filtering via URL query parameters (`/blog?category=...`)
  - Server-side filtering for optimal performance
- **Scrollable Sidebar**: Sticky sidebar with overflow scrolling to display all categories
- **Next.js 15 Compatibility**: Uses async params and searchParams pattern
- **Category Highlighting**: Active category is highlighted in sidebar based on URL state

### Styling System

- **Custom Theme System**: CSS variables in `globals.css` with light/dark mode support
- **Tailwind Integration**: Custom color tokens mapped to CSS variables
- **Component Styling**: Mix of Tailwind classes and inline styles
- **Typography**: Uses Rubik (headings) and Merriweather (body) from Google Fonts

### Testing Setup

- **Vitest** configured with React Testing Library
- **JSDOM environment** for DOM testing
- **Setup file**: `src/test/setup.ts` for test configuration
- **Type definitions**: Custom vitest types in `src/test/vitest.d.ts`

## Development Notes

- Uses `@/*` path alias for src imports
- Blog works with mock data by default (Hygraph CMS is optional)
- Dark mode state is managed via CSS classes on root element
- Component testing follows React Testing Library patterns
- HTML sanitization is critical for security when displaying CMS content
- Next.js 15 requires awaiting `params` and `searchParams` before accessing properties
- Category filtering is implemented server-side for better performance
- BlogSidebar and blog page share the same `categorizePost` function logic

- when making new page components, always add a link to that page in the header. Only do this for page components, not UI or other drop-in components.

- Use Context7 to check up-to-date docs when needed for implementing new libraries or frameworks, or adding features using them.

## Additional Projects

### Chabad Org Scraper

Located in `Chabad_Org_Scraper/`, this is a Python-based web scraping tool that extracts comprehensive directory information about all Chabad centers in the United States using the public Chabad.org REST API.

**Quick Start:**
```bash
cd Chabad_Org_Scraper
pip install -r requirements.txt
python chabad_scraper.py
```

**Key Features:**
- **API-based scraping** - Uses official Chabad.org REST API (not HTML scraping)
- **Parallel processing** - 12 concurrent threads optimized for stability
- **Ethical compliance** - Respects robots.txt with rate limiting (8 sec / 12 threads = 0.67s between requests)
- **Multiple export formats:**
  - JSON with nested arrays (`chabad_centers_usa_v2.json`)
  - Simple CSV with semicolon-delimited arrays (`chabad_centers_full_v2.csv`)
  - Normalized relational CSV tables (`chabad_centers_normalized_v2/`)
- **Comprehensive data extraction:**
  - Basic info: State, City, Name, Address, Phone, ZIP, Coordinates, Website
  - Personnel: Directors and staff (array of objects with first_name, last_name, position, is_director)
  - Services: Services offered (array of objects with id, name)
  - Departments: Sub-centers/departments (array of objects with mosad_aid, name, center_type)

**Performance:**
- Processes 3,623 centers in ~35-40 minutes
- Stable 1.5 centers/second with <5% error rate
- Optimized threading prevents 429 rate limit errors (previous 36-thread version had 43% failure rate)

**Technical Details:**
- Python 3.7+ with requests, pandas, tqdm
- ThreadPoolExecutor for parallel processing
- Thread-safe rate limiter with distributed crawl delay
- Exponential backoff retry logic
- Comprehensive logging to `scraping_log.txt`

**Data Exports:**

1. **JSON Format** - Full nested objects:
   ```json
   {
     "mosad_id": "117534",
     "name": "Chabad of Plantation",
     "state": "FL",
     "personnel": [{"first_name": "Menachem", "last_name": "Posner", "position": "Director", "is_director": true}],
     "services": [{"id": "7171", "name": "Chabad House"}],
     "departments": [{"mosad_aid": "120063", "name": "Hebrew School", "center_type": "Hebrew School"}]
   }
   ```

2. **Simple CSV** - Spreadsheet-friendly with semicolon-delimited arrays:
   - Personnel: "First Last (Position); ..."
   - Services: "Service Name; ..."
   - Departments: "Dept Name (ID); ..."

3. **Normalized CSV** - Four relational tables for database import:
   - `centers.csv` - Main center information
   - `personnel.csv` - Staff with mosad_id foreign key
   - `services.csv` - Services with mosad_id foreign key
   - `departments.csv` - Departments with parent_mosad_id foreign key

**Ethical Guidelines:**
- Respects robots.txt crawl delay
- Uses proper User-Agent identification
- Rate limiting prevents server overload
- Non-commercial educational use
- Zero 429 errors with optimized configuration

**Version History:**
- v2.0 (2025) - Fixed field extraction bugs, added structured arrays, optimized threading for reliability
- v1.5 (2025) - Speed optimization (deprecated due to 43% error rate)
- v1.0 (2025) - Initial release

See [Chabad_Org_Scraper/README.md](Chabad_Org_Scraper/README.md) for complete documentation.

## Security Workflow

**Shinobi** includes a comprehensive security system with three integrated slash commands for vulnerability scanning, automated fixes, and compliance reporting. All commands are based on OWASP best practices and industry standards.

### Security Commands

#### 1. `/security-checker` - Vulnerability Scanner

Performs deep security analysis covering 130+ OWASP checklist items across 13 categories.

**Usage:**
```bash
/security-checker .                    # Scan entire project
/security-checker src/app/api         # Scan specific directory
```

**Coverage:**
- Authentication & Authorization (IDOR, privilege escalation)
- Input Validation (XSS, SQL injection, command injection)
- Data Protection (secrets, encryption, HTTPS)
- Information Gathering (fingerprinting, sensitive files)
- Configuration Management (security headers, error handling)
- Secure Transmission (TLS/SSL, HTTPS enforcement)
- Session Management (cookies, CSRF, clickjacking)
- Data Validation (31 injection types)
- Denial of Service (rate limiting, resource exhaustion)
- Business Logic (workflow bypass, data integrity)
- Cryptography (weak algorithms, key management)
- File Uploads (type validation, malware scanning)
- API Security (GraphQL, REST, WebSocket)
- Modern Threats (LLM prompt injection, supply chain)
- Dependencies (CVEs, outdated packages)

**Output:**
- Structured report with severity ratings (Critical/High/Medium/Low)
- File locations and line numbers for each finding
- OWASP Cheat Sheet references
- Reproduction steps and verification commands
- Actionable remediation recommendations

---

#### 2. `/security-fixer` - Automated Remediation

Automatically fixes common security vulnerabilities based on OWASP best practices.

**Usage:**
```bash
/security-fixer critical --interactive    # Fix critical issues, approve each
/security-fixer high --auto               # Auto-fix high+ severity after plan approval
/security-fixer medium                    # Fix medium+ (interactive by default)
/security-fixer all --auto                # Fix everything automatically
```

**Modes:**
- **Interactive** (default): Approve each fix individually
- **Auto**: Review plan once, then execute all fixes

**Auto-Fixable Vulnerabilities (15 categories):**

1. **Missing Security Headers** - Adds X-Frame-Options, CSP, HSTS, etc.
2. **Vulnerable Dependencies** - Updates packages with known CVEs
3. **Hardcoded Secrets** - Moves to environment variables, updates .gitignore
4. **Missing Input Validation** - Adds Zod/Yup schemas
5. **SQL/NoSQL Injection** - Implements parameterized queries
6. **XSS Prevention** - Adds DOMPurify sanitization
7. **CSRF Protection** - Implements origin checking, SameSite cookies
8. **Insecure Cookie Configuration** - Adds httpOnly, secure, sameSite flags
9. **Missing Rate Limiting** - Implements throttling middleware
10. **Missing HTTPS Enforcement** - Adds HTTPS redirect middleware
11. **Weak Cryptography** - Replaces MD5/SHA1 with bcrypt/argon2
12. **GraphQL Query Depth** - Adds complexity limiting
13. **Insecure File Uploads** - Implements type validation, size limits
14. **Missing Authorization** - Adds ownership/permission checks
15. **LLM Prompt Injection** - Validates AI inputs/outputs

**Safety Protocol:**
- Creates git branch: `security-fixes-{timestamp}`
- Incremental changes with testing
- Rollback instructions for each fix
- Re-runs security-checker for verification

**Required Tools** (auto-detected and prompted):
- Framework-agnostic (supports Next.js, Express, React, etc.)
- Zod/Yup for validation
- DOMPurify for XSS prevention
- bcrypt/argon2 for password hashing
- Rate limiting libraries (framework-specific)

---

#### 3. `/security-audit` - Compliance Reporting

Generates comprehensive compliance reports for multiple frameworks.

**Usage:**
```bash
/security-audit owasp-top-10              # OWASP Top 10 2021
/security-audit pci-dss --format=json     # PCI-DSS (JSON export)
/security-audit soc2                      # SOC 2 Trust Services
/security-audit gdpr                      # GDPR technical requirements
/security-audit ccpa                      # CCPA data protection
/security-audit llm-top-10                # OWASP LLM Top 10
/security-audit all                       # All frameworks combined
```

**Supported Frameworks:**
- **OWASP Top 10 2021** - Application Security Risks
- **OWASP Web Checklist** - 130+ test cases
- **OWASP LLM Top 10** - AI/LLM security (prompt injection, etc.)
- **PCI-DSS** - Payment Card Industry standards
- **SOC 2** - Trust Services Criteria
- **GDPR** - EU data protection (technical)
- **CCPA** - California privacy law
- **NIST** - Cybersecurity Framework

**Output Formats:**
- **Markdown** (default) - Human-readable report
- **JSON** - Programmatic analysis/CI integration
- **HTML** - Interactive dashboard with charts

**Report Includes:**
- Overall compliance percentage
- Risk level assessment (LOW/MEDIUM/HIGH/CRITICAL)
- Category-by-category analysis
- Detailed findings with remediation steps
- Compliance score calculation
- Certification readiness assessment
- Remediation roadmap (immediate/short-term/long-term)

---

### Complete Security Workflow

**Step-by-Step Process:**

```bash
# 1. Initial Security Scan
/security-checker .

# Review the findings and severity ratings

# 2. Automated Fixes (recommended: start with high severity)
/security-fixer high --auto

# Review and approve the fix plan
# Tests run automatically after each fix category

# 3. Manual Fixes (for items requiring human judgment)
# - Business logic vulnerabilities
# - Complex authorization flows
# - Privacy compliance features

# 4. Verify Fixes
/security-checker .
npm run test
npm run build

# 5. Generate Compliance Report
/security-audit owasp-top-10

# Optional: Multiple framework reports
/security-audit pci-dss --format=json
/security-audit gdpr

# 6. Commit Security Improvements
git add .
git commit -m "security: fix N vulnerabilities - OWASP compliant"

# 7. Optional: Create Pull Request
gh pr create --title "Security fixes: OWASP Top 10 compliance"
```

---

### Regular Security Maintenance

**Weekly:**
```bash
npm audit                    # Check for new CVEs
/security-checker .         # Quick vulnerability scan
```

**Monthly:**
```bash
/security-fixer medium --auto   # Apply accumulated fixes
/security-audit owasp-top-10    # Compliance check
```

**Quarterly:**
```bash
/security-audit all --format=json > audit-Q{N}.json
# Full compliance audit across all frameworks
# External penetration testing
# Security training review
```

**Before Production Deploy:**
```bash
/security-checker .
/security-fixer critical --auto
/security-audit owasp-top-10
npm run test && npm run build
```

---

### CI/CD Integration

Add to `.github/workflows/security.yml`:

```yaml
name: Security Audit

on:
  push:
    branches: [main]
  pull_request:
  schedule:
    - cron: '0 0 * * 0'  # Weekly

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Dependency Audit
        run: npm audit --audit-level=high

      - name: Security Scan
        run: /security-checker .

      - name: Compliance Report
        run: /security-audit owasp-top-10 --format=json > report.json

      - name: Upload Report
        uses: actions/upload-artifact@v3
        with:
          name: security-report
          path: report.json
```

---

### OWASP Compliance Status

Current Shinobi implementation includes:

✅ **Implemented:**
- HTML Sanitization (DOMPurify with strict allowlists)
- Server-side rendering (reduced attack surface)
- GraphQL parameterized queries
- Environment variable secrets (HYGRAPH_ENDPOINT)
- TypeScript strict mode
- Zero vulnerable dependencies

⚠️ **Recommended Improvements:**
- Security headers (X-Frame-Options, CSP, HSTS)
- Input validation on GraphQL slug parameters
- HTTPS enforcement middleware
- Rate limiting on API routes
- Comprehensive security logging

Use `/security-fixer high --auto` to implement recommended improvements automatically.

---

### Security Resources

**OWASP References:**
- [OWASP Top 10](https://owasp.org/Top10/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/)

**Internal Documentation:**
- `.claude/commands/security-checker.md` - Scanner documentation
- `.claude/commands/security-fixer.md` - Fixer documentation with code examples
- `.claude/commands/security-audit.md` - Audit framework details
- `.claude/docs/SECURITY_PLAYBOOK.md` - Comprehensive security guide (coming soon)

**Emergency Contacts:**
- Security issues: Create GitHub Security Advisory
- Vulnerability disclosure: security@yourproject.com (configure as needed)

---

### Security Philosophy

**Defense in Depth:**
- Multiple layers of security controls
- Automated scanning + manual review
- Proactive fixes + reactive monitoring
- Code security + infrastructure security

**Continuous Improvement:**
- Regular scans and audits
- Stay updated with OWASP guidelines
- Automated dependency updates
- Security training and awareness

**Compliance as Code:**
- Security requirements in version control
- Automated compliance checking
- Audit trails for all changes
- Reproducible security posture

**Trust but Verify:**
- Automated fixes reviewed before deploy
- External penetration testing
- Third-party security audits
- Bug bounty program (for production apps)