'use client'

interface MobileIndicatorProps {
  hasMobileValue: boolean
}

export default function MobileIndicator({ hasMobileValue }: MobileIndicatorProps) {
  if (!hasMobileValue) return null

  return (
    <span
      className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"
      title="ערך שונה למובייל"
    />
  )
}

