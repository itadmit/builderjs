'use client'

import { Section, Column, Widget, ViewportMode } from '../types'
import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash2, Copy, Settings, Columns as ColumnsIcon, Plus } from 'lucide-react'
import { stylesToCSS, getColumnWidths, shouldHide } from '../utils'
import WidgetRenderer from './WidgetRenderer'

interface SectionRendererProps {
  section: Section
  isSelected: boolean
  onSelect: () => void
  onDelete: () => void
  onDuplicate: () => void
  onSelectWidget: (widgetId: string, columnId: string) => void
  onDeleteWidget: (widgetId: string, columnId: string) => void
  onSelectColumn: (columnId: string) => void
  selectedWidgetId?: string
  selectedColumnId?: string
  viewport: ViewportMode
}

function SortableWidgetInColumn({
  widget,
  isSelected,
  onSelect,
  onDelete,
  viewport,
}: {
  widget: Widget
  isSelected: boolean
  onSelect: () => void
  onDelete: () => void
  viewport: ViewportMode
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: widget.id,
    data: {
      type: 'widget',
      widget,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  // Check if should hide on this viewport
  if (shouldHide(widget, viewport)) {
    return null
  }

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className={`absolute -right-8 top-1/2 -translate-y-1/2 w-6 h-6 bg-blue-500 text-white rounded flex items-center justify-center cursor-move opacity-0 group-hover:opacity-100 transition-opacity z-20 ${
          isSelected ? 'opacity-100' : ''
        }`}
        title="גרור widget"
      >
        <GripVertical className="w-3 h-3" />
      </div>

      {/* Delete Button */}
      {isSelected && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            if (confirm('למחוק אלמנט זה?')) {
              onDelete()
            }
          }}
          className="absolute -left-8 top-1/2 -translate-y-1/2 w-6 h-6 bg-red-500 text-white rounded flex items-center justify-center hover:bg-red-600 transition-colors z-20"
          title="מחק"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      )}

      <WidgetRenderer
        widget={widget}
        isSelected={isSelected}
        onClick={onSelect}
        viewport={viewport}
      />
    </div>
  )
}

function ColumnDropZone({
  column,
  sectionId,
  isActive,
  isSelected,
  onSelectWidget,
  onDeleteWidget,
  onSelect,
  selectedWidgetId,
  viewport,
}: {
  column: Column
  sectionId: string
  isActive: boolean
  isSelected: boolean
  onSelectWidget: (widgetId: string) => void
  onDeleteWidget: (widgetId: string) => void
  onSelect: () => void
  selectedWidgetId?: string
  viewport: ViewportMode
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: `column-${column.id}`,
    data: {
      type: 'column',
      columnId: column.id,
      sectionId,
      accepts: ['widget', 'new-widget'],
    },
  })

  const columnStyle = stylesToCSS(column.styles || {}, viewport)

  return (
    <div
      ref={setNodeRef}
      onClick={(e) => {
        e.stopPropagation()
        onSelect()
      }}
      className={`relative min-h-[150px] rounded-lg transition-all duration-300 ${
        isOver
          ? 'ring-4 ring-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg scale-[1.02] border-2 border-blue-500'
          : isSelected
          ? 'ring-2 ring-blue-400 bg-blue-50/50'
          : isActive
          ? 'border-2 border-dashed border-gray-300'
          : 'border-2 border-dashed border-transparent hover:border-gray-200'
      }`}
      style={columnStyle}
    >
      {/* Column indicator */}
      {isActive && (
        <div className="absolute -top-6 right-2 text-xs text-gray-500 bg-white px-2 py-0.5 rounded">
          עמודה
        </div>
      )}

      {/* Empty state */}
      {column.widgets.length === 0 && (
        <div className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-all ${
          isOver ? 'text-blue-600 scale-110' : 'text-gray-400'
        }`}>
          <Plus className={`w-10 h-10 mb-2 transition-all ${isOver ? 'animate-bounce' : ''}`} />
          <p className={`text-sm font-medium transition-all ${isOver ? 'text-lg' : ''}`}>
            {isOver ? '🎯 שחרר כאן!' : 'גרור widget לכאן'}
          </p>
        </div>
      )}
      
      {/* Drag over indicator for non-empty columns */}
      {isOver && column.widgets.length > 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 bg-blue-500/10">
          <div className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg font-medium animate-bounce">
            🎯 שחרר כאן
          </div>
        </div>
      )}

      {/* Widgets */}
      {column.widgets.length > 0 && (
        <SortableContext items={column.widgets.map((w) => w.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4 p-4">
            {column.widgets.map((widget) => (
              <SortableWidgetInColumn
                key={widget.id}
                widget={widget}
                isSelected={selectedWidgetId === widget.id}
                onSelect={() => onSelectWidget(widget.id)}
                onDelete={() => onDeleteWidget(widget.id)}
                viewport={viewport}
              />
            ))}
          </div>
        </SortableContext>
      )}
    </div>
  )
}

export default function SectionRenderer({
  section,
  isSelected,
  onSelect,
  onDelete,
  onDuplicate,
  onSelectWidget,
  onDeleteWidget,
  onSelectColumn,
  selectedWidgetId,
  selectedColumnId,
  viewport,
}: SectionRendererProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
    data: {
      type: 'section',
      section,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  // Section styles
  const sectionStyle = stylesToCSS(section.styles, viewport)

  // Grid style for columns
  const gridStyle: React.CSSProperties = {
    display: viewport === 'mobile' ? 'block' : 'grid',
    gridTemplateColumns: viewport === 'mobile' ? '1fr' : getColumnWidths(section),
    gap: `${section.gap || 20}px`,
  }

  // Add custom class and ID
  const customClass = section.advanced?.customClass || ''
  const customId = section.advanced?.customId || ''

  return (
    <div
      ref={setNodeRef}
      style={style}
      id={customId}
      className={`relative group ${customClass}`}
    >
      {/* Section Controls Bar */}
      <div
        className={`absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-purple-600 text-white rounded-full px-3 py-1.5 text-xs shadow-lg transition-opacity z-30 ${
          isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      >
        <ColumnsIcon className="w-3 h-3" />
        <span className="font-medium">
          סקשן {section.columnCount} עמודות
        </span>
      </div>

      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className={`absolute -right-12 top-8 w-10 h-10 bg-purple-600 text-white rounded-lg flex items-center justify-center cursor-move shadow-lg transition-opacity z-30 ${
          isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
        title="גרור סקשן"
      >
        <GripVertical className="w-5 h-5" />
      </div>

      {/* Action Buttons */}
      {isSelected && (
        <div className="absolute -left-12 top-8 flex flex-col gap-2 z-30">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDuplicate()
            }}
            className="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors shadow-lg"
            title="שכפל סקשן"
          >
            <Copy className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              if (confirm('למחוק סקשן זה וכל התוכן שבו?')) {
                onDelete()
              }
            }}
            className="w-10 h-10 bg-red-500 text-white rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
            title="מחק סקשן"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Section Container */}
      <div
        onClick={(e) => {
          e.stopPropagation()
          onSelect()
        }}
        className={`cursor-pointer transition-all ${
          isSelected
            ? 'ring-4 ring-purple-500 ring-offset-4'
            : 'hover:ring-2 hover:ring-purple-300'
        }`}
        style={sectionStyle}
      >
        {/* Columns Grid */}
        <div style={gridStyle}>
          {section.columns.map((column) => (
            <ColumnDropZone
              key={column.id}
              column={column}
              sectionId={section.id}
              isActive={isSelected}
              isSelected={selectedColumnId === column.id}
              onSelectWidget={(widgetId) => onSelectWidget(widgetId, column.id)}
              onDeleteWidget={(widgetId) => onDeleteWidget(widgetId, column.id)}
              onSelect={() => onSelectColumn(column.id)}
              selectedWidgetId={selectedWidgetId}
              viewport={viewport}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

