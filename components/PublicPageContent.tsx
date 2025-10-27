'use client'

import dynamic from 'next/dynamic'

const VisualEditor = dynamic(
  () => import('@/components/Editor'),
  { ssr: false }
).then(mod => mod.VisualEditor)

interface PublicPageContentProps {
  content: any
}

export default function PublicPageContent({ content }: PublicPageContentProps) {
  return <VisualEditor initialValue={content} onChange={() => {}} readOnly />
}

