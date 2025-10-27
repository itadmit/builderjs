'use client'

import { Widget, ViewportMode } from '../types'
import { stylesToCSS, getYouTubeEmbedUrl, getVimeoEmbedUrl, getEffectiveStyles } from '../utils'
import { Video } from 'lucide-react'

interface VideoWidgetProps {
  widget: Widget
  isSelected: boolean
  onClick: () => void
  viewportMode?: ViewportMode
}

export default function VideoWidget({ widget, isSelected, onClick, viewportMode = 'desktop' }: VideoWidgetProps) {
  const effectiveStyles = getEffectiveStyles(widget, viewportMode)
  const styles = stylesToCSS(effectiveStyles)
  
  const getEmbedUrl = () => {
    const url = widget.content?.url || ''
    if (!url) return ''
    
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return getYouTubeEmbedUrl(url)
    }
    if (url.includes('vimeo.com')) {
      return getVimeoEmbedUrl(url)
    }
    return url
  }

  const embedUrl = getEmbedUrl()

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-primary ring-offset-2' : 'hover:ring-2 hover:ring-gray-300'
      }`}
      style={styles}
    >
      {embedUrl ? (
        <div className="relative" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={embedUrl}
            className="absolute top-0 left-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ borderRadius: effectiveStyles.borderRadius }}
          />
        </div>
      ) : (
        <div className="aspect-video bg-gray-200 flex items-center justify-center text-gray-500">
          <div className="text-center flex flex-col items-center gap-2">
            <Video className="w-12 h-12" />
            <p>הוסף קישור לוידאו</p>
          </div>
        </div>
      )}
    </div>
  )
}

