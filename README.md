# 🛍️ Famazon

A modern, responsive e-commerce web application built with **React 19**, **Vite**, **Tailwind CSS v4**, **Redux Toolkit**, and **React Router v7**.

Famazon uses the **DummyJSON API** to provide product data and implements a complete frontend shopping experience including product discovery, search, filtering, product details, cart management, and responsive UI interactions.

---




### 🏠 Home Page

- Dynamic promotional hero section
- Randomly selected featured product
- Direct navigation to product details
- Horizontally scrollable category section
- Category images generated from representative products
- Featured product grid
- Pagination using `limit` / `skip`
- "Load More" functionality

---

### 🛒 Shop / Catalog

- Responsive product grid
- Category filtering
- Price range filtering
- Minimum rating filtering
- Debounced price filtering
- Loading skeletons
- Empty search/filter state
- One-click filter reset
- Responsive layout across screen sizes

---

### 📦 Product Details

- Dynamic product routes
- Product image gallery
- Thumbnail-based image switching
- Product pricing and discount information
- Star rating display
- Add / Remove from Cart functionality
- Customer reviews
- Reviewer information
- Responsive product layout

---

### 🛍️ Shopping Cart

- Add products to cart
- Remove products
- Cart item display
- Real-time subtotal calculation
- Free shipping indicator
- Total price calculation
- Clear cart functionality
- Confirmation modal before clearing
- Empty cart state
- Navigation back to shop

---

### 🔎 Search

- Global search from the navbar
- API-powered product search
- Redux-managed search state
- Loading state
- Empty search results state
- Dedicated search results page

---

### 🎨 UI & UX

- Responsive design
- Tailwind CSS v4
- Custom Tailwind theme variables
- Product hover animations
- Animated cart counter
- Mobile navigation drawer
- Loading spinner
- Skeleton loaders
- Confirmation modal
- Smooth UI transitions
- Lucide React icons
- FontAwesome icons

---

# 🧠 State Management

Famazon uses **Redux Toolkit** for global application state.

### Redux Store

```text
Redux Store
│
├── CartSlice
│   ├── items
│   ├── addItem
│   ├── removeItem
│   ├── toggle
│   └── clear
│
├── SearchSlice
│   ├── Query
│   ├── Result
│   └── loading
│
└── ShopSlice
    └── value