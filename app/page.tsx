import { SiteHeader } from '@/components/dy/site-header'
import { Hero } from '@/components/dy/hero'
import { ArtifactIndex } from '@/components/dy/artifact-index'
import { ChapterObject } from '@/components/dy/chapter-object'
import { ChapterSymbol } from '@/components/dy/chapter-symbol'
import { ChapterMemory } from '@/components/dy/chapter-memory'
import { ChapterMaterial } from '@/components/dy/chapter-material'
import { ChapterPresentation } from '@/components/dy/chapter-presentation'
import { ChapterOrder } from '@/components/dy/chapter-order'
import { Closing } from '@/components/dy/closing'
import { SiteFooter } from '@/components/dy/site-footer'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <ArtifactIndex />
        <ChapterObject />
        <ChapterSymbol />
        <ChapterMemory />
        <ChapterMaterial />
        <ChapterPresentation />
        <ChapterOrder />
      </main>
      <SiteFooter />
    </>
  )
}
