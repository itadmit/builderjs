'use client'

import { Widget, HeadingContent, ViewportMode } from '../types'

interface HeadingWidgetProps {
  widget: Widget<HeadingContent>
  viewport: ViewportMode
}

export default function HeadingWidget({ widget, viewport }: HeadingWidgetProps) {
  const { text, tag } = widget.content
  const Tag = tag || 'h2'

  return <Tag className="widget-heading">{text}</Tag>
}
