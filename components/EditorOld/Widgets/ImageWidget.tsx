'use client'

import { Widget, ViewportMode } from '../types'
import { stylesToCSS, getEffectiveStyles } from '../utils'
import Image from 'next/image'

interface ImageWidgetProps {
  widget: Widget
  isSelected: boolean
  onClick: () => void
  viewportMode?: ViewportMode
}

export default function ImageWidget({ widget, isSelected, onClick, viewportMode = 'desktop' }: ImageWidgetProps) {
  const effectiveStyles = getEffectiveStyles(widget, viewportMode)
  const styles = stylesToCSS(effectiveStyles)

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-primary ring-offset-2' : 'hover:ring-2 hover:ring-gray-300'
      }`}
      style={styles}
    >
      <img
        src={widget.content?.url || 'https://via.placeholder.com/800x400'}
        alt={widget.content?.alt || 'תמונה'}
        className="w-full h-auto"
        style={{ borderRadius: effectiveStyles.borderRadius }}
      />
    </div>
  )
}

