'use client'

import { Widget, ViewportMode } from '../types'

interface SpacerWidgetProps {
  widget: Widget
  viewport: ViewportMode
}

export default function SpacerWidget({ widget, viewport }: SpacerWidgetProps) {
  return <div className="widget-spacer" />
}
