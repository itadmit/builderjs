'use client'

import { Widget, ViewportMode } from '../types'
import { stylesToCSS, getEffectiveStyles } from '../utils'

interface ButtonWidgetProps {
  widget: Widget
  isSelected: boolean
  onClick: () => void
  viewportMode?: ViewportMode
}

export default function ButtonWidget({ widget, isSelected, onClick, viewportMode = 'desktop' }: ButtonWidgetProps) {
  const effectiveStyles = getEffectiveStyles(widget, viewportMode)
  
  const containerStyle: React.CSSProperties = {
    textAlign: effectiveStyles.textAlign || 'center',
    marginTop: effectiveStyles.marginTop,
    marginBottom: effectiveStyles.marginBottom,
  }

  const buttonStyle = stylesToCSS({
    ...effectiveStyles,
    marginTop: undefined,
    marginBottom: undefined,
    textAlign: undefined,
  })

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-primary ring-offset-2' : 'hover:ring-2 hover:ring-gray-300'
      }`}
      style={containerStyle}
    >
      <button
        style={buttonStyle}
        className="inline-block transition-transform hover:scale-105"
      >
        {widget.content?.text || 'כפתור'}
      </button>
    </div>
  )
}

