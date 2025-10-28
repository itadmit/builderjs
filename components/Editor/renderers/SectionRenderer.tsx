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
  onSelectWidget: (widgetId: string, columnId: string, sectionId: string) => void
  onDeleteWidget: (widgetId: string, columnId: string, sectionId: string) => void
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
  const { attributes, listeners, setNodeRef, transform, transition, isDragging, isOver, overIndex, activeIndex } = useSortable({
    id: widget.id,
    data: {
      type: 'widget',
      widget,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? 'none' : transition,
    opacity: isDragging ? 0.3 : 1,
  }

  // Check if should hide on this viewport
  if (shouldHide(widget, viewport)) {
    return null
  }

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`relative group transition-all ${
        isDragging ? 'z-50' : ''
      }`}
    >
      {/* Drop indicator - shows where widget will be placed */}
      {isOver && !isDragging && (
        <div className="absolute -top-1 left-0 right-0 h-1 bg-blue-500 rounded-full shadow-lg z-30 animate-pulse">
          <div className="absolute left-1/2 -translate-x-1/2 -top-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full whitespace-nowrap shadow-lg">
            🎯 שחרר כאן
          </div>
        </div>
      )}
      
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className={`absolute -right-10 top-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg transition-all hover:scale-125 hover:shadow-xl z-[9998] ${
          isSelected ? 'opacity-100 ring-2 ring-blue-300' : 'opacity-0 group-hover:opacity-100'
        }`}
        title="↕️ גרור לסידור מחדש"
      >
        <GripVertical className="w-4 h-4" />
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
          className="absolute -left-10 top-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg flex items-center justify-center hover:bg-red-700 hover:scale-125 transition-all shadow-lg z-[9998] ring-2 ring-red-300"
          title="🗑️ מחק widget"
        >
          <Trash2 className="w-4 h-4" />
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
  sectionStyles,
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
  sectionStyles?: any
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

  const columnStyle = {
    ...stylesToCSS(column.styles || {}, viewport),
    display: 'flex',
    flexDirection: 'column' as const,
    // Inherit alignment from section if not set on column
    justifyContent: column.styles?.justifyContent || sectionStyles?.justifyContent || 'flex-start',
    alignItems: column.styles?.alignItems || sectionStyles?.alignItems || 'stretch',
  }

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
          <div className="space-y-2 p-4 flex-1 w-full flex flex-col" style={{
            justifyContent: column.styles?.justifyContent || sectionStyles?.justifyContent || 'flex-start',
            alignItems: column.styles?.alignItems || sectionStyles?.alignItems || 'stretch',
          }}>
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

  // Add background image if set
  if (section.styles.backgroundType === 'image' && section.styles.backgroundImage) {
    sectionStyle.backgroundImage = `url(${section.styles.backgroundImage})`
    sectionStyle.backgroundPosition = section.styles.backgroundPosition || 'center center'
    sectionStyle.backgroundSize = section.styles.backgroundSize || 'cover'
    sectionStyle.backgroundRepeat = section.styles.backgroundRepeat || 'no-repeat'
  }

  // Add min-height if set
  if (section.styles.minHeight) {
    // Check if value already has a unit (px or vh)
    const minHeightValue = String(section.styles.minHeight)
    if (minHeightValue.endsWith('px') || minHeightValue.endsWith('vh')) {
      sectionStyle.minHeight = minHeightValue
    } else {
      // Legacy: assume px if no unit specified
      sectionStyle.minHeight = `${section.styles.minHeight}px`
    }
  }

  // Grid style for columns
  const gridStyle: React.CSSProperties = {
    display: viewport === 'mobile' ? 'block' : 'grid',
    gridTemplateColumns: viewport === 'mobile' ? '1fr' : getColumnWidths(section),
    gap: `${section.gap || 20}px`,
    // Align columns within the section
    alignItems: section.styles.alignItems || 'stretch',
    justifyContent: section.styles.justifyContent || 'flex-start',
  }

  // Add custom class and ID
  const customClass = section.advanced?.customClass || ''
  const customId = section.advanced?.customId || ''

  // Check if has overlay
  const hasOverlay = section.styles.backgroundOverlay && (section.styles.backgroundOverlayOpacity || 0) > 0

  return (
    <div
      ref={setNodeRef}
      style={style}
      id={customId}
      className={`relative group ${customClass}`}
    >
      {/* Background Video */}
      {section.styles.backgroundType === 'video' && section.styles.backgroundVideo && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop={section.styles.backgroundVideoLoop !== false}
            muted={section.styles.backgroundVideoMuted !== false}
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              objectFit: 'cover',
            }}
          >
            <source src={section.styles.backgroundVideo} type="video/mp4" />
            {section.styles.backgroundVideoFallback && (
              <img src={section.styles.backgroundVideoFallback} className="w-full h-full object-cover" alt="" />
            )}
          </video>
        </div>
      )}

      {/* Background Overlay */}
      {hasOverlay && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: section.styles.backgroundOverlay,
            opacity: section.styles.backgroundOverlayOpacity || 0,
          }}
        />
      )}
      {/* Section Controls Bar */}
      <div
        className={`absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-purple-600 text-white rounded-full px-3 py-1.5 text-xs shadow-lg transition-opacity z-[9999] ${
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
        className={`absolute -right-12 top-8 w-10 h-10 bg-purple-600 text-white rounded-lg flex items-center justify-center cursor-move shadow-lg transition-opacity z-[9999] ${
          isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
        title="גרור סקשן"
      >
        <GripVertical className="w-5 h-5" />
      </div>

      {/* Action Buttons */}
      {isSelected && (
        <div className="absolute -left-12 top-8 flex flex-col gap-2 z-[9999]">
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
        <div style={gridStyle} className="relative z-10">
          {section.columns.map((column) => (
            <ColumnDropZone
              key={column.id}
              column={column}
              sectionId={section.id}
              isActive={isSelected}
              isSelected={selectedColumnId === column.id}
              onSelectWidget={(widgetId) => onSelectWidget(widgetId, column.id, section.id)}
              onDeleteWidget={(widgetId) => onDeleteWidget(widgetId, column.id, section.id)}
              onSelect={() => onSelectColumn(column.id)}
              selectedWidgetId={selectedWidgetId}
              viewport={viewport}
              sectionStyles={section.styles}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

