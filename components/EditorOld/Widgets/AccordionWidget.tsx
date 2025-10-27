'use client'

import { Widget, ViewportMode } from '../types'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface AccordionWidgetProps {
  widget: Widget
  isSelected: boolean
  onClick: () => void
  viewportMode?: ViewportMode
}

const stylesToCSS = (styles: any, viewportMode: ViewportMode = 'desktop'): React.CSSProperties => {
  const effectiveStyles = viewportMode === 'mobile' && styles?.mobile 
    ? { ...styles, ...styles.mobile }
    : styles

  return {
    marginTop: effectiveStyles?.marginTop ? `${effectiveStyles.marginTop}px` : undefined,
    marginBottom: effectiveStyles?.marginBottom ? `${effectiveStyles.marginBottom}px` : undefined,
  }
}

export default function AccordionWidget({ 
  widget, 
  isSelected, 
  onClick,
  viewportMode = 'desktop'
}: AccordionWidgetProps) {
  const [openItems, setOpenItems] = useState<number[]>([0])
  const containerStyle = stylesToCSS(widget.styles, viewportMode)
  
  const items = widget.content?.items || [
    { title: 'פריט 1', content: 'תוכן פריט 1' },
    { title: 'פריט 2', content: 'תוכן פריט 2' },
    { title: 'פריט 3', content: 'תוכן פריט 3' },
  ]

  const toggleItem = (index: number) => {
    if (widget.content?.allowMultiple) {
      setOpenItems(prev => 
        prev.includes(index) 
          ? prev.filter(i => i !== index)
          : [...prev, index]
      )
    } else {
      setOpenItems(prev => 
        prev.includes(index) ? [] : [index]
      )
    }
  }

  const borderColor = widget.styles?.borderColor || '#e2e8f0'
  const backgroundColor = widget.styles?.backgroundColor || '#ffffff'
  const titleColor = widget.styles?.color || '#1a1a1a'

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer transition-all ${
        isSelected 
          ? 'ring-2 ring-primary ring-offset-2' 
          : 'hover:ring-2 hover:ring-gray-300'
      }`}
      style={containerStyle}
    >
      <div className="space-y-2">
        {items.map((item: any, index: number) => {
          const isOpen = openItems.includes(index)
          
          return (
            <div
              key={index}
              className="border rounded-lg overflow-hidden"
              style={{
                borderColor,
                backgroundColor,
              }}
            >
              {/* Header */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleItem(index)
                }}
                className="w-full px-4 py-3 flex items-center justify-between text-right hover:bg-gray-50 transition-colors"
                style={{ color: titleColor }}
              >
                <span className="font-medium">{item.title}</span>
                <ChevronDown 
                  className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Content */}
              {isOpen && (
                <div 
                  className="px-4 py-3 border-t"
                  style={{ 
                    borderColor,
                    color: widget.styles?.color || '#4a5568',
                  }}
                >
                  <p className="whitespace-pre-wrap">{item.content}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

