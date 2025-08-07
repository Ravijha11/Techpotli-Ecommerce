# Categories Components

This directory contains components for displaying product categories in a clean, organized layout.

## Components

### CategoriesGrid
The main component that displays all product categories in a responsive grid layout.

**Features:**
- 2-column grid layout matching the screenshot
- 14 main categories with Lucide React icons
- Hover effects with smooth transitions
- Responsive design
- Additional categories section

**Categories included:**
- Men's Wear
- Women Apparel
- Beauty & Personal Care
- Tops
- Jewellery & Accessories
- Women's Bags
- Travel & Luggage
- Dresses
- Sling Bags
- Men's Shoes
- Home Appliances
- Home & Living
- Socks & Tights
- Clutches & Mini Bags

## Usage

```tsx
import { CategoriesGrid } from '@/components/categories'

// In your page component
export default function CategoriesPage() {
  return (
    <div>
      <Header />
      <CategoriesGrid />
      <Footer />
    </div>
  )
}
```

## Styling

- Clean, minimalist design
- Consistent spacing and typography
- Purple accent color on hover
- Smooth transitions for better UX
- Responsive grid layout

## Future Enhancements

- Category-specific pages
- Category descriptions
- Product count per category
- Category images
- Subcategories
- Category search/filter
- Category analytics 