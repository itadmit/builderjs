'use client'

import { Widget, ViewportMode } from '../types'
import { getEffectiveStyles } from '../utils'

interface DividerWidgetProps {
  widget: Widget
  isSelected: boolean
  onClick: () => void
  viewportMode?: ViewportMode
}

export default function DividerWidget({ widget, isSelected, onClick, viewportMode = 'desktop' }: DividerWidgetProps) {
  const effectiveStyles = getEffectiveStyles(widget, viewportMode)
  
  const styles: React.CSSProperties = {
    marginTop: effectiveStyles.marginTop,
    marginBottom: effectiveStyles.marginBottom,
    borderTopWidth: effectiveStyles.borderWidth || 1,
    borderTopColor: effectiveStyles.borderColor || '#e2e8f0',
    borderTopStyle: 'solid',
  }

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-primary ring-offset-2' : 'hover:ring-2 hover:ring-gray-300'
      }`}
      style={styles}
    />
  )
}

