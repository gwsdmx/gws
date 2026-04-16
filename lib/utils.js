import { clsx } from 'clsx'
export function cn(...inputs) { return clsx(inputs) }
export function getStorageUrl(path) {
  if (!path) return null
  if (path.startsWith('http')) return path
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media/${path}`
}
