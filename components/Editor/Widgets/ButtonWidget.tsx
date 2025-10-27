'use client'

import { Widget, ButtonContent, ViewportMode } from '../types'
import { ExternalLink } from 'lucide-react'

interface ButtonWidgetProps {
  widget: Widget<ButtonContent>
  viewport: ViewportMode
}

export default function ButtonWidget({ widget, viewport }: ButtonWidgetProps) {
  const { text, url, openInNewTab, icon, iconPosition } = widget.content

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (url && url !== '#') {
      if (openInNewTab) {
        window.open(url, '_blank', 'noopener,noreferrer')
      } else {
        window.location.href = url
      }
    }
  }

  return (
    <button
      className="widget-button inline-flex items-center justify-center gap-2"
      onClick={handleClick}
    >
      {icon && iconPosition === 'left' && <span>{icon}</span>}
      <span>{text}</span>
      {icon && iconPosition === 'right' && <span>{icon}</span>}
      {openInNewTab && <ExternalLink className="w-4 h-4" />}
    </button>
  )
}
