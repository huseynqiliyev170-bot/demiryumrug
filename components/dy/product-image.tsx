import Image from 'next/image'
import { cn } from '@/lib/utils'
import { productImages, type ProductImageKey } from '@/lib/image-data'

type ProductImageProps = {
  name: ProductImageKey
  alt: string
  sizes: string
  /**
   * `contain` guarantees the whole object stays visible (nothing is sliced).
   * `cover` is only for intentionally atmospheric, full-bleed backdrops.
   */
  fit?: 'contain' | 'cover'
  priority?: boolean
  className?: string
  imageClassName?: string
  /** Renders the image at its natural aspect ratio inside the box. */
  position?: string
}

/**
 * Wraps next/image with the generated size + blur metadata.
 *
 * Every photograph is served through the Next.js optimizer at the exact
 * dimensions the slot needs, with a base64 LQIP so there is never a blank
 * frame or layout shift while it loads.
 */
export function ProductImage({
  name,
  alt,
  sizes,
  fit = 'contain',
  priority = false,
  className,
  imageClassName,
  position = 'center',
}: ProductImageProps) {
  const image = productImages[name]

  return (
    <Image
      src={image.src}
      alt={alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : 'lazy'}
      placeholder="blur"
      blurDataURL={image.blurDataURL}
      quality={82}
      className={cn(
        'h-full w-full',
        fit === 'contain' ? 'object-contain' : 'object-cover',
        className,
        imageClassName,
      )}
      style={{ objectPosition: position }}
    />
  )
}

/** Intrinsic aspect ratio (`w / h`) for a given photograph. */
export function imageRatio(name: ProductImageKey) {
  const { width, height } = productImages[name]
  return width / height
}
