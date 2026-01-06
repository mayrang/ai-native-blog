import Image from 'next/image'

const AUTHOR_AVATAR_SIZE = 64

interface Author {
  name: string
  bio: string
  avatarUrl: string
}

interface AuthorProfileProps {
  author: Author
}

interface AuthorAvatarProps {
  avatarUrl: string
  authorName: string
}

interface AuthorDetailsProps {
  name: string
  bio: string
}

function AuthorAvatar({ avatarUrl, authorName }: AuthorAvatarProps) {
  return (
    <Image
      src={avatarUrl}
      alt={`Profile picture of ${authorName}`}
      width={AUTHOR_AVATAR_SIZE}
      height={AUTHOR_AVATAR_SIZE}
      className="rounded-full"
    />
  )
}

function AuthorDetails({ name, bio }: AuthorDetailsProps) {
  return (
    <div className="flex-1">
      <h3 className="font-bold text-lg text-neutral-900 dark:text-neutral-100">
        {name}
      </h3>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        {bio}
      </p>
    </div>
  )
}

export function AuthorProfile({ author }: AuthorProfileProps) {
  return (
    <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
      <div className="flex items-start gap-4">
        <AuthorAvatar avatarUrl={author.avatarUrl} authorName={author.name} />
        <AuthorDetails name={author.name} bio={author.bio} />
      </div>
    </div>
  )
}
