# Promotional Banner Component

## Overview

The `PromotionalBanner` component is a flexible promotional banner that can be easily updated for different seasons and campaigns. It's positioned above the newsletter subscription section.

## Features

- ✅ **Responsive Design**: Works on all screen sizes
- ✅ **Easy Configuration**: Update banners through data file
- ✅ **SEO Friendly**: Proper alt text and semantic HTML
- ✅ **Clickable**: Links to promotional pages
- ✅ **Hover Effects**: Subtle opacity change on hover
- ✅ **Image Optimization**: Uses Next.js Image component

## Current Banner

The current banner shows the **Autumn Offer** with the image from your CDN.

## How to Update for Different Seasons

### 1. Update the Configuration File

Edit `Frontend/data/promotionalBanners.ts`:

```tsx
// To activate Diwali Sale
updateBannerStatus("diwali-sale", true)
updateBannerStatus("autumn-offer", false)

// To activate Christmas Offer
updateBannerStatus("christmas-offer", true)
updateBannerStatus("autumn-offer", false)
```

### 2. Add New Banner Configuration

```tsx
{
  id: "holi-sale",
  title: "Holi Sale",
  description: "Festive colors, amazing deals",
  imageUrl: "https://cdn.ishop.cholobangla.com/uploads/banner-holi.webp",
  linkUrl: "/holi-sale/products?banner=holi",
  altText: "Holi Sale - Festive colors, amazing deals",
  height: 100,
  width: 500,
  isActive: false,
  season: "holi"
}
```

### 3. Update Image URLs

Replace the `imageUrl` in the configuration with your new banner image:

```tsx
imageUrl: "https://cdn.ishop.cholobangla.com/uploads/banner-new-season.webp"
```

## Available Seasons

- **autumn**: Autumn Offer (currently active)
- **diwali**: Diwali Sale
- **christmas**: Christmas Offer
- **newyear**: New Year Sale
- **summer**: Summer Sale

## Quick Update Examples

### For Diwali Season:
```tsx
// In promotionalBanners.ts
{
  id: "diwali-sale",
  title: "Diwali Sale",
  description: "Festive season offers and discounts",
  imageUrl: "https://cdn.ishop.cholobangla.com/uploads/banner-diwali.webp",
  linkUrl: "/diwali-sale/products?banner=diwali",
  altText: "Diwali Sale - Festive season offers",
  height: 100,
  width: 500,
  isActive: true, // Set to true
  season: "diwali"
}
```

### For Christmas Season:
```tsx
{
  id: "christmas-offer",
  title: "Christmas Offer",
  description: "Holiday season special deals",
  imageUrl: "https://cdn.ishop.cholobangla.com/uploads/banner-christmas.webp",
  linkUrl: "/christmas-offer/products?banner=christmas",
  altText: "Christmas Offer - Holiday season deals",
  height: 100,
  width: 500,
  isActive: true, // Set to true
  season: "christmas"
}
```

## Usage

### Using Configuration (Recommended):
```tsx
<PromotionalBanner useConfig={true} />
```

### Using Props:
```tsx
<PromotionalBanner 
  title="Custom Offer"
  imageUrl="https://example.com/banner.jpg"
  linkUrl="/custom-offer"
  altText="Custom Offer"
  useConfig={false}
/>
```

## Banner Specifications

- **Height**: 100px (default)
- **Width**: 500px (default)
- **Format**: WebP recommended for better performance
- **Aspect Ratio**: 5:1 (horizontal banner)
- **File Size**: Keep under 200KB for fast loading

## Best Practices

1. **Image Optimization**: Use WebP format for better compression
2. **Alt Text**: Always provide descriptive alt text for accessibility
3. **Link URLs**: Use tracking parameters for analytics
4. **Seasonal Updates**: Plan banner updates well in advance
5. **Mobile Responsive**: Test on different screen sizes

## Analytics Tracking

The banner includes tracking parameters in the URL:
- `?banner=6` for autumn offer
- `?banner=diwali` for Diwali sale
- `?banner=christmas` for Christmas offer

This helps track which banners are performing best.

## Future Enhancements

- [ ] A/B testing support
- [ ] Dynamic banner rotation
- [ ] Personalized banners based on user behavior
- [ ] Countdown timer for limited-time offers
- [ ] Animated banner transitions 