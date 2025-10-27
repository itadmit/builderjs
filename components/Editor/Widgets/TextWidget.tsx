'use client'

import { Widget, TextContent, ViewportMode } from '../types'

interface TextWidgetProps {
  widget: Widget<TextContent>
  viewport: ViewportMode
}

export default function TextWidget({ widget, viewport }: TextWidgetProps) {
  const { text, html } = widget.content

  if (html) {
    return (
      <div
        className="widget-text prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }

  return (
    <div className="widget-text whitespace-pre-wrap">
      {text}
    </div>
  )
}
