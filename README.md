# Wholly Cow - Premium Tallow Butter Landing Page

A responsive React landing page for Wholly Cow's premium tallow butter products, built with Vite, React, and Tailwind CSS.

## 🛠️ Tech Stack

- **Vite** - Fast build tool and dev server
- **React 18** - UI library with functional components
- **Tailwind CSS 3.4** - Utility-first CSS framework with JIT compilation
- **Framer Motion** - Animation library for smooth interactions
- **Google Fonts** - Instrument Serif, Roboto Mono, and Roboto

## 🎨 Design Features

- Fully responsive across mobile (≤640px), tablet (641-1024px), and desktop (≥1024px)
- Hero background with cows in field
- Infinite scrolling banner in header
- Interactive product card with variant selection
- Smooth animations and hover effects
- Accessible design with keyboard navigation and ARIA labels

## 📦 Setup & Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Header.jsx           # Fixed header with logo, banner, cart
│   ├── ScrollingBanner.jsx  # Infinite marquee animation
│   ├── ProductCard.jsx      # Main product display card
│   ├── VariantPill.jsx      # Scent variant selector
│   ├── QuantityStepper.jsx  # Quantity input control
│   └── Badge.jsx           # Product feature badges
├── pages/
│   └── Home.jsx            # Main landing page
├── index.css               # Tailwind imports + custom styles
├── App.jsx                 # Root component
└── main.jsx               # Application entry point

public/assets/              # All images and graphics
```

## 🎯 Key Components

### Header
- Fixed positioning with transparent background
- Responsive logo/brand name
- Infinite scrolling text banner with purple stars
- Cart icon with item count badge

### ProductCard
- Two-column layout (image left, details right)
- Interactive thumbnail gallery
- Variant selection pills (lavender, thieves, unscented)  
- Quantity stepper control
- Star ratings and reviews
- Feature badges (Organic, Grassfed, Handmade)
- Add to cart CTA with gradient styling

### ScrollingBanner
- Seamless infinite marquee animation
- Customizable text array with star separators
- CSS-based animation using Tailwind utilities

## 🛒 Future Enhancements (TODO)

- [ ] Implement Shopify Buy Button SDK integration
- [ ] Add cart drawer/modal functionality
- [ ] Set up CartProvider context for state management
- [ ] Add product variant inventory management
- [ ] Implement analytics tracking
- [ ] Add loading states and error handling
- [ ] SEO optimization and meta tags

## 🎨 Custom Styling

The project uses custom CSS variables and Tailwind extensions:

- **Colors**: `wc-purple` (#cb9af7), `wc-green` (#5c6f1e), `wc-cream` (#f8f7f3)
- **Fonts**: Instrument Serif for headings, Roboto for body, Roboto Mono for accents
- **Animations**: Custom marquee keyframes for scrolling banner

## 📱 Responsive Breakpoints

- **Mobile**: ≤640px - Single column layout, stacked elements
- **Tablet**: 641-1024px - Two-column product card, adjusted spacing
- **Desktop**: ≥1024px - Full layout with optimal proportions

## 🚀 Deployment

The project is configured for deployment to Vercel or similar platforms:

```bash
npm run build
```

Assets are optimized and the build output can be deployed directly to any static hosting service.

---

Built with 💜 for Wholly Cow - Premium grass-fed tallow skincare products. 