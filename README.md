# SolarPro - Solar Panel Sales & Distribution Management (React, frontend only)
Stack: React 18, Vite, React Router (HashRouter), Recharts, lucide-react. All data is mock data kept in localStorage (no backend).
## Run
```
npm install
npm run dev      # development
npm run build    # production build in /dist (deploy to Vercel / Netlify / GitHub Pages)
```
Login: demo account `admin@solar.pk` / `admin123`, or create your own on the Sign up page (stored in localStorage). Forgot-password demo code: `123456`.
## Structure
- `src/store.jsx` global state (db, auth, theme, toasts, stock update helper) persisted to localStorage
- `src/data.js` realistic seed data
- `src/components/ui.jsx` reusable Table (search/filter/sort/pagination/loading/empty), Form (validation), Modal, Badge, Kpi, generic Crud
- `src/pages/` Auth, Dashboard, Master (products, categories, customers, suppliers, profiles), Sales (POS, invoices, purchases, payments, returns), Misc (inventory + stock movement, reports, notifications, settings)
## Submission checklist
Push to GitHub, deploy the `dist` folder, add screenshots of the major modules to `/screenshots`.

## Features
Auth (login, sign up, forgot password) · Dashboard (KPIs, daily/weekly/monthly/yearly analytics, low stock) · Products & categories · Customers & supplier profiles · POS with cart, discount, tax, payment methods and printable invoice · Invoices · Purchases (stock-in) · Inventory with stock indicators, movements and manual adjustments · Payments & receivables · Sales returns · Reports with date range · Notifications (low stock, out of stock, sale, payment, customer) · Settings · Light/dark mode and accent colors · Responsive layout with mobile drawer · Loading, empty and error states.

## Design notes
Built to the task brief: one accent color (switchable), neutral surfaces, semantic colors only for status (paid/partial/unpaid, stock levels). Currency and invoice prefix come from Settings.

## Deploy
- Vercel / Netlify: import the GitHub repo, build command `npm run build`, output directory `dist`.
- GitHub Pages: `npm run build`, then publish the `dist` folder (the app uses HashRouter and relative asset paths, so no extra config is needed).
## Requirement coverage
All 23 sections of the task brief are implemented: authentication, dashboard, products, categories, customers and profile, POS, invoices, purchases, suppliers and profile, inventory, stock movement, payments and receivables, returns, reports, notifications, settings, sidebar, responsive layout, mock data and the listed interactions.
