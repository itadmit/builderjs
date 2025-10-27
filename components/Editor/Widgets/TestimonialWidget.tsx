'use client'

import { Widget, TestimonialContent, ViewportMode } from '../types'
import { Star, Quote } from 'lucide-react'

interface TestimonialWidgetProps {
  widget: Widget<TestimonialContent>
  viewport: ViewportMode
}

export default function TestimonialWidget({ widget, viewport }: TestimonialWidgetProps) {
  const { text, author, role, image, rating } = widget.content

  return (
    <div className="widget-testimonial">
      <Quote className="w-10 h-10 text-blue-500 mb-4" />
      
      <p className="text-lg mb-4 italic">{text}</p>

      {rating && (
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      )}

      <div className="flex items-center gap-3">
        {image && (
          <img src={image} alt={author} className="w-12 h-12 rounded-full object-cover" />
        )}
        <div>
          <p className="font-semibold">{author}</p>
          {role && <p className="text-sm text-gray-600">{role}</p>}
        </div>
      </div>
    </div>
  )
}

