import { SanityDocumentBase, SanityReference, SanitySlug } from './sanity'

export interface ChapterProps extends SanityDocumentBase {
  _id: string
  _type: 'capitulo'
  titulo: string
  slug: SanitySlug
  descripcion?: string
  videoUrl: string
  curso: SanityReference
  orden: number
}

export interface ChapterReference {
  _ref: string
  _type: 'reference'
}
