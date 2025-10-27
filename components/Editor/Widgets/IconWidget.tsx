'use client'

import { Widget, ViewportMode } from '../types'

interface IconWidgetProps {
  widget: Widget<{ icon: string }>
  viewport: ViewportMode
}

export default function IconWidget({ widget, viewport }: IconWidgetProps) {
  const { icon } = widget.content

  return (
    <div className="widget-icon flex items-center justify-center">
      <span className="text-4xl">{icon}</span>
    </div>
  )
}
