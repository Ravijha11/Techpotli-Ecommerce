# Login Dropdown Components

This directory contains modular components for the login dropdown menu. Each section is separated into its own component for easy modification and maintenance.

## Components

### 1. NewCustomerSection
- **File**: `NewCustomerSection.tsx`
- **Purpose**: Displays the "New customer?" section with sign-up call-to-action
- **Props**: `onClose?: () => void`
- **Features**: 
  - Gradient background
  - Sign-up button
  - Responsive design

### 2. ProfileSection
- **File**: `ProfileSection.tsx`
- **Purpose**: My Profile section with account management
- **Props**: `onClose?: () => void`
- **Features**:
  - User icon
  - Account settings link
  - Hover effects

### 3. PlusZoneSection
- **File**: `PlusZoneSection.tsx`
- **Purpose**: ishop Plus Zone with premium features
- **Props**: `onClose?: () => void`
- **Features**:
  - Crown icon
  - Plus badge
  - Premium benefits description

### 4. OrdersSection
- **File**: `OrdersSection.tsx`
- **Purpose**: Orders tracking and history
- **Props**: `onClose?: () => void`
- **Features**:
  - Package icon
  - Order tracking link
  - History description

### 5. WishlistSection
- **File**: `WishlistSection.tsx`
- **Purpose**: Wish list/saved items
- **Props**: `onClose?: () => void`
- **Features**:
  - Heart icon
  - Saved items link
  - Wishlist management

### 6. RewardsSection
- **File**: `RewardsSection.tsx`
- **Purpose**: Rewards and points system
- **Props**: `onClose?: () => void`
- **Features**:
  - Gift icon
  - Points earning/redeeming
  - Rewards program

### 7. GiftCardsSection
- **File**: `GiftCardsSection.tsx`
- **Purpose**: Gift card management
- **Props**: `onClose?: () => void`
- **Features**:
  - Credit card icon
  - Gift card purchase/management
  - Card management

### 8. SettingsSection
- **File**: `SettingsSection.tsx`
- **Purpose**: Account settings
- **Props**: `onClose?: () => void`
- **Features**:
  - Settings icon
  - Account configuration
  - User preferences

### 9. LogoutSection
- **File**: `LogoutSection.tsx`
- **Purpose**: Logout functionality
- **Props**: `onClose?: () => void`, `onLogout?: () => void`
- **Features**:
  - Logout icon
  - Red hover state
  - Logout callback

## Usage

### Importing Components
```tsx
import {
  NewCustomerSection,
  ProfileSection,
  PlusZoneSection,
  OrdersSection,
  WishlistSection,
  RewardsSection,
  GiftCardsSection,
  SettingsSection,
  LogoutSection
} from "./LoginDropdown"
```

### Using Individual Components
```tsx
// Example usage in a dropdown
<div className="dropdown-menu">
  <NewCustomerSection onClose={() => setOpen(false)} />
  <ProfileSection onClose={() => setOpen(false)} />
  <PlusZoneSection onClose={() => setOpen(false)} />
  {/* ... other sections */}
  <LogoutSection 
    onClose={() => setOpen(false)} 
    onLogout={() => handleLogout()} 
  />
</div>
```

## Customization

### Modifying a Section
To modify any section, simply edit the corresponding component file. For example, to change the Profile section:

1. Open `ProfileSection.tsx`
2. Modify the JSX, styling, or functionality
3. The changes will be reflected in the main dropdown

### Adding New Sections
To add a new section:

1. Create a new component file (e.g., `NewSection.tsx`)
2. Follow the same pattern as existing components
3. Add the export to `index.tsx`
4. Import and use in the main dropdown

### Styling
All components use Tailwind CSS classes and follow the same design system:
- Hover effects: `hover:bg-gray-50`
- Focus states: `focus:ring-2 focus:ring-purple-500`
- Icons: `w-5 h-5 text-gray-600`
- Text: `text-gray-900 text-sm font-medium`

## Props Interface

All components accept an optional `onClose` prop for consistent behavior:

```tsx
interface ComponentProps {
  onClose?: () => void
}
```

The LogoutSection additionally accepts an `onLogout` prop:

```tsx
interface LogoutSectionProps {
  onClose?: () => void
  onLogout?: () => void
}
```

## Benefits

1. **Modularity**: Each section is independent and can be modified separately
2. **Reusability**: Components can be used in different contexts
3. **Maintainability**: Easy to locate and modify specific functionality
4. **Consistency**: All components follow the same patterns and styling
5. **Scalability**: Easy to add new sections or modify existing ones 