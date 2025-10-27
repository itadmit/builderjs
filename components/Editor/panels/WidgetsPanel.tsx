'use client'

import { Section } from '../types'
import { SECTION_TEMPLATES } from '../utils'
import { WIDGET_DEFINITIONS } from '../utils/widgetDefinitions'
import { useDraggable } from '@dnd-kit/core'
import * as Icons from 'lucide-react'
import { useState } from 'react'

interface WidgetsPanelProps {
  onAddSection: (columnCount: Section['columnCount'], layout?: Section['layout']) => void
}

function DraggableWidget({ type, label, icon }: { type: string; label: string; icon: string }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `new-widget-${type}`,
    data: {
      type: 'new-widget',
      widgetType: type,
    },
  })

  const IconComponent = (Icons as any)[icon]

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex flex-col items-center gap-2 p-3 border-2 rounded-lg hover:border-primary hover:bg-primary/5 transition-all cursor-move group ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      {IconComponent && (
        <IconComponent className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
      )}
      <span className="text-xs font-medium text-center">{label}</span>
    </div>
  )
}

export default function WidgetsPanel({ onAddSection }: WidgetsPanelProps) {
  const [activeTab, setActiveTab] = useState<'sections' | 'widgets'>('sections')
  const [search, setSearch] = useState('')

  const categories = {
    basic: 'בסיסי',
    media: 'מדיה',
    interactive: 'אינטראקטיבי',
    layout: 'פריסה',
    form: 'טפסים',
  }

  const filteredWidgets = WIDGET_DEFINITIONS.filter((w) =>
    w.label.includes(search)
  )

  const widgetsByCategory = filteredWidgets.reduce((acc, widget) => {
    if (!acc[widget.category]) acc[widget.category] = []
    acc[widget.category].push(widget)
    return acc
  }, {} as Record<string, typeof WIDGET_DEFINITIONS>)

  return (
    <div className="w-80 border-l bg-white flex flex-col flex-shrink-0">
      {/* Header */}
      <div className="p-4 border-b sticky top-0 bg-white z-10">
        <h2 className="text-lg font-bold mb-3">הוסף אלמנט</h2>
        
        {/* Tabs */}
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setActiveTab('sections')}
            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'sections'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            סקשנים
          </button>
          <button
            onClick={() => setActiveTab('widgets')}
            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'widgets'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ווידג'טים
          </button>
        </div>

        {/* Search */}
        {activeTab === 'widgets' && (
          <input
            type="text"
            placeholder="חפש ווידג'ט..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'sections' ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">
              בחר פריסת עמודות לסקשן החדש
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              {SECTION_TEMPLATES.map((template) => {
                const IconComponent = (Icons as any)[template.icon]
                return (
                  <button
                    key={template.id}
                    onClick={() => onAddSection(template.columnCount, template.layout)}
                    className="flex flex-col items-center gap-2 p-4 border-2 rounded-lg hover:border-primary hover:bg-primary/5 transition-all group"
                  >
                    {IconComponent && (
                      <IconComponent className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                    )}
                    <span className="text-xs font-medium text-center">
                      {template.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(categories).map(([key, label]) => {
              const categoryWidgets = widgetsByCategory[key] || []
              if (categoryWidgets.length === 0) return null

              return (
                <div key={key}>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b">
                    {label}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categoryWidgets.map((widget) => (
                      <DraggableWidget
                        key={widget.type}
                        type={widget.type}
                        label={widget.label}
                        icon={widget.icon}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

