'use client'

import { Widget, ViewportMode } from '../types'

interface DividerWidgetProps {
  widget: Widget
  viewport: ViewportMode
}

export default function DividerWidget({ widget, viewport }: DividerWidgetProps) {
  return <hr className="widget-divider" />
}
