import { render, screen } from '@testing-library/react'
import { AuthorProfile } from './AuthorProfile'

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />
  },
}))

describe('AuthorProfile', () => {
  const mockAuthor = {
    name: 'John Doe',
    bio: 'Software engineer and technical writer passionate about web development.',
    avatarUrl: '/images/john-doe.jpg',
  }

  describe('Rendering', () => {
    it('should render the author profile container', () => {
      render(<AuthorProfile author={mockAuthor} />)

      const container = screen.getByRole('heading', { name: mockAuthor.name }).closest('div')?.parentElement?.parentElement
      expect(container).toBeInTheDocument()
      expect(container).toHaveClass('mt-12', 'pt-8', 'border-t')
    })

    it('should render the author name as a heading', () => {
      render(<AuthorProfile author={mockAuthor} />)

      const heading = screen.getByRole('heading', { name: mockAuthor.name, level: 3 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveClass('font-bold', 'text-lg')
    })

    it('should render the author bio', () => {
      render(<AuthorProfile author={mockAuthor} />)

      const bio = screen.getByText(mockAuthor.bio)
      expect(bio).toBeInTheDocument()
      expect(bio).toHaveClass('mt-2', 'text-sm')
    })

    it('should render the author avatar with correct src', () => {
      render(<AuthorProfile author={mockAuthor} />)

      const avatar = screen.getByAltText(`Profile picture of ${mockAuthor.name}`)
      expect(avatar).toBeInTheDocument()
      expect(avatar).toHaveAttribute('src', mockAuthor.avatarUrl)
    })

    it('should render avatar with correct dimensions', () => {
      render(<AuthorProfile author={mockAuthor} />)

      const avatar = screen.getByAltText(`Profile picture of ${mockAuthor.name}`)
      expect(avatar).toHaveAttribute('width', '64')
      expect(avatar).toHaveAttribute('height', '64')
    })

    it('should render avatar with rounded-full class', () => {
      render(<AuthorProfile author={mockAuthor} />)

      const avatar = screen.getByAltText(`Profile picture of ${mockAuthor.name}`)
      expect(avatar).toHaveClass('rounded-full')
    })
  })

  describe('Accessibility', () => {
    it('should have accessible alt text for avatar', () => {
      render(<AuthorProfile author={mockAuthor} />)

      const avatar = screen.getByAltText(`Profile picture of ${mockAuthor.name}`)
      expect(avatar).toBeInTheDocument()
    })

    it('should use semantic heading for author name', () => {
      render(<AuthorProfile author={mockAuthor} />)

      const heading = screen.getByRole('heading', { name: mockAuthor.name })
      expect(heading.tagName).toBe('H3')
    })

    it('should have proper visual hierarchy with border separator', () => {
      render(<AuthorProfile author={mockAuthor} />)

      const heading = screen.getByRole('heading', { name: mockAuthor.name })
      const container = heading.closest('div')?.parentElement?.parentElement
      expect(container).toHaveClass('border-t')
    })
  })

  describe('Prop Handling', () => {
    it('should handle author with different name', () => {
      const customAuthor = { ...mockAuthor, name: 'Jane Smith' }
      render(<AuthorProfile author={customAuthor} />)

      expect(screen.getByRole('heading', { name: 'Jane Smith' })).toBeInTheDocument()
      expect(screen.getByAltText('Profile picture of Jane Smith')).toBeInTheDocument()
    })

    it('should handle author with different bio', () => {
      const customAuthor = { ...mockAuthor, bio: 'A different bio text' }
      render(<AuthorProfile author={customAuthor} />)

      expect(screen.getByText('A different bio text')).toBeInTheDocument()
    })

    it('should handle author with different avatar URL', () => {
      const customAuthor = { ...mockAuthor, avatarUrl: '/images/custom-avatar.png' }
      render(<AuthorProfile author={customAuthor} />)

      const avatar = screen.getByAltText(`Profile picture of ${customAuthor.name}`)
      expect(avatar).toHaveAttribute('src', '/images/custom-avatar.png')
    })

    it('should handle long author names', () => {
      const customAuthor = {
        ...mockAuthor,
        name: 'Dr. Alexander Christopher Wellington-Montgomery III'
      }
      render(<AuthorProfile author={customAuthor} />)

      expect(screen.getByRole('heading', { name: customAuthor.name })).toBeInTheDocument()
    })

    it('should handle long bio text', () => {
      const longBio = 'This is a very long biography that contains a lot of information about the author. '.repeat(10).trim()
      const customAuthor = { ...mockAuthor, bio: longBio }
      render(<AuthorProfile author={customAuthor} />)

      expect(screen.getByText(longBio)).toBeInTheDocument()
    })

    it('should handle empty bio', () => {
      const customAuthor = { ...mockAuthor, bio: '' }
      render(<AuthorProfile author={customAuthor} />)

      const bioElement = screen.getByText('', { selector: 'p' })
      expect(bioElement).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle special characters in author name', () => {
      const customAuthor = { ...mockAuthor, name: "O'Brien-Smith & Co." }
      render(<AuthorProfile author={customAuthor} />)

      expect(screen.getByRole('heading', { name: "O'Brien-Smith & Co." })).toBeInTheDocument()
      expect(screen.getByAltText("Profile picture of O'Brien-Smith & Co.")).toBeInTheDocument()
    })

    it('should handle special characters in bio', () => {
      const customAuthor = {
        ...mockAuthor,
        bio: 'Expert in C++, C#, & JavaScript! <3 coding.'
      }
      render(<AuthorProfile author={customAuthor} />)

      expect(screen.getByText('Expert in C++, C#, & JavaScript! <3 coding.')).toBeInTheDocument()
    })

    it('should handle unicode characters in name', () => {
      const customAuthor = { ...mockAuthor, name: 'François Müller' }
      render(<AuthorProfile author={customAuthor} />)

      expect(screen.getByRole('heading', { name: 'François Müller' })).toBeInTheDocument()
    })

    it('should handle emoji in bio', () => {
      const customAuthor = {
        ...mockAuthor,
        bio: 'Love coding 💻 and coffee ☕'
      }
      render(<AuthorProfile author={customAuthor} />)

      expect(screen.getByText('Love coding 💻 and coffee ☕')).toBeInTheDocument()
    })

    it('should handle absolute URL for avatar', () => {
      const customAuthor = {
        ...mockAuthor,
        avatarUrl: 'https://example.com/avatar.jpg'
      }
      render(<AuthorProfile author={customAuthor} />)

      const avatar = screen.getByAltText(`Profile picture of ${customAuthor.name}`)
      expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg')
    })

    it('should handle relative URL for avatar', () => {
      const customAuthor = {
        ...mockAuthor,
        avatarUrl: '../public/avatar.jpg'
      }
      render(<AuthorProfile author={customAuthor} />)

      const avatar = screen.getByAltText(`Profile picture of ${customAuthor.name}`)
      expect(avatar).toHaveAttribute('src', '../public/avatar.jpg')
    })
  })

  describe('Component Structure', () => {
    it('should render avatar and details in a flex container', () => {
      render(<AuthorProfile author={mockAuthor} />)

      const heading = screen.getByRole('heading', { name: mockAuthor.name })
      const flexContainer = heading.closest('div')?.parentElement
      expect(flexContainer).toHaveClass('flex', 'items-start', 'gap-4')
    })

    it('should render all child components', () => {
      render(<AuthorProfile author={mockAuthor} />)

      // Avatar component
      const avatar = screen.getByAltText(`Profile picture of ${mockAuthor.name}`)
      expect(avatar).toBeInTheDocument()

      // Details component - heading
      const heading = screen.getByRole('heading', { name: mockAuthor.name })
      expect(heading).toBeInTheDocument()

      // Details component - bio
      const bio = screen.getByText(mockAuthor.bio)
      expect(bio).toBeInTheDocument()
    })

    it('should maintain proper spacing between sections', () => {
      render(<AuthorProfile author={mockAuthor} />)

      const heading = screen.getByRole('heading', { name: mockAuthor.name })
      const container = heading.closest('div')?.parentElement?.parentElement
      expect(container).toHaveClass('mt-12', 'pt-8')
    })
  })

  describe('Dark Mode Support', () => {
    it('should include dark mode classes for heading', () => {
      render(<AuthorProfile author={mockAuthor} />)

      const heading = screen.getByRole('heading', { name: mockAuthor.name })
      expect(heading).toHaveClass('text-neutral-900', 'dark:text-neutral-100')
    })

    it('should include dark mode classes for bio', () => {
      render(<AuthorProfile author={mockAuthor} />)

      const bio = screen.getByText(mockAuthor.bio)
      expect(bio).toHaveClass('text-neutral-600', 'dark:text-neutral-400')
    })

    it('should include dark mode classes for border', () => {
      render(<AuthorProfile author={mockAuthor} />)

      const heading = screen.getByRole('heading', { name: mockAuthor.name })
      const container = heading.closest('div')?.parentElement?.parentElement
      expect(container).toHaveClass('border-neutral-200', 'dark:border-neutral-800')
    })
  })

  describe('Multiple Renders', () => {
    it('should handle re-rendering with same props', () => {
      const { rerender } = render(<AuthorProfile author={mockAuthor} />)

      expect(screen.getByRole('heading', { name: mockAuthor.name })).toBeInTheDocument()

      rerender(<AuthorProfile author={mockAuthor} />)

      expect(screen.getByRole('heading', { name: mockAuthor.name })).toBeInTheDocument()
    })

    it('should update when author prop changes', () => {
      const { rerender } = render(<AuthorProfile author={mockAuthor} />)

      expect(screen.getByRole('heading', { name: 'John Doe' })).toBeInTheDocument()

      const newAuthor = {
        name: 'Jane Smith',
        bio: 'New bio',
        avatarUrl: '/new-avatar.jpg',
      }

      rerender(<AuthorProfile author={newAuthor} />)

      expect(screen.queryByRole('heading', { name: 'John Doe' })).not.toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'Jane Smith' })).toBeInTheDocument()
      expect(screen.getByText('New bio')).toBeInTheDocument()
    })
  })

  describe('Snapshot Testing', () => {
    it('should match snapshot for standard author profile', () => {
      const { container } = render(<AuthorProfile author={mockAuthor} />)
      expect(container).toMatchSnapshot()
    })

    it('should match snapshot with minimal author data', () => {
      const minimalAuthor = {
        name: 'A',
        bio: '',
        avatarUrl: '/a.jpg',
      }
      const { container } = render(<AuthorProfile author={minimalAuthor} />)
      expect(container).toMatchSnapshot()
    })
  })
})
