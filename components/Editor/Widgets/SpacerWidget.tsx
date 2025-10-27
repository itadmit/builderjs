'use client'

import { Widget, ViewportMode } from '../types'
import { getEffectiveStyles } from '../utils'
import { MoveVertical } from 'lucide-react'

interface SpacerWidgetProps {
  widget: Widget
  isSelected: boolean
  onClick: () => void
  viewportMode?: ViewportMode
}

export default function SpacerWidget({ widget, isSelected, onClick, viewportMode = 'desktop' }: SpacerWidgetProps) {
  const effectiveStyles = getEffectiveStyles(widget, viewportMode)
  const height = effectiveStyles.height || '40px'

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer transition-all relative ${
        isSelected ? 'ring-2 ring-primary ring-offset-2 bg-primary/5' : 'hover:ring-2 hover:ring-gray-300 hover:bg-gray-50'
      }`}
      style={{ height }}
    >
      {isSelected && (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500 gap-1">
          <MoveVertical className="w-3 h-3" />
          <span>רווח {height}</span>
        </div>
      )}
    </div>
  )
}

