'use client'

import { Widget, ViewportMode } from '../types'
import WidgetRenderer from '../Widgets/WidgetRenderer'
import { GripVertical, Trash2, FileText } from 'lucide-react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface CanvasProps {
  widgets: Widget[]
  selectedWidgetId: string | null
  onSelectWidget: (widgetId: string | null) => void
  onReorderWidgets: (widgets: Widget[]) => void
  onDeleteWidget: (widgetId: string) => void
  viewportMode?: ViewportMode
}

function SortableWidget({
  widget,
  isSelected,
  onSelect,
  onDelete,
  viewportMode = 'desktop',
}: {
  widget: Widget
  isSelected: boolean
  onSelect: () => void
  onDelete: () => void
  viewportMode?: ViewportMode
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: widget.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className={`absolute -right-10 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center cursor-move opacity-0 group-hover:opacity-100 transition-opacity z-10 ${
          isSelected ? 'opacity-100' : ''
        }`}
      >
        <GripVertical className="w-4 h-4" />
      </div>

      {/* Delete Button */}
      {isSelected && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            if (confirm('האם אתה בטוח שברצונך למחוק אלמנט זה?')) {
              onDelete()
            }
          }}
          className="absolute -left-10 top-1/2 -translate-y-1/2 w-8 h-8 bg-red-500 text-white rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors z-10"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}

      <WidgetRenderer widget={widget} isSelected={isSelected} onClick={onSelect} viewportMode={viewportMode} />
    </div>
  )
}

export default function Canvas({
  widgets,
  selectedWidgetId,
  onSelectWidget,
  onReorderWidgets,
  onDeleteWidget,
  viewportMode = 'desktop',
}: CanvasProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = widgets.findIndex((w) => w.id === active.id)
      const newIndex = widgets.findIndex((w) => w.id === over.id)
      onReorderWidgets(arrayMove(widgets, oldIndex, newIndex))
    }
  }

  return (
    <div
      className="flex-1 bg-gray-50 overflow-y-auto p-8"
      onClick={(e) => {
        // Deselect when clicking on canvas background
        if (e.target === e.currentTarget) {
          onSelectWidget(null)
        }
      }}
    >
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 min-h-screen">
        {widgets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <FileText className="w-16 h-16 mb-4" />
            <h3 className="text-xl font-semibold mb-2">הדף ריק</h3>
            <p className="text-center max-w-md">
              התחל לבנות את הדף שלך על ידי הוספת אלמנטים מהפאנל בצד ימין
            </p>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={widgets.map((w) => w.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-4">
                {widgets.map((widget) => (
                  <SortableWidget
                    key={widget.id}
                    widget={widget}
                    isSelected={selectedWidgetId === widget.id}
                    onSelect={() => onSelectWidget(widget.id)}
                    onDelete={() => onDeleteWidget(widget.id)}
                    viewportMode={viewportMode}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  )
}

