# Categories Components

This directory contains category-related components for the e-commerce application.

## FeaturedCategories

The `FeaturedCategories` component displays a horizontal scrollable list of featured product categories with icons and navigation controls.

### Features

- **Responsive Design**: Adapts to different screen sizes
- **Carousel Navigation**: Left/right arrow buttons for scrolling through categories
- **Icon-based Categories**: Uses Lucide React icons for consistent styling
- **Hover Effects**: Smooth transitions and hover states
- **Accessibility**: Proper ARIA labels and keyboard navigation

### Usage

```tsx
import FeaturedCategories from "@/components/categories/FeaturedCategories"

// In your component or page
<FeaturedCategories />
```

### Props

Currently, the component doesn't accept any props and uses predefined category data. Future versions may support:

- `categories`: Custom category data
- `title`: Custom section title
- `itemsPerView`: Number of items visible at once
- `showNavigation`: Toggle navigation arrows
- `showViewAll`: Toggle "Show all" link

### Category Data Structure

```tsx
interface CategoryItem {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  href: string
}
```

### Styling

The component uses Tailwind CSS classes and follows the design system:
- Background: `bg-gray-50`
- Cards: White background with subtle shadows
- Icons: Black line art style using Lucide React
- Typography: Consistent font weights and sizes
- Spacing: Responsive padding and margins

### Dependencies

- `lucide-react`: For category icons
- `next/link`: For navigation
- `react`: For state management and hooks 