import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// המרת טקסט עברית ל-slug לטיני
export function slugify(text: string): string {
  const hebrewToLatin: { [key: string]: string } = {
    'א': 'a', 'ב': 'b', 'ג': 'g', 'ד': 'd', 'ה': 'h', 'ו': 'v', 'ז': 'z',
    'ח': 'ch', 'ט': 't', 'י': 'y', 'כ': 'k', 'ך': 'k', 'ל': 'l', 'ם': 'm',
    'מ': 'm', 'ן': 'n', 'נ': 'n', 'ס': 's', 'ע': 'a', 'פ': 'p', 'ף': 'p',
    'צ': 'tz', 'ץ': 'tz', 'ק': 'k', 'ר': 'r', 'ש': 'sh', 'ת': 't'
  }
  
  return text
    .split('')
    .map(char => hebrewToLatin[char] || char)
    .join('')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// פונקציה ליצירת slug ייחודי
export function generateUniqueSlug(title: string, existingSlugs: string[] = []): string {
  let slug = slugify(title)
  let counter = 1
  
  while (existingSlugs.includes(slug)) {
    slug = `${slugify(title)}-${counter}`
    counter++
  }
  
  return slug
}

