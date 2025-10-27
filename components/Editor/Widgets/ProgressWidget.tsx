'use client'

import { Widget, ProgressContent, ViewportMode } from '../types'

interface ProgressWidgetProps {
  widget: Widget<ProgressContent>
  viewport: ViewportMode
}

export default function ProgressWidget({ widget, viewport }: ProgressWidgetProps) {
  const { value, label, showPercentage } = widget.content

  return (
    <div className="widget-progress">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">{label}</span>
          {showPercentage && <span className="text-sm text-gray-600">{value}%</span>}
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-500"
          style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
        />
      </div>
    </div>
  )
}

