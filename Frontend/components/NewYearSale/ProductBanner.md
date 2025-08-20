# ProductBanner Component

## Overview
The `ProductBanner` component displays three featured product advertisements below the New Year Sale section. It showcases products with pricing, discounts, and call-to-action buttons. The component is designed to be **backend-ready** and can be easily updated seasonally.

## Features
- **Responsive Design**: Adapts to different screen sizes (mobile, tablet, desktop)
- **Product Showcase**: Displays product images, names, descriptions, and pricing
- **Discount Display**: Shows current price, original price (crossed out), and discount percentage
- **Interactive Elements**: Hover effects, animations, and call-to-action buttons
- **Seasonal Updates**: Easy to update products and themes for different seasons
- **Backend Ready**: Service layer prepared for API integration

## Integration
The `ProductBanner` component is automatically included in the `NewYearSale` component and will appear below the main sale products section.

## Usage
```tsx
import ProductBanner from "@/components/NewYearSale/ProductBanner"

// Use directly
<ProductBanner />

// Or it's automatically included when using NewYearSale
<NewYearSale />
```

## Backend Integration
When you connect the backend, the component will automatically fetch data from the API. The service layer is already prepared:

### API Endpoints (to be implemented):
- `GET /api/banners/current-season` - Get current season banners
- `GET /api/banners/season/:seasonId` - Get banners by season
- `PUT /api/banners/products/:id` - Update banner product (admin)

### Service Methods:
```tsx
import { BannerService } from "./services/banner.service"

// Get current season banners
const products = await BannerService.getCurrentSeasonBanners()

// Get banners by season
const products = await BannerService.getBannersBySeason("winter-2024")

// Update banner product
const success = await BannerService.updateBannerProduct("1", updates)
```

## Seasonal Configuration
Easy seasonal updates using the config file:

```tsx
// Edit: components/NewYearSale/config/seasons.config.ts
export const SEASONS_CONFIG: SeasonConfig[] = [
  {
    id: "winter-2024",
    name: "Winter 2024",
    theme: {
      primaryColor: "bg-blue-50",
      secondaryColor: "bg-slate-100",
      backgroundColor: "bg-amber-50",
      accentColor: "bg-red-100"
    },
    isActive: true
  }
  // Add new seasons here
]
```

## Customization
To modify the banner products, edit the `bannerProducts` array in the service file:

```tsx
// Edit: components/NewYearSale/services/banner.service.ts
private static getMockBannerProducts(): BannerProduct[] {
  return [
    {
      id: "1",
      name: "Product Name",
      description: "Product description",
      currentPrice: "$99",
      originalPrice: "$199",
      discount: "-50%",
      image: "/product-image.jpg",
      backgroundColor: "bg-blue-50",
      season: "winter-2024",
      isActive: true,
      category: "electronics",
      tags: ["featured", "sale"]
    }
  ]
}
```

## File Structure
```
components/NewYearSale/
├── ProductBanner.tsx          # Main component
├── types/
│   └── banner.types.ts        # TypeScript interfaces
├── services/
│   └── banner.service.ts      # API service layer
├── config/
│   └── seasons.config.ts      # Seasonal themes
└── ProductBanner.md           # This documentation
```

## Styling
- Uses Tailwind CSS for styling
- Responsive grid layout (1 column on mobile, 3 on desktop)
- Hover effects with smooth transitions
- Seasonal theme colors
- Loading states and error handling

## Images
Currently uses placeholder images from the public folder:
- Watch: `/Rolex.jpg`
- Headphones: `/Sony.jpg`
- Backpack: `/Nike.jpg`

Replace these with actual product images when backend is connected.

## Future Enhancements
- Admin panel for managing banner products
- A/B testing for different banner layouts
- Analytics tracking for banner performance
- Dynamic pricing based on inventory
- Multi-language support for international markets
