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
          <div className="flex flex-col items-center justify-center min-h-screen text-gray-400">
            <FileText className="w-20 h-20 mb-4" />
            <h3 className="text-2xl font-bold mb-2">הדף ריק</h3>
            <p className="text-center max-w-md px-4">
              התחל לבנות את הדף שלך על ידי הוספת סקשן מהפאנל בצד ימין
            </p>
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

