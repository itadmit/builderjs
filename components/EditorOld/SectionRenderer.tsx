'use client'

import { Section, Widget, ViewportMode, Column } from './types'
import WidgetRenderer from './Widgets/WidgetRenderer'
import { GripVertical, Trash2, Plus, Settings, Copy, Columns as ColumnsIcon } from 'lucide-react'
import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

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
  viewportMode?: ViewportMode
}

interface ColumnDropZoneProps {
  column: Column
  sectionId: string
  isActive: boolean
  isSelected: boolean
  onSelectWidget: (widgetId: string) => void
  onDeleteWidget: (widgetId: string) => void
  onSelect: () => void
  selectedWidgetId?: string
  viewportMode?: ViewportMode
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
  viewportMode = 'desktop',
}: ColumnDropZoneProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `column-${column.id}`,
    data: {
      type: 'column',
      columnId: column.id,
      sectionId,
      accepts: ['widget'], // Accept widgets
    },
  })

  const columnStyle: React.CSSProperties = {
    backgroundColor: column.styles?.backgroundColor,
    paddingTop: column.styles?.paddingTop ? `${column.styles.paddingTop}px` : undefined,
    paddingBottom: column.styles?.paddingBottom ? `${column.styles.paddingBottom}px` : undefined,
    paddingLeft: column.styles?.paddingLeft ? `${column.styles.paddingLeft}px` : undefined,
    paddingRight: column.styles?.paddingRight ? `${column.styles.paddingRight}px` : undefined,
    borderRadius: column.styles?.borderRadius ? `${column.styles.borderRadius}px` : undefined,
  }

  return (
    <div
      ref={setNodeRef}
      onClick={(e) => {
        e.stopPropagation()
        onSelect()
      }}
      className={`relative min-h-[120px] p-4 rounded-lg transition-all ${
        isOver
          ? 'ring-2 ring-primary bg-primary/10'
          : isSelected
          ? 'ring-2 ring-blue-400 bg-blue-50/50'
          : isActive
          ? 'border-2 border-dashed border-gray-300'
          : 'border-2 border-dashed border-gray-200'
      }`}
      style={columnStyle}
    >
      {/* Column Label */}
      {isActive && column.widgets.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 pointer-events-none">
          <Plus className="w-8 h-8 mb-2" />
          <p className="text-sm">גרור אלמנט לכאן</p>
        </div>
      )}

      {/* Widgets */}
      {column.widgets.length > 0 && (
        <SortableContext items={column.widgets.map(w => w.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {column.widgets.map((widget) => {
              // Check visibility
              if (viewportMode === 'desktop' && widget.styles?.hideOnDesktop) return null
              if (viewportMode === 'mobile' && widget.styles?.hideOnMobile) return null

              return (
                <SortableWidgetInColumn
                  key={widget.id}
                  widget={widget}
                  isSelected={selectedWidgetId === widget.id}
                  onSelect={() => onSelectWidget(widget.id)}
                  onDelete={() => onDeleteWidget(widget.id)}
                  viewportMode={viewportMode}
                />
              )
            })}
          </div>
        </SortableContext>
      )}
    </div>
  )
}

function SortableWidgetInColumn({
  widget,
  isSelected,
  onSelect,
  onDelete,
  viewportMode,
}: {
  widget: Widget
  isSelected: boolean
  onSelect: () => void
  onDelete: () => void
  viewportMode?: ViewportMode
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

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className={`absolute -right-8 top-1/2 -translate-y-1/2 w-6 h-6 bg-primary text-white rounded flex items-center justify-center cursor-move opacity-0 group-hover:opacity-100 transition-opacity z-10 ${
          isSelected ? 'opacity-100' : ''
        }`}
        title="גרור"
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
          className="absolute -left-8 top-1/2 -translate-y-1/2 w-6 h-6 bg-red-500 text-white rounded flex items-center justify-center hover:bg-red-600 transition-colors z-10"
          title="מחק"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      )}

      <WidgetRenderer widget={widget} isSelected={isSelected} onClick={onSelect} viewportMode={viewportMode} />
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
  viewportMode = 'desktop',
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
  const sectionStyle: React.CSSProperties = {
    backgroundColor: section.styles?.backgroundColor,
    backgroundImage: section.styles?.backgroundImage ? `url(${section.styles.backgroundImage})` : undefined,
    paddingTop: section.styles?.paddingTop ? `${section.styles.paddingTop}px` : '40px',
    paddingBottom: section.styles?.paddingBottom ? `${section.styles.paddingBottom}px` : '40px',
    paddingLeft: section.styles?.paddingLeft ? `${section.styles.paddingLeft}px` : '20px',
    paddingRight: section.styles?.paddingRight ? `${section.styles.paddingRight}px` : '20px',
    marginTop: section.styles?.marginTop ? `${section.styles.marginTop}px` : undefined,
    marginBottom: section.styles?.marginBottom ? `${section.styles.marginBottom}px` : undefined,
    borderRadius: section.styles?.borderRadius ? `${section.styles.borderRadius}px` : undefined,
    minHeight: section.styles?.minHeight,
  }

  // Calculate column widths based on layout
  const getColumnWidths = (): string => {
    if (viewportMode === 'mobile') {
      return '1fr' // Single column on mobile
    }

    switch (section.layout) {
      case '30-70':
        return '30fr 70fr'
      case '70-30':
        return '70fr 30fr'
      case '25-75':
        return '25fr 75fr'
      case '75-25':
        return '75fr 25fr'
      case '33-66':
        return '33fr 66fr'
      case '66-33':
        return '66fr 33fr'
      default:
        // Equal columns
        return `repeat(${section.columnCount}, 1fr)`
    }
  }

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: getColumnWidths(),
    gap: `${section.gap || 20}px`,
  }

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      {/* Section Controls */}
      <div className={`absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-purple-600 text-white rounded-full px-3 py-1 text-xs shadow-lg transition-opacity z-20 ${
        isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      }`}>
        <ColumnsIcon className="w-3 h-3" />
        <span>סקשן {section.columnCount} עמודות</span>
      </div>

      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className={`absolute -right-10 top-8 w-8 h-8 bg-purple-600 text-white rounded-lg flex items-center justify-center cursor-move opacity-0 group-hover:opacity-100 transition-opacity z-10 ${
          isSelected ? 'opacity-100' : ''
        }`}
        title="גרור סקשן"
      >
        <GripVertical className="w-4 h-4" />
      </div>

      {/* Action Buttons */}
      {isSelected && (
        <div className="absolute -left-10 top-8 flex flex-col gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDuplicate()
            }}
            className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
            title="שכפל"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              if (confirm('למחוק סקשן זה?')) {
                onDelete()
              }
            }}
            className="w-8 h-8 bg-red-500 text-white rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
            title="מחק"
          >
            <Trash2 className="w-4 h-4" />
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
          isSelected ? 'ring-2 ring-purple-600 ring-offset-2' : 'hover:ring-2 hover:ring-gray-300'
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
              viewportMode={viewportMode}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

