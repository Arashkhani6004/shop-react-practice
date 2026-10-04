# Shop — React Practice Project

A small e-commerce storefront built with **React 19** and **Vite 6** as a practice project. It fetches products from a fake store API, lets you search and filter them, view product details, and manage a shopping cart with a checkout summary.

## Features

- **Product list** — grid of product cards fetched from the API with a loading spinner
- **Search** — live search by product title, synced to the URL (`?search=...`)
- **Category filter** — sidebar filters (All / Kids / Men / Women), synced to the URL (`?category=...`)
- **Product details page** — image, description, category, price and a "Back to Shop" link
- **Shopping cart** — add, increase, decrease and remove items; item counter is shown in the header
- **Checkout page** — order summary (total price, item count, status) with a checkout action that clears the cart
- **Client-side routing** — including a 404 page for unknown routes
- **State management** — React Context + `useReducer` for the cart, React Context for products
- **Styling** — plain CSS with CSS Modules and a global stylesheet

## Tech Stack

| Tool | Purpose |
| --- | --- |
| [React 19](https://react.dev/) | UI library |
| [Vite 6](https://vite.dev/) | Dev server & build tool |
| [React Router v6](https://reactrouter.com/) | Client-side routing |
| [Axios](https://axios-http.com/) | HTTP client (with a response interceptor) |
| [React Icons](https://react-icons.github.io/react-icons/) | Icons |
| [react-loader-spinner](https://github.com/ AHMIDIO/react-loader-spinner) | Loading state |
| CSS Modules + `global.css` | Styling |
| ESLint | Linting |

## Requirements

- **Node.js** 18+ (Node 20 LTS recommended)
- **npm** 9+ (comes with Node)

Check your versions:

```bash
node -v
npm -v
```

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>.git
cd shop-react-practice
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

The app starts at **http://localhost:5173** (Vite's default port) with hot module replacement enabled.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Create an optimized production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint over the project |

## Project Structure

```
shop-react-practice/
├── index.html                 # Entry HTML template
├── package.json               # Scripts and dependencies
├── vite.config.js             # Vite + React plugin configuration
├── eslint.config.js           # ESLint flat config
└── src/
    ├── main.jsx               # App entry: mounts <App/> inside <BrowserRouter>
    ├── App.jsx                # Providers, layout and route definitions
    ├── global.css             # Global styles
    ├── components/            # Reusable UI (each with its own .module.css)
    │   ├── Card.jsx           # Product card with add/+/-/remove actions
    │   ├── BasketCard.jsx     # Cart line item
    │   ├── BasketSidebar.jsx  # Order summary + checkout button
    │   ├── SearchBox.jsx      # Search input
    │   ├── Sidebar.jsx        # Category filter list
    │   └── Loader.jsx         # Loading spinner
    ├── constants/
    │   └── list.js            # Category list (All, Kids, Men, Women)
    ├── context/
    │   ├── ProductsContext.jsx# Fetches products, exposes useProducts/useDetailProduct
    │   └── CartContext.jsx    # Cart reducer: ADD/REMOVE/INCREASE/DECREASE/CHECKOUT
    ├── helper/
    │   └── helper.js          # Search/filter/summarize/query utilities
    ├── layout/
    │   └── Layout.jsx         # Header (logo + cart badge) and footer wrapper
    ├── pages/
    │   ├── ProductsPage.jsx   # Product grid + search + category sidebar
    │   ├── DetailsPage.jsx    # Single product details (/products/:id)
    │   ├── CheckoutPage.jsx   # Cart overview and checkout (/checkout)
    │   └── 404.jsx            # Not-found page
    └── services/
        └── config.js          # Axios instance (base URL + response interceptor)
```

## Routes

| Route | Page |
| --- | --- |
| `/` | Redirects to `/products` |
| `/products` | Product list with search & category filtering |
| `/products/:id` | Product details |
| `/checkout` | Shopping cart & checkout summary |
| `/*` | 404 — Not found page |

## Data Source

Products are fetched from a public fake store API through a shared Axios instance:

```js
// src/services/config.js
const api = axios.create({ baseURL: "https://fakestoreapi.noksha.dev/api" });
```

A response interceptor unwraps payloads, so callers receive `response.data.data` directly. No API key or environment variables are required.

> Note: since the data comes from a remote API, an internet connection is needed while developing.

## State Management

- **`ProductsContext`** — fetches `/products` once on mount and provides:
  - `useProducts()` → the full product list
  - `useDetailProduct(id)` → a single product by id
- **`CartContext`** — a `useReducer`-based cart exposed via `useCart()`, returning `[state, dispatch]` with actions:
  - `ADD_ITEM`, `REMOVE_ITEM`, `INCREASE`, `DECREASE`, `CHECKOUT`
  - derived state: `itemsCounter`, `total`, `checkout`

Search and category filters are stored in the URL query string, so a filtered view can be shared or refreshed safely.

## Linting

```bash
npm run lint
```

Uses the Vite React template's ESLint flat config, including `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`.

## Building for Production

```bash
npm run build     # outputs static files to dist/
npm run preview   # serves the production build locally
```
