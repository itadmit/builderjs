'use client'

import dynamic from 'next/dynamic'

const VisualEditor = dynamic(
  () => import('@/components/Editor/VisualEditor'),
  { ssr: false }
)

interface PublicPageContentProps {
  content: any
}

export default function PublicPageContent({ content }: PublicPageContentProps) {
  return <VisualEditor initialValue={content} onChange={() => {}} readOnly />
}

