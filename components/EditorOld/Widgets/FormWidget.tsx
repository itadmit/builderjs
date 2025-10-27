'use client'

import { Widget, ViewportMode } from '../types'
import { stylesToCSS, getEffectiveStyles } from '../utils'

interface FormWidgetProps {
  widget: Widget
  isSelected: boolean
  onClick: () => void
  viewportMode?: ViewportMode
}

export default function FormWidget({ widget, isSelected, onClick, viewportMode = 'desktop' }: FormWidgetProps) {
  const effectiveStyles = getEffectiveStyles(widget, viewportMode)
  const containerStyle = stylesToCSS(effectiveStyles)
  const fields = widget.content?.fields || ['name', 'email', 'phone', 'message']
  const submitText = widget.content?.submitText || 'שלח'

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-primary ring-offset-2' : 'hover:ring-2 hover:ring-gray-300'
      }`}
      style={containerStyle}
    >
      <div className="bg-gray-50 border rounded-lg p-6 space-y-4">
        <h3 className="text-xl font-bold text-right">צור קשר</h3>
        
        {fields.includes('name') && (
          <input
            type="text"
            placeholder="שם מלא"
            className="w-full px-4 py-2 border rounded-lg"
            disabled
          />
        )}
        
        {fields.includes('email') && (
          <input
            type="email"
            placeholder="אימייל"
            className="w-full px-4 py-2 border rounded-lg"
            disabled
          />
        )}
        
        {fields.includes('phone') && (
          <input
            type="tel"
            placeholder="טלפון"
            className="w-full px-4 py-2 border rounded-lg"
            disabled
          />
        )}
        
        {fields.includes('message') && (
          <textarea
            placeholder="הודעה"
            rows={4}
            className="w-full px-4 py-2 border rounded-lg"
            disabled
          />
        )}
        
        <button
          type="button"
          className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          disabled
        >
          {submitText}
        </button>
      </div>
    </div>
  )
}

