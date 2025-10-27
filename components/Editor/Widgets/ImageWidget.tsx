'use client'

import { Widget, ImageContent, ViewportMode } from '../types'
import { useState } from 'react'

interface ImageWidgetProps {
  widget: Widget<ImageContent>
  viewport: ViewportMode
}

export default function ImageWidget({ widget, viewport }: ImageWidgetProps) {
  const { url, alt, link, caption, lightbox } = widget.content
  const [showLightbox, setShowLightbox] = useState(false)

  const imageElement = (
    <div className="widget-image relative">
      <img
        src={url}
        alt={alt || ''}
        className="w-full h-auto"
        onClick={(e) => {
          if (lightbox) {
            e.stopPropagation()
            setShowLightbox(true)
          }
        }}
      />
      {caption && (
        <p className="text-sm text-gray-600 mt-2 text-center">{caption}</p>
      )}
    </div>
  )

  const content = link ? (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {imageElement}
    </a>
  ) : (
    imageElement
  )

  return (
    <>
      {content}
      
      {showLightbox && lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowLightbox(false)}
        >
          <img src={url} alt={alt || ''} className="max-w-full max-h-full" />
        </div>
      )}
    </>
  )
}
