import { SanityDocumentBase, SanityImageAsset, SanitySlug } from './sanity'
import { ChapterReference } from './chapter'

export interface CourseProps extends SanityDocumentBase {
  _id: string
  _type: 'curso'
  titulo: string
  slug: SanitySlug
  descripcion?: string
  thumbnail?: SanityImageAsset
  tipo: 'gratis' | 'pago'
  duracion?: string
  capitulos?: ChapterReference[]
}

export type CourseType = 'gratis' | 'pago'
