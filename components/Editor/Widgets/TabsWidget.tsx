'use client'

import { Widget, TabsContent, ViewportMode } from '../types'
import { useState } from 'react'

interface TabsWidgetProps {
  widget: Widget<TabsContent>
  viewport: ViewportMode
}

export default function TabsWidget({ widget, viewport }: TabsWidgetProps) {
  const { items, activeTab: initialTab } = widget.content
  const [activeTab, setActiveTab] = useState(initialTab || items[0]?.id)

  const activeItem = items.find((item) => item.id === activeTab) || items[0]

  return (
    <div className="widget-tabs">
      {/* Tab Headers */}
      <div className="flex border-b">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === item.id
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {item.icon && <span className="ml-2">{item.icon}</span>}
            {item.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        <div className="whitespace-pre-wrap">{activeItem?.content}</div>
      </div>
    </div>
  )
}

