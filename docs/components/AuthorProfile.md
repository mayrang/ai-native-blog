# AuthorProfile

A modular author profile component that displays author information with an avatar, name, and biography.

## Overview

The `AuthorProfile` component displays comprehensive author information at the end of blog posts or articles. It consists of three sub-components (`AuthorAvatar`, `AuthorDetails`, and `AuthorProfile`) that work together to create a visually appealing author section with dark mode support. The component is designed to be placed after article content as a visual separator, featuring a top border and generous spacing.

## Components

### AuthorProfile (Main Component)

The primary export that orchestrates the avatar and details sub-components.

#### Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| author | `Author` | Yes | - | Author object containing name, bio, and avatar URL |
| author.name | `string` | Yes | - | The author's full name |
| author.bio | `string` | Yes | - | The author's biography or description |
| author.avatarUrl | `string` | Yes | - | URL path to the author's profile image (relative or absolute) |

#### Usage Examples

**Basic Usage**

```tsx
import { AuthorProfile } from '@/components/AuthorProfile'

export default function BlogPost() {
  const author = {
    name: 'John Doe',
    bio: 'Software engineer and technical writer passionate about web development.',
    avatarUrl: '/images/john-doe.jpg'
  }

  return (
    <article>
      <h1>My Blog Post</h1>
      <p>Article content goes here...</p>

      <AuthorProfile author={author} />
    </article>
  )
}
```

**With Dynamic Author Data**

```tsx
import { AuthorProfile } from '@/components/AuthorProfile'

interface BlogPostProps {
  author: {
    name: string
    bio: string
    avatarUrl: string
  }
}

export default function BlogPost({ author }: BlogPostProps) {
  return (
    <article>
      <h1>Understanding React Hooks</h1>
      <p>React Hooks revolutionized how we write components...</p>

      <AuthorProfile author={author} />
    </article>
  )
}
```

**With External Avatar URL**

```tsx
import { AuthorProfile } from '@/components/AuthorProfile'

export default function BlogPost() {
  const author = {
    name: 'Jane Smith',
    bio: 'Full-stack developer specializing in Next.js and TypeScript.',
    avatarUrl: 'https://cdn.example.com/avatars/jane-smith.png'
  }

  return (
    <article>
      <h1>Advanced TypeScript Patterns</h1>
      <p>Let's explore some advanced patterns...</p>

      <AuthorProfile author={author} />
    </article>
  )
}
```

### AuthorAvatar (Sub-component)

Internal component that renders the author's profile image using Next.js Image optimization.

#### Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| avatarUrl | `string` | Yes | - | URL path to the author's profile image |
| authorName | `string` | Yes | - | Author's name used for generating accessible alt text |

#### Implementation Details

- Uses Next.js `Image` component for automatic optimization
- Fixed dimensions: 64x64 pixels (defined by `AUTHOR_AVATAR_SIZE` constant)
- Applies `rounded-full` class for circular avatar appearance
- Generates accessible alt text in format: "Profile picture of [authorName]"

### AuthorDetails (Sub-component)

Internal component that renders the author's name and biography text.

#### Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| name | `string` | Yes | - | The author's full name |
| bio | `string` | Yes | - | The author's biography or description |

#### Implementation Details

- Name is rendered as an `<h3>` semantic heading for proper document structure
- Bio is rendered as a paragraph with smaller text size
- Includes dark mode color variants for all text elements
- Uses flex-1 to expand and fill available space next to the avatar

## Styling and Layout

### Container Structure

```
┌─────────────────────────────────────────┐
│ AuthorProfile Container                 │
│ (mt-12, pt-8, border-top)              │
│                                         │
│  ┌──────────┐  ┌────────────────────┐ │
│  │  Avatar  │  │  Author Details    │ │
│  │  (64x64) │  │  - Name (h3)       │ │
│  │          │  │  - Bio (p)         │ │
│  └──────────┘  └────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

### Spacing

- **Top margin**: `mt-12` (3rem/48px) - creates separation from article content
- **Top padding**: `pt-8` (2rem/32px) - adds space below the border
- **Avatar-Details gap**: `gap-4` (1rem/16px) - spacing between avatar and text
- **Name-Bio gap**: `mt-2` (0.5rem/8px) - spacing between name and bio

### Colors

#### Light Mode
- Border: `border-neutral-200`
- Name: `text-neutral-900`
- Bio: `text-neutral-600`

#### Dark Mode
- Border: `dark:border-neutral-800`
- Name: `dark:text-neutral-100`
- Bio: `dark:text-neutral-400`

## Accessibility Features

1. **Semantic HTML**: Author name uses `<h3>` heading for proper document outline
2. **Descriptive Alt Text**: Avatar includes descriptive alt text with author's name
3. **Optimized Images**: Uses Next.js Image component for performance and Core Web Vitals
4. **Visual Hierarchy**: Border separator creates clear content section distinction
5. **Flexible Layout**: Uses flexbox with `items-start` for proper alignment with long content

## Edge Cases and Handling

### Long Names
The component handles long names gracefully without truncation. Names wrap naturally within the available space.

```tsx
const author = {
  name: 'Dr. Alexander Christopher Wellington-Montgomery III',
  bio: 'Researcher and author.',
  avatarUrl: '/avatar.jpg'
}
```

### Long Biographies
Long biography text wraps naturally. Consider keeping bios concise (2-3 sentences) for optimal readability.

```tsx
const author = {
  name: 'John Doe',
  bio: 'A very long biography that spans multiple lines and provides extensive information about the author\'s background, experience, and interests...',
  avatarUrl: '/avatar.jpg'
}
```

### Empty Biography
The component accepts empty strings for the bio field, though this is not recommended for user experience.

```tsx
const author = {
  name: 'John Doe',
  bio: '',
  avatarUrl: '/avatar.jpg'
}
```

### Special Characters
Handles special characters, unicode, and emoji in both name and bio fields:

```tsx
const author = {
  name: 'François Müller',
  bio: 'Love coding 💻 and coffee ☕',
  avatarUrl: '/avatar.jpg'
}
```

### Avatar URL Types
Supports both relative and absolute URLs:

```tsx
// Relative path
const author1 = {
  name: 'John Doe',
  bio: 'Bio text',
  avatarUrl: '/images/avatar.jpg'
}

// Absolute URL
const author2 = {
  name: 'Jane Smith',
  bio: 'Bio text',
  avatarUrl: 'https://cdn.example.com/avatar.jpg'
}
```

## Integration Notes

### Typical Placement
The component is designed to be placed at the end of blog post content, typically within an article layout:

```tsx
<article>
  <header>{/* Post title, date, etc. */}</header>
  <main>{/* Post content */}</main>
  <AuthorProfile author={author} />
</article>
```

### Next.js Image Configuration
Ensure external domains are configured in `next.config.js` if using absolute URLs:

```js
module.exports = {
  images: {
    domains: ['cdn.example.com', 'avatars.githubusercontent.com'],
  },
}
```

### TypeScript Support
The component is fully typed with TypeScript. The `Author` interface is exported and can be imported for type safety:

```tsx
import { AuthorProfile } from '@/components/AuthorProfile'

// The Author interface is available internally
// Define your own matching interface or type
type Author = {
  name: string
  bio: string
  avatarUrl: string
}
```

## Performance Considerations

- **Image Optimization**: Leverages Next.js Image component for automatic optimization, lazy loading, and proper sizing
- **No Client-Side JavaScript**: Pure server-side component with no client-side interactivity
- **Fixed Avatar Size**: Uses constant `AUTHOR_AVATAR_SIZE = 64` for consistent rendering and layout stability
- **Minimal Re-renders**: Component is pure and only re-renders when author prop changes

## Testing

The component includes comprehensive test coverage including:
- Rendering validation
- Accessibility compliance
- Prop handling with various data types
- Edge cases (special characters, unicode, long text)
- Dark mode class application
- Component structure and layout
- Snapshot testing

See `/app/components/AuthorProfile.test.tsx` for full test suite.

## Related Components

This component is part of the blog post display system. It pairs well with:
- Blog post content components
- Article layout wrappers
- Comment sections
- Social sharing components

## Version History

- **Current**: Refactored into three modular sub-components (AuthorAvatar, AuthorDetails, AuthorProfile)
- Supports dark mode with Tailwind CSS
- Uses Next.js 15 Image component
- Full TypeScript support
