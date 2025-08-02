# Promotional Banner Management System

## Overview

The Promotional Banner Management System is designed for large e-commerce websites that need flexible, scalable banner management. It provides configuration-based banner control with date-based activation, priority management, and category filtering.

## Features

### 🎯 **Core Features**
- **Configuration-Based**: All banners managed through a central configuration file
- **Date-Based Activation**: Automatic activation/deactivation based on start/end dates
- **Priority System**: Multiple banners can be configured with priority levels
- **Category & Tag Filtering**: Organize banners by categories and tags
- **Easy Updates**: Simple configuration changes without code deployment

### 📅 **Date Management**
- Set start and end dates for each banner
- Automatic activation based on current date
- Fallback to priority system when no date-specific banner is active

### 🏷️ **Organization**
- **Categories**: fashion, seasonal, festival, electronics, education
- **Tags**: summer, autumn, christmas, diwali, sale, discounts
- **Priority**: 1 (highest) to 10 (lowest)

## Configuration

### Banner Configuration Structure

```typescript
interface PromotionalBannerConfig {
  id: string                    // Unique identifier
  title: string                 // Banner title
  imageUrl: string              // Banner image URL
  linkUrl: string               // Click destination
  altText: string               // Accessibility text
  height: number                // Image height
  width: number                 // Image width
  isActive: boolean             // Manual activation flag
  priority: number              // Display priority (1-10)
  startDate?: string            // Activation date (YYYY-MM-DD)
  endDate?: string              // Deactivation date (YYYY-MM-DD)
  category?: string             // Banner category
  tags?: string[]               // Searchable tags
}
```

### Example Banner Configuration

```typescript
{
  id: "summer-fashion-2024",
  title: "Summer Fashion Collection",
  imageUrl: "https://cdn.ishop.cholobangla.com/uploads/banner-5.webp",
  linkUrl: "/summer-fashion/products?banner=5",
  altText: "Summer fashion collection with trendy styles",
  height: 100,
  width: 500,
  isActive: true,
  priority: 1,
  startDate: "2024-06-01",
  endDate: "2024-08-31",
  category: "fashion",
  tags: ["summer", "fashion", "clothing"]
}
```

## Usage

### Basic Usage

```tsx
// Use configuration system (recommended)
<PromotionalBanner useConfig={true} />

// Use specific banner
<PromotionalBanner bannerId="summer-fashion-2024" />

// Use custom props
<PromotionalBanner 
  title="Custom Banner"
  imageUrl="https://example.com/banner.jpg"
  linkUrl="/custom-page"
  altText="Custom banner"
/>
```

### Advanced Usage

```tsx
// Multiple banners with different priorities
<PromotionalBanner useConfig={true} />
<PromotionalBanner bannerId="electronics-sale" />
<PromotionalBanner bannerId="back-to-school" />
```

## Management Functions

### Get Active Banner
```typescript
import { getActiveBanner } from "@/data/promotionalBanners"

const activeBanner = getActiveBanner()
```

### Category-Based Filtering
```typescript
import { getBannersByCategory } from "@/data/promotionalBanners"

const fashionBanners = getBannersByCategory("fashion")
```

### Tag-Based Filtering
```typescript
import { getBannersByTags } from "@/data/promotionalBanners"

const saleBanners = getBannersByTags(["sale", "discounts"])
```

### Banner Management
```typescript
import { 
  activateBanner, 
  deactivateBanner, 
  addBanner, 
  updateBanner, 
  removeBanner 
} from "@/data/promotionalBanners"

// Activate a banner
activateBanner("summer-fashion-2024")

// Deactivate a banner
deactivateBanner("autumn-offer-2024")

// Add new banner
addBanner({
  id: "new-campaign",
  title: "New Campaign",
  // ... other properties
})

// Update existing banner
updateBanner("summer-fashion-2024", {
  isActive: false,
  priority: 5
})

// Remove banner
removeBanner("old-campaign")
```

## Campaign Management

### Seasonal Campaigns
1. **Summer Fashion** (June - August)
2. **Autumn Offers** (September - November)
3. **Diwali Festival** (October - November)
4. **Christmas & New Year** (December - January)
5. **Back to School** (July - September)

### Category-Based Campaigns
- **Fashion**: Clothing, accessories, seasonal styles
- **Electronics**: Gadgets, devices, tech accessories
- **Education**: School supplies, books, learning materials
- **Festival**: Holiday-specific promotions
- **Seasonal**: Weather-based campaigns

## Best Practices

### 🎨 **Design Guidelines**
- Use consistent aspect ratios (recommended: 5:1)
- Optimize images for web (WebP format preferred)
- Ensure text is readable on all backgrounds
- Test on different screen sizes

### 📊 **Performance**
- Use `priority` prop for above-the-fold banners
- Implement lazy loading for multiple banners
- Optimize image sizes for different devices
- Use CDN for banner images

### 🔧 **Maintenance**
- Regular review of active banners
- Archive old campaigns
- Update dates for recurring campaigns
- Monitor banner performance

### 🎯 **A/B Testing**
- Create multiple banner variations
- Use different priorities for testing
- Track click-through rates
- Optimize based on performance data

## Troubleshooting

### Common Issues

1. **Banner Not Displaying**
   - Check `isActive` status
   - Verify date range is current
   - Ensure priority is set correctly

2. **Wrong Banner Showing**
   - Check priority order
   - Verify date ranges don't overlap
   - Review `isActive` flags

3. **Image Not Loading**
   - Verify image URL is accessible
   - Check image format compatibility
   - Ensure proper CDN configuration

## Future Enhancements

### Planned Features
- **Analytics Integration**: Track banner performance
- **A/B Testing**: Built-in testing framework
- **Dynamic Content**: Personalized banner content
- **Multi-Language**: International banner support
- **Advanced Scheduling**: More complex date rules
- **Banner Rotation**: Multiple banners in sequence

### API Integration
- **CMS Integration**: Manage banners through CMS
- **Real-time Updates**: Live banner management
- **Performance Metrics**: Click-through and conversion tracking
- **User Segmentation**: Targeted banner display

## Support

For questions or issues with the banner management system:
1. Check the configuration file for syntax errors
2. Verify date formats (YYYY-MM-DD)
3. Ensure all required fields are provided
4. Test with different date scenarios 