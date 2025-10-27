'use client'

import { Widget, SocialIconsContent, ViewportMode } from '../types'
import { Facebook, Instagram, Twitter, Linkedin, Youtube, MessageCircle, Send } from 'lucide-react'

interface SocialIconsWidgetProps {
  widget: Widget<SocialIconsContent>
  viewport: ViewportMode
}

const ICONS = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
  whatsapp: MessageCircle,
  telegram: Send,
  tiktok: () => <span>TikTok</span>,
  pinterest: () => <span>Pin</span>,
}

export default function SocialIconsWidget({ widget, viewport }: SocialIconsWidgetProps) {
  const { icons, style, size } = widget.content

  const sizeClass = {
    small: 'w-8 h-8',
    medium: 'w-10 h-10',
    large: 'w-12 h-12',
  }[size]

  const styleClass = {
    default: 'hover:opacity-70',
    rounded: 'rounded-lg hover:opacity-70',
    square: 'hover:opacity-70',
    circle: 'rounded-full hover:opacity-70',
  }[style]

  return (
    <div className="widget-social-icons flex items-center justify-center gap-3">
      {icons.map((icon, index) => {
        const Icon = ICONS[icon.platform]
        return (
          <a
            key={index}
            href={icon.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center ${sizeClass} ${styleClass} bg-gray-800 text-white transition-all`}
          >
            <Icon className="w-5 h-5" />
          </a>
        )
      })}
    </div>
  )
}

