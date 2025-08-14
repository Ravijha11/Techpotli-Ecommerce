# NewYearSale Component

This component provides a complete New Year Sale product listing and detail view functionality.

## Structure

```
NewYearSale/
├── index.tsx              # Main component with product listing and pagination
├── ProductCard.tsx        # Individual product card component
├── ProductDetail.tsx      # Detailed product view modal
├── products/
│   └── productsData.ts    # Product data and interfaces
└── README.md              # This file
```

## Features

- **Product Listing**: Grid display of New Year Sale products with pagination
- **Product Cards**: Interactive product cards with hover effects
- **Product Detail Modal**: Comprehensive product information view matching the design
- **Responsive Design**: Mobile-first responsive layout
- **Data Management**: Centralized product data storage for easy updates

## Usage

### Basic Implementation

```tsx
import NewYearSale from "@/components/NewYearSale"

export default function MyPage() {
  return <NewYearSale />
}
```

### Product Data Structure

Products are defined in `products/productsData.ts` with the following interface:

```typescript
interface Product {
  id: string
  name: string
  price: number
  originalPrice: number
  discount: number
  image: string
  badge?: "New" | "Featured" | "Sale" | "Shocking Sale"
  slug: string
  rating: number
  reviewCount: number
  reviews: ProductReview[]
  brand: string
  size: string
  inStock: boolean
  bundleDeal?: string
  returnPolicy: string
  warranty: string
  inDimensions: boolean
  productDimensions: string
  weight: string
  itemModelNumber: string
  shippingFee: number
  estimatedArrival: string
  secureTransaction: boolean
  category: string
  subcategory: string
  description: string
  features: string[]
  colors?: string[]
  sizes?: string[]
}
```

## Adding/Modifying Products

To add or modify products:

1. Edit `products/productsData.ts`
2. Add new products to the `newYearSaleProducts` array
3. Follow the existing data structure
4. The component will automatically update to reflect changes

## Customization

### Styling
- Uses Tailwind CSS classes
- Responsive breakpoints: sm, md, lg, xl
- Purple theme colors for primary actions
- Hover effects and transitions

### Functionality
- Pagination controls (5 products per page)
- Product detail modal with full product information
- Star rating system
- Review display with user information
- Countdown timer for sale urgency

## Responsive Design

- **Mobile**: Single column layout
- **Tablet**: 2-3 columns
- **Desktop**: 4-5 columns
- **Large Desktop**: 5 columns with optimal spacing

## Dependencies

- React (with hooks)
- Next.js Image component
- Lucide React icons
- Tailwind CSS

## Best Practices

- Product data is separated from component logic
- Props are used for data passing
- Accessibility features included (aria-labels, proper button text)
- Mobile-first responsive design
- Clean, maintainable component architecture
