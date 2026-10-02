# Divan (دیوان) — Persian Literary Platform UI Demo

An interactive **frontend-only prototype** for discovering Persian books,
reading, browsing a library and exploring a literary storefront. Built with
React and Vite, it focuses on Persian/RTL presentation, responsive layouts
and local UI interactions.

**This is not a production full-stack application.** Books, prices, reading
progress and dashboard metrics are fixtures. Authentication, purchases and
payments are not connected to a backend; payment is disabled in the demo.

[Product introduction (Persian PDF)](docs/divan-platform-introduction.pdf)

## Screenshots

| Home | Store | Author dashboard |
|:---:|:---:|:---:|
| <img src="docs/screenshots/home-mobile.png" width="250" alt="Divan home screen in Persian" /> | <img src="docs/screenshots/store-mobile.png" width="250" alt="Divan literary storefront" /> | <img src="docs/screenshots/dashboard-mobile.png" width="250" alt="Divan simulated author dashboard" /> |

## What to review

| Area | Concrete implementation |
|---|---|
| Page composition | [src/main.jsx](src/main.jsx) defines the app shell, page components, shared book cards, drawers and toast UI in one file. |
| Navigation | React `page` state selects home, explore, library, store, profile, dashboard or reader. It is not URL-based routing. |
| Local interactions | Title/author search filters a fixture array; bookmark toggles, drawer visibility, theme selection and reader text size use React state. |
| Persian/RTL UI | [index.html](index.html) sets `lang="fa"` and `dir="rtl"`; [styles.css](src/styles.css) supplies responsive layouts and self-hosted Vazirmatn fonts. |
| Static delivery | [Dockerfile](Dockerfile) builds with Node 22 and serves `dist/` through Nginx; [nginx.conf](nginx.conf) provides static asset caching and an index fallback. |

State is held in memory: bookmarks and preferences reset on reload. Library
progress, follower counts, sales and earnings are display fixtures, not measured
activity. Some controls are visual placeholders without handlers; a visible
button does not imply a completed product feature. Cart actions open a
fixed-item demonstration drawer rather than maintaining a real order.

## Architecture and limits

```text
Local fixture data + React state → page/components → Persian RTL UI
                                                  ↓
                                       Vite build → static dist/
```

This compact prototype keeps components and data together for presentation.
It has no server API, database, real accounts, file upload pipeline, order
processing or payment integration. Navigation is state-driven, so page changes
do not provide deep links or browser-history routing. A production product
would need those boundaries, persistence, authorization and operational checks
as separate engineering work—not merely a hosting change.

## Run locally

Use **Node.js 22.12+** (or Node.js 20.19+), matching the engine constraints in the
committed lockfile. [package.json](package.json) declares React/Vite dependencies
as `latest`; [package-lock.json](package-lock.json) currently resolves React 19
and Vite 8. Prefer `npm ci` to reproduce that lockfile rather than silently
selecting new versions.

```bash
git clone https://github.com/mahdihz05/literary-hub.git
cd literary-hub
npm ci
npm run dev
```

Open the address printed by Vite. The dev script binds to `0.0.0.0`, so use a
trusted development network or adjust your local firewall if needed.

## Build and preview

```bash
npm ci
npm run build
npm run preview
```

The build produces static files in `dist/`. “Production build” describes the
bundle output, not production readiness of the simulated product. The preview
script also binds to `0.0.0.0`.

### Optional Docker serving

```bash
docker build -t literary-hub-demo .
docker run -d --name literary-hub-demo -p 8295:80 literary-hub-demo
```

Open `http://localhost:8295`. This serves the same static UI; it does not add a
backend or enable payment.

## Suggested review walkthrough

1. Browse home and open the reader.
2. Search by title or author in Explore and toggle a bookmark.
3. Browse the library; note that progress values are samples.
4. Open the store/cart; payment remains disabled.
5. Visit the author profile and simulated dashboard.
6. Adjust reader text size; return to the library.
7. Compare desktop/mobile layouts and the light/dark theme where exposed.

## Repository map

```text
literary-hub/
├── docs/                 # Persian introduction PDF and mobile screenshots
├── public/assets/        # Local UI images
├── public/fonts/         # Self-hosted Vazirmatn fonts
├── src/main.jsx          # Fixture data, pages, components and state
├── src/styles.css        # Theme, RTL layout and responsive styles
├── Dockerfile            # Node build → Nginx static serving
├── nginx.conf
├── index.html
├── package.json
└── package-lock.json
```

## Validation and next steps

This README is based on static inspection of public source and manifests.
No installation, build, browser walkthrough or automated tests were run for
this documentation update. The manifest defines dev/build/preview scripts,
not a test or lint script, and this repository has no committed GitHub Actions
workflow. No passing test, accessibility score or production uptime is claimed.

Before extending beyond a UI demo, useful next steps are component/data
separation, URL routing, interaction/accessibility tests and persistent state.
A backend, authentication, media storage and commerce integration would be
future work; Django/DRF and PostgreSQL from the original concept are proposals,
not components of this repository.

### Previously documented hosted demo

The original README lists `http://141.11.1.223:8295` as a static demo address.
Its availability has not been verified for this update. Use the screenshots or
local setup as the reproducible review path; do not treat that address as an
uptime guarantee.

## خلاصه فارسی

دیوان یک دموی رابط کاربری فارسی و راست‌چین است، نه یک سامانه فول‌استک عملیاتی.
داده‌ها، آمار و سبد خرید نمایشی‌اند؛ پرداخت غیرفعال است و حساب کاربری، API و
پایگاه داده واقعی وجود ندارد. تصاویر، معرفی‌نامه فارسی و روش اجرای محلی در
بخش‌های بالا حفظ شده‌اند.
