# Shopme - Modern E-commerce Experience

[![Next.js](https://img.shields.io/badge/Next.js-15.x-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-latest-black?style=flat-square)](https://ui.shadcn.com/)

This project is a modern e-commerce frontend application built by merging the UI structure of a v0.dev generated project with the functionality of a separate shopping application.

## ✨ Features

*   **Product Listing:** Browse products with category filtering.
*   **Product Details:** View detailed information for each product.
*   **Shopping Cart:** Add items, update quantities, and remove items.
*   **Simulated Authentication:** Login (`admin`/`admin` for testing) and Signup pages.
*   **Theming:** Light/Dark mode support via `next-themes`.
*   **Responsive Design:** Adapts to various screen sizes.

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm (comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/PREETHAM1590/landing-page.git
    cd landing-page # Or your cloned directory name (likely 'shopme' if cloned from scratch)
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port indicated in the terminal, e.g., 3001) with your browser to see the result.

### Test Credentials

*   **Username:** `admin`
*   **Password:** `admin`

## 🛠️ Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **UI Library:** [React](https://reactjs.org/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
*   **State Management:** React Context API (`AuthContext`, `CartContext`)
*   **Data Fetching:** Simulated (`AuthService`, `ProductService`)

## ☁️ Deployment

This project is configured for easy deployment on [Vercel](https://vercel.com/), the creators of Next.js. Connect your GitHub repository to Vercel to deploy automatically.

## 📄 Schema

A basic SQL schema definition for a `users` table can be found in `schema.sql`. This is a starting point and would need expansion for a full backend implementation.
