'use client'

import { Section, EditorSelection, ViewportMode } from '../types'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import SectionRenderer from '../renderers/SectionRenderer'
import { FileText } from 'lucide-react'

interface CanvasProps {
  sections: Section[]
  selection: EditorSelection
  viewport: ViewportMode
  onSelectSection: (id: string) => void
  onSelectColumn: (id: string, sectionId: string) => void
  onSelectWidget: (id: string, columnId: string, sectionId: string) => void
  onDeleteSection: (id: string) => void
  onDeleteWidget: (widgetId: string, columnId: string, sectionId: string) => void
  onDuplicateSection: (id: string) => void
}

export default function Canvas({
  sections,
  selection,
  viewport,
  onSelectSection,
  onSelectColumn,
  onSelectWidget,
  onDeleteSection,
  onDeleteWidget,
  onDuplicateSection,
}: CanvasProps) {
  const handleBackgroundClick = () => {
    onSelectSection('')
  }

  return (
    <div
      className={`flex-1 overflow-y-auto bg-gray-100 ${
        viewport === 'mobile' ? 'flex justify-center p-4' : ''
      }`}
      onClick={handleBackgroundClick}
    >
      <div
        className={`${
          viewport === 'desktop'
            ? 'w-full min-h-full'
            : viewport === 'tablet'
            ? 'w-[768px] min-h-screen bg-white shadow-2xl'
            : 'w-[375px] min-h-screen bg-white shadow-2xl'
        }`}
      >
        {sections.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-screen text-gray-400 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="relative mb-6">
                <FileText className="w-24 h-24 mx-auto opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-dashed border-primary/30 rounded-lg animate-pulse"></div>
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-3 text-gray-700">התחל לבנות! 🎨</h3>
              <p className="text-lg text-gray-500 max-w-md px-4 mb-6">
                גרור <span className="font-bold text-primary">סקשן</span> מהפאנל בצד ימין או <span className="font-bold text-primary">ווידג'ט</span> ישירות לכאן
              </p>
              <div className="flex gap-4 justify-center text-sm">
                <div className="px-4 py-2 bg-white rounded-lg shadow-sm">
                  <span className="font-medium">1.</span> בחר סקשן
                </div>
                <div className="px-4 py-2 bg-white rounded-lg shadow-sm">
                  <span className="font-medium">2.</span> גרור ווידג'טים
                </div>
                <div className="px-4 py-2 bg-white rounded-lg shadow-sm">
                  <span className="font-medium">3.</span> עצב
                </div>
              </div>
            </div>
          </div>
        ) : (
          <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-6 p-8">
              {sections.map((section) => (
                <SectionRenderer
                  key={section.id}
                  section={section}
                  isSelected={selection.type === 'section' && selection.id === section.id}
                  onSelect={() => onSelectSection(section.id)}
                  onDelete={() => onDeleteSection(section.id)}
                  onDuplicate={() => onDuplicateSection(section.id)}
                  onSelectWidget={onSelectWidget}
                  onDeleteWidget={onDeleteWidget}
                  onSelectColumn={(columnId) => onSelectColumn(columnId, section.id)}
                  selectedWidgetId={selection.type === 'widget' ? selection.id || undefined : undefined}
                  selectedColumnId={selection.type === 'column' ? selection.id || undefined : undefined}
                  viewport={viewport}
                />
              ))}
            </div>
          </SortableContext>
        )}
      </div>
    </div>
  )
}

