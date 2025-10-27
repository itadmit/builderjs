'use client'

import { Widget, ViewportMode } from '../types'
import { Columns } from 'lucide-react'

interface ContainerWidgetProps {
  widget: Widget
  isSelected: boolean
  onClick: () => void
  viewportMode?: ViewportMode
}

const stylesToCSS = (styles: any, viewportMode: ViewportMode = 'desktop'): React.CSSProperties => {
  // Use responsive styles if in mobile mode
  const effectiveStyles = viewportMode === 'mobile' && styles?.mobile 
    ? { ...styles, ...styles.mobile }
    : styles

  return {
    backgroundColor: effectiveStyles?.backgroundColor,
    paddingTop: effectiveStyles?.paddingTop ? `${effectiveStyles.paddingTop}px` : undefined,
    paddingBottom: effectiveStyles?.paddingBottom ? `${effectiveStyles.paddingBottom}px` : undefined,
    paddingLeft: effectiveStyles?.paddingLeft ? `${effectiveStyles.paddingLeft}px` : undefined,
    paddingRight: effectiveStyles?.paddingRight ? `${effectiveStyles.paddingRight}px` : undefined,
    marginTop: effectiveStyles?.marginTop ? `${effectiveStyles.marginTop}px` : undefined,
    marginBottom: effectiveStyles?.marginBottom ? `${effectiveStyles.marginBottom}px` : undefined,
    borderRadius: effectiveStyles?.borderRadius ? `${effectiveStyles.borderRadius}px` : undefined,
    borderWidth: effectiveStyles?.borderWidth ? `${effectiveStyles.borderWidth}px` : undefined,
    borderColor: effectiveStyles?.borderColor,
    borderStyle: effectiveStyles?.borderWidth ? 'solid' : undefined,
  }
}

export default function ContainerWidget({ 
  widget, 
  isSelected, 
  onClick,
  viewportMode = 'desktop'
}: ContainerWidgetProps) {
  const containerStyle = stylesToCSS(widget.styles, viewportMode)
  const columns = widget.content?.columns || 2
  const gap = widget.content?.gap || 16
  const items = widget.content?.items || []

  // במצב מובייל - הצג עמודה אחת
  const displayColumns = viewportMode === 'mobile' ? 1 : columns

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer transition-all relative ${
        isSelected 
          ? 'ring-2 ring-primary ring-offset-2' 
          : 'hover:ring-2 hover:ring-gray-300'
      }`}
      style={containerStyle}
    >
      <div 
        className="grid min-h-[120px]"
        style={{ 
          gridTemplateColumns: `repeat(${displayColumns}, 1fr)`,
          gap: `${gap}px`
        }}
      >
        {items.length > 0 ? (
          items.map((item: any, index: number) => (
            <div
              key={index}
              className={`rounded-lg p-6 ${
                isSelected 
                  ? 'border-2 border-primary bg-primary/5' 
                  : 'border-2 border-dashed border-gray-300 bg-gray-50/50'
              }`}
              style={{
                backgroundColor: item.backgroundColor,
                textAlign: item.textAlign || 'right',
              }}
            >
              {item.content ? (
                <div 
                  className="prose prose-sm max-w-none text-right"
                  style={{ 
                    whiteSpace: 'pre-wrap',
                    direction: 'rtl'
                  }}
                >
                  {item.content.split('\n').map((line: string, i: number) => (
                    <p key={i} className="mb-2 last:mb-0">
                      {line || '\u00A0'}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-400 py-4">
                  <p className="text-sm">עמודה {index + 1}</p>
                  <p className="text-xs mt-1">הוסף תוכן בפאנל התוכן</p>
                </div>
              )}
            </div>
          ))
        ) : (
          // Empty state
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-400">
            <Columns className="w-12 h-12 mb-2" />
            <p className="text-sm">לא הוגדרו עמודות</p>
          </div>
        )}
      </div>
      
      {viewportMode === 'mobile' && columns > 1 && (
        <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
          תצוגה מובייל: עמודה אחת
        </div>
      )}
    </div>
  )
}
