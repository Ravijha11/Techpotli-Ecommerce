# Brands Components

This directory contains components for displaying brand logos and information in a clean, organized layout.

## Components

### BrandsGrid
The main component that displays all featured brands in a responsive grid layout.

**Features:**
- 6-column grid layout matching the screenshot
- 12 main brands with logo images
- Hover effects with smooth transitions
- Responsive design
- Additional brands section
- Image fallback handling

**Brands included:**
- Levi's
- Adidas
- H&M
- Rolex
- Apple
- Chanel
- Zara
- Nike
- Gillette
- Accenture
- Nescafe
- L'Oréal

## Usage

```tsx
import { BrandsGrid } from '@/components/brands'

// In your page component
export default function BrandsPage() {
  return (
    <div>
      <Header />
      <BrandsGrid />
      <Footer />
    </div>
  )
}
```

## Image Requirements

Brand logos should be placed in the `/public/brands/` directory with the following naming convention:
- `levis-logo.png`
- `adidas-logo.png`
- `hm-logo.png`
- `rolex-logo.png`
- `apple-logo.png`
- `chanel-logo.png`
- `zara-logo.png`
- `nike-logo.png`
- `gillette-logo.png`
- `accenture-logo.png`
- `nescafe-logo.png`
- `loreal-logo.png`

## Styling

- Clean, minimalist design
- Consistent spacing and typography
- Purple accent color on hover
- Smooth transitions for better UX
- Responsive grid layout
- Image fallback to text if logo fails to load

## Future Enhancements

- Brand-specific pages
- Brand descriptions
- Product count per brand
- Brand categories
- Brand search/filter
- Brand analytics
- Brand partnerships
- Featured brand promotions
