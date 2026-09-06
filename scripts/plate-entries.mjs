/**
 * Throwaway: emits paste-ready `Plate` entries for the newly cut-out
 * photographs — real post-crop dimensions and a 12px blur placeholder, so the
 * numbers in lib/gallery-plates.ts are measured rather than guessed.
 *
 * The curated copy lives here alongside each file so the output needs no edits.
 */
import sharp from 'sharp'

const dir = 'public/images/cutout'

const curated = [
  {
    file: '_Z7A2837.webp',
    view: 'Qapaq',
    title: 'Qapaq relyefi',
    note: 'Timsah dərisi relyefi bağlı qapağın bütün səthini tutur.',
    alt: 'Bağlı təqdimat qutusu ayaq üstə — timsah dərisi relyefli qapaq',
  },
  {
    file: '_Z7A2838.webp',
    view: 'Üstdən',
    title: 'Üstdən görünüş',
    note: 'Pirinç bağlayıcı və tikiş xətti qapağın kənarında.',
    alt: 'Bağlı təqdimat qutusu üstdən — pirinç bağlayıcı görünür',
  },
  {
    file: '_Z7A2853.webp',
    view: 'Astar',
    title: 'Atlaz astar',
    note: 'Narıncı atlaz astar obyektin yerini saxlayır.',
    alt: 'Açıq təqdimat qutusunun narıncı atlaz astarı',
  },
  {
    file: '_Z7A2857.webp',
    view: 'Qırmızı qab',
    title: 'Qırmızı qablaşdırma',
    note: 'Şəbəkə naxışı ilə bəzədilmiş qapaq və pirinç bağlayıcı.',
    alt: 'Dəmir Yumruq heykəli qırmızı naxışlı qablaşdırmanın yanında',
  },
  {
    file: '_Z7A2865.webp',
    view: 'Qabın içi',
    title: 'Qab açılır',
    note: 'Qapaq açıldıqda obyekt qırmızı astarın içindən görünür.',
    alt: 'Açılmış qırmızı qablaşdırma və içindəki Dəmir Yumruq heykəli',
  },
  {
    file: '_Z7A2869.webp',
    view: 'Açıq qab',
    title: 'Kəsmə naxış',
    note: 'Naxışın kəsmə işi qapağın hər iki üzündə təkrarlanır.',
    alt: 'Açılmış boş qırmızı qablaşdırma — kəsmə naxış detalı',
  },
  {
    file: '_Z7A2879.webp',
    view: 'Məxmər',
    title: 'Məxmər qablaşdırma',
    note: 'Tünd məxmər üzərində qızılı şəbəkə — ikinci qablaşdırma variantı.',
    alt: 'Dəmir Yumruq heykəli tünd məxmər qablaşdırmanın yanında',
  },
  {
    file: '_Z7A2899.webp',
    view: 'İki variant',
    title: 'İki qablaşdırma',
    note: 'Qırmızı və məxmər variantlar yanaşı, obyekt ortada.',
    alt: 'Qırmızı və məxmər qablaşdırma variantları Dəmir Yumruq heykəli ilə',
  },
]

const out = []
for (const plate of curated) {
  const src = `${dir}/${plate.file}`
  const { width, height } = await sharp(src).metadata()
  const blur = await sharp(src).resize(12).webp({ quality: 45 }).toBuffer()

  out.push(
    [
      '  {',
      '    no: 0,',
      `    src: '/images/cutout/${plate.file}',`,
      `    width: ${width},`,
      `    height: ${height},`,
      `    view: '${plate.view}',`,
      `    title: '${plate.title}',`,
      `    note: '${plate.note}',`,
      `    alt: '${plate.alt}',`,
      '    blurDataURL:',
      `      'data:image/webp;base64,${blur.toString('base64')}',`,
      '  },',
    ].join('\n'),
  )
}

console.log(out.join('\n'))
