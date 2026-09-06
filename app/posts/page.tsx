import type { Metadata } from 'next'
import { PostsContent } from '@/components/dy/posts-content'

export const metadata: Metadata = {
  title: 'Postlar — Instagram arxivi',
  description:
    'Dəmir Yumruq atelyesinin gündəlik kadrları: tökmə prosesi, səth detalları və qutu təqdimatı — Instagram arxivindən seçilmiş postlar.',
  openGraph: {
    title: 'Dəmir Yumruq — Instagram arxivi',
    description:
      'Atelyenin gündəliyi: tökmədən qutuya qədər hər mərhələ, bir arxivdə.',
    url: '/posts',
  },
}

export default function Page() {
  return <PostsContent />
}
