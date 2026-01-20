import { createClient } from '@sanity/client'
import { ChapterProps } from '../types/chapter'
import { CourseProps } from '../types/course'

const client = createClient({
  projectId: process.env.EXPO_PUBLIC_SANITY_PROJECT_ID!,
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

export async function getCourses(): Promise<CourseProps[]> {
  return client.fetch(
    `*[_type == "curso"] | order(publishedAt desc) {
      ...,
      thumbnail{
        ...,
        asset->
      },
      capitulos[]->{
        ...,
        curso->
      }
    }`
  )
}

export async function getCourseBySlug(slug: string): Promise<CourseProps | null> {
  return client.fetch(
    `*[_type == "curso" && slug.current == $slug][0] {
      ...,
      thumbnail{
        ...,
        asset->
      },
      capitulos[]->{
        ...,
        curso->
      }
    }`,
    { slug }
  )
}

export async function getChapterBySlug(
  courseSlug: string,
  chapterSlug: string
): Promise<ChapterProps | null> {
  return client.fetch(
    `*[_type == "capitulo" && slug.current == $chapterSlug && curso->slug.current == $courseSlug][0]`,
    { courseSlug, chapterSlug }
  )
}

export async function getChaptersByCourseId(
  courseId: string
): Promise<ChapterProps[]> {
  return client.fetch(
    `*[_type == "capitulo" && curso._ref == $courseId] | order(orden asc)`,
    { courseId }
  )
}

export default client
