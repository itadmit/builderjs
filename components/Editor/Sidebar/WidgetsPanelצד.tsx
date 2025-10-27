'use client'

import { WIDGET_DEFINITIONS } from '../constants'
import { WidgetType } from '../types'
import * as Icons from 'lucide-react'

interface WidgetsPanelProps {
  onAddWidget: (type: WidgetType) => void
}

export default function WidgetsPanel({ onAddWidget }: WidgetsPanelProps) {
  const categories = {
    basic: 'בסיסי',
    media: 'מדיה',
    form: 'טפסים',
    layout: 'פריסה',
  }

  const widgetsByCategory = WIDGET_DEFINITIONS.reduce((acc, widget) => {
    if (!acc[widget.category]) {
      acc[widget.category] = []
    }
    acc[widget.category].push(widget)
    return acc
  }, {} as Record<string, typeof WIDGET_DEFINITIONS>)

  return (
    <div className="h-full overflow-y-auto p-4 space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-2">הוסף אלמנט</h3>
        <p className="text-sm text-gray-600 mb-4">
          גרור אלמנט לעמוד או לחץ להוספה
        </p>
      </div>

      {Object.entries(categories).map(([key, label]) => (
        <div key={key}>
          <h4 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b">
            {label}
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {widgetsByCategory[key]?.map((widget) => {
              const IconComponent = (Icons as any)[widget.icon]
              return (
                <button
                  key={widget.type}
                  onClick={() => onAddWidget(widget.type)}
                  className="flex flex-col items-center gap-2 p-3 border rounded-lg hover:border-primary hover:bg-primary/5 transition-all group"
                >
                  {IconComponent && (
                    <IconComponent className="w-6 h-6 group-hover:scale-110 transition-transform text-primary" />
                  )}
                  <span className="text-xs font-medium">{widget.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

