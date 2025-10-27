'use client'

import { PanelProps, PanelTab } from '../types'
import { useState } from 'react'
import { Settings, Palette, Layers } from 'lucide-react'
import ContentTab from './tabs/ContentTab'
import StyleTab from './tabs/StyleTab'
import AdvancedTab from './tabs/AdvancedTab'
import { findWidget } from '../utils'

export default function PropertiesPanel({
  selection,
  sections,
  viewport,
  onUpdate,
}: PanelProps) {
  const [activeTab, setActiveTab] = useState<PanelTab>('content')

  const getSelectionLabel = () => {
    if (!selection.id) return ''
    
    switch (selection.type) {
      case 'section':
        return 'סקשן'
      case 'column':
        return 'עמודה'
      case 'widget':
        const result = findWidget(sections, selection.id)
        if (result?.widget) {
          const typeLabels: Record<string, string> = {
            heading: 'כותרת',
            text: 'טקסט',
            button: 'כפתור',
            image: 'תמונה',
            video: 'וידאו',
            spacer: 'מרווח',
            divider: 'מפריד',
            icon: 'אייקון',
            accordion: 'אקורדיון',
            tabs: 'לשוניות',
            counter: 'מונה',
            progress: 'התקדמות',
            'social-icons': 'רשתות חברתיות',
            testimonial: 'המלצה',
            form: 'טופס',
          }
          return typeLabels[result.widget.type] || result.widget.type
        }
        return 'ווידג\'ט'
      default:
        return ''
    }
  }

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

  const selectionLabel = getSelectionLabel()

  return (
    <div className="w-80 border-r bg-white flex flex-col flex-shrink-0">
      {/* Header */}
      <div className="p-4 border-b bg-white sticky top-0 z-10">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-lg font-bold">מאפיינים</h2>
          {selectionLabel && (
            <>
              <span className="text-gray-300">|</span>
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                {selectionLabel}
              </span>
            </>
          )}
        </div>
        
        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          <button
            type="button"
            onClick={() => setActiveTab('content')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md transition-colors cursor-pointer ${
              activeTab === 'content'
                ? 'bg-white shadow-sm text-primary'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Settings className="w-4 h-4 pointer-events-none" />
            <span className="text-sm font-medium pointer-events-none">תוכן</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('style')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md transition-colors cursor-pointer ${
              activeTab === 'style'
                ? 'bg-white shadow-sm text-primary'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Palette className="w-4 h-4 pointer-events-none" />
            <span className="text-sm font-medium pointer-events-none">עיצוב</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('advanced')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md transition-colors cursor-pointer ${
              activeTab === 'advanced'
                ? 'bg-white shadow-sm text-primary'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Layers className="w-4 h-4 pointer-events-none" />
            <span className="text-sm font-medium pointer-events-none">מתקדם</span>
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

