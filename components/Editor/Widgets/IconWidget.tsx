'use client'

import { Widget, ViewportMode } from '../types'
import { stylesToCSS, getEffectiveStyles } from '../utils'

interface IconWidgetProps {
  widget: Widget
  isSelected: boolean
  onClick: () => void
  viewportMode?: ViewportMode
}

export default function IconWidget({ widget, isSelected, onClick, viewportMode = 'desktop' }: IconWidgetProps) {
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
      <div>{widget.content?.icon || '⭐'}</div>
    </div>
  )
}

