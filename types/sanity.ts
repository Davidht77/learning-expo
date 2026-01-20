export interface SanityImageAsset {
  _type: 'image'
  asset: {
    _type: 'reference'
    _ref: string
    _id: string
    url: string
    originalFilename: string
    metadata: {
      dimensions: {
        width: number
        height: number
        aspectRatio: number
      }
    }
  }
  alt?: string
  caption?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export interface SanitySlug {
  _type: 'slug'
  current: string
}

export interface SanityReference {
  _ref: string
  _type: 'reference'
  _id?: never
}

export interface SanityDocumentBase {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}
