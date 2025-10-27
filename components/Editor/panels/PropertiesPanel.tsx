'use client'

import { PanelProps, PanelTab } from '../types'
import { useState } from 'react'
import { Settings, Palette, Layers } from 'lucide-react'
import ContentTab from './tabs/ContentTab'
import StyleTab from './tabs/StyleTab'
import AdvancedTab from './tabs/AdvancedTab'

export default function PropertiesPanel({
  selection,
  sections,
  viewport,
  onUpdate,
}: PanelProps) {
  const [activeTab, setActiveTab] = useState<PanelTab>('content')

  if (!selection.id) {
    return (
      <div className="w-80 border-r bg-gray-50 flex flex-col flex-shrink-0">
        <div className="h-full flex items-center justify-center p-6 text-center text-gray-500">
          <div>
            <Layers className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium mb-2">בחר אלמנט</p>
            <p className="text-sm">
              לחץ על סקשן, עמודה או widget כדי לערוך את המאפיינים
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-80 border-r bg-white flex flex-col flex-shrink-0">
      {/* Header */}
      <div className="p-4 border-b bg-white sticky top-0 z-10">
        <h2 className="text-lg font-bold mb-3">מאפיינים</h2>
        
        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('content')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md transition-colors ${
              activeTab === 'content'
                ? 'bg-white shadow-sm text-primary'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span className="text-sm font-medium">תוכן</span>
          </button>
          <button
            onClick={() => setActiveTab('style')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md transition-colors ${
              activeTab === 'style'
                ? 'bg-white shadow-sm text-primary'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span className="text-sm font-medium">עיצוב</span>
          </button>
          <button
            onClick={() => setActiveTab('advanced')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md transition-colors ${
              activeTab === 'advanced'
                ? 'bg-white shadow-sm text-primary'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span className="text-sm font-medium">מתקדם</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'content' && (
          <ContentTab
            selection={selection}
            sections={sections}
            viewport={viewport}
            onUpdate={onUpdate}
          />
        )}
        {activeTab === 'style' && (
          <StyleTab
            selection={selection}
            sections={sections}
            viewport={viewport}
            onUpdate={onUpdate}
          />
        )}
        {activeTab === 'advanced' && (
          <AdvancedTab
            selection={selection}
            sections={sections}
            viewport={viewport}
            onUpdate={onUpdate}
          />
        )}
      </div>
    </div>
  )
}

