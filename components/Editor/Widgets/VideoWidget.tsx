'use client'

import { Widget, VideoContent, ViewportMode } from '../types'

interface VideoWidgetProps {
  widget: Widget<VideoContent>
  viewport: ViewportMode
}

function getYoutubeEmbedUrl(url: string): string {
  const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
  return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : url
}

function getVimeoEmbedUrl(url: string): string {
  const videoId = url.match(/vimeo\.com\/(\d+)/)
  return videoId ? `https://player.vimeo.com/video/${videoId[1]}` : url
}

export default function VideoWidget({ widget, viewport }: VideoWidgetProps) {
  const { type, url, autoplay, muted, loop, controls } = widget.content

  if (!url) {
    return (
      <div className="widget-video bg-gray-100 p-8 text-center text-gray-500 rounded">
        הוסף קישור לוידאו
      </div>
    )
  }

  const getEmbedUrl = () => {
    let embedUrl = url
    if (type === 'youtube') {
      embedUrl = getYoutubeEmbedUrl(url)
    } else if (type === 'vimeo') {
      embedUrl = getVimeoEmbedUrl(url)
    }

    const params = new URLSearchParams()
    if (autoplay) params.append('autoplay', '1')
    if (muted) params.append('muted', '1')
    if (loop) params.append('loop', '1')
    if (controls === false) params.append('controls', '0')

    return `${embedUrl}?${params.toString()}`
  }

  if (type === 'direct') {
    return (
      <video
        className="widget-video w-full"
        src={url}
        autoPlay={autoplay}
        muted={muted}
        loop={loop}
        controls={controls !== false}
      />
    )
  }

  return (
    <div className="widget-video aspect-video">
      <iframe
        src={getEmbedUrl()}
        className="w-full h-full rounded"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
