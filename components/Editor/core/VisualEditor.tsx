'use client'

import { useState, useCallback, useEffect } from 'react'
import {
  EditorState,
  EditorSelection,
  Section,
  Widget,
  WidgetType,
  ViewportMode,
  VisualEditorProps,
} from '../types'
import { createSection, duplicateSection, migrateOldStructure, findSection, findColumn, findWidget, generateId } from '../utils'
import { getWidgetDefinition } from '../utils/widgetDefinitions'
import { DndContext, DragOverlay, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors, DragStartEvent, DragEndEvent, DragOverEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import Canvas from './Canvas'
import WidgetsPanel from '../panels/WidgetsPanel'
import PropertiesPanel from '../panels/PropertiesPanel'
import EditorHeader from './EditorHeader'
import * as Icons from 'lucide-react'

export default function VisualEditor({
  initialValue,
  onChange,
  onSave,
  onClose,
  title,
  isSaving,
  readOnly,
}: VisualEditorProps) {
  const [state, setState] = useState<EditorState>(() => {
    const sections = initialValue?.sections || migrateOldStructure(initialValue?.widgets || [])
    return {
      sections,
      selection: { type: null, id: null },
      viewport: 'desktop',
      mode: 'edit',
      history: {
        past: [],
        future: [],
      },
    }
  })

  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  )
  
  // Add dragging class to body for cursor
  useEffect(() => {
    if (activeId) {
      document.body.style.cursor = 'grabbing'
    } else {
      document.body.style.cursor = ''
    }
    return () => {
      document.body.style.cursor = ''
    }
  }, [activeId])

  // Save to parent
  useEffect(() => {
    onChange({ sections: state.sections })
  }, [state.sections, onChange])

  // History management
  const addToHistory = useCallback(() => {
    setState((prev) => ({
      ...prev,
      history: {
        past: [...prev.history.past, prev.sections],
        future: [],
      },
    }))
  }, [])

  const undo = useCallback(() => {
    setState((prev) => {
      if (prev.history.past.length === 0) return prev
      const previous = prev.history.past[prev.history.past.length - 1]
      return {
        ...prev,
        sections: previous,
        history: {
          past: prev.history.past.slice(0, -1),
          future: [prev.sections, ...prev.history.future],
        },
      }
    })
  }, [])

  const redo = useCallback(() => {
    setState((prev) => {
      if (prev.history.future.length === 0) return prev
      const next = prev.history.future[0]
      return {
        ...prev,
        sections: next,
        history: {
          past: [...prev.history.past, prev.sections],
          future: prev.history.future.slice(1),
        },
      }
    })
  }, [])

  // Selection
  const setSelection = useCallback((selection: EditorSelection) => {
    setState((prev) => ({ ...prev, selection }))
  }, [])

  // Viewport
  const setViewport = useCallback((viewport: ViewportMode) => {
    setState((prev) => ({ ...prev, viewport }))
  }, [])

  // Add Section
  const handleAddSection = useCallback((columnCount: Section['columnCount'], layout?: Section['layout']) => {
    addToHistory()
    const newSection = createSection(columnCount, layout)
    setState((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
      selection: { type: 'section', id: newSection.id },
    }))
  }, [addToHistory])

  // Add Widget to Column
  const handleAddWidget = useCallback((widgetType: WidgetType, columnId: string, sectionId: string) => {
    addToHistory()
    const definition = getWidgetDefinition(widgetType)
    if (!definition) return

    const newWidget: Widget = {
      id: generateId(),
      type: widgetType,
      content: definition.defaultContent,
      styles: definition.defaultStyles,
      advanced: {},
    }

    setState((prev) => {
      const newSections = prev.sections.map((section) => {
        if (section.id !== sectionId) return section
        return {
          ...section,
          columns: section.columns.map((col) => {
            if (col.id !== columnId) return col
            return {
              ...col,
              widgets: [...col.widgets, newWidget],
            }
          }),
        }
      })
      return {
        ...prev,
        sections: newSections,
        selection: { type: 'widget', id: newWidget.id, columnId, sectionId },
      }
    })
  }, [addToHistory])

  // Duplicate Section
  const handleDuplicateSection = useCallback((sectionId: string) => {
    addToHistory()
    const section = findSection(state.sections, sectionId)
    if (!section) return

    const duplicate = duplicateSection(section)
    const index = state.sections.findIndex((s) => s.id === sectionId)

    setState((prev) => ({
      ...prev,
      sections: [
        ...prev.sections.slice(0, index + 1),
        duplicate,
        ...prev.sections.slice(index + 1),
      ],
      selection: { type: 'section', id: duplicate.id },
    }))
  }, [state.sections, addToHistory])

  // Delete Section
  const handleDeleteSection = useCallback((sectionId: string) => {
    addToHistory()
    setState((prev) => ({
      ...prev,
      sections: prev.sections.filter((s) => s.id !== sectionId),
      selection: { type: null, id: null },
    }))
  }, [addToHistory])

  // Delete Widget
  const handleDeleteWidget = useCallback((widgetId: string, columnId: string, sectionId: string) => {
    addToHistory()
    setState((prev) => ({
      ...prev,
      sections: prev.sections.map((section) => {
        if (section.id !== sectionId) return section
        return {
          ...section,
          columns: section.columns.map((col) => {
            if (col.id !== columnId) return col
            return {
              ...col,
              widgets: col.widgets.filter((w) => w.id !== widgetId),
            }
          }),
        }
      }),
      selection: { type: null, id: null },
    }))
  }, [addToHistory])

  // Update
  const handleUpdate = useCallback((updates: any) => {
    addToHistory()
    setState((prev) => {
      const { selection } = prev

      if (!selection.id) return prev

      const newSections = prev.sections.map((section) => {
        // Update Section
        if (selection.type === 'section' && section.id === selection.id) {
          return { ...section, ...updates }
        }

        // Update Column or Widget
        return {
          ...section,
          columns: section.columns.map((col) => {
            // Update Column
            if (selection.type === 'column' && col.id === selection.id) {
              return { ...col, ...updates }
            }

            // Update Widget
            if (selection.type === 'widget') {
              return {
                ...col,
                widgets: col.widgets.map((w) =>
                  w.id === selection.id ? { ...w, ...updates } : w
                ),
              }
            }

            return col
          }),
        }
      })

      return { ...prev, sections: newSections }
    })
  }, [addToHistory])

  // Drag and Drop handlers
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
    console.log('Drag started:', event.active.id, event.active.data.current)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    // Handle section reordering
    if (active.data.current?.type === 'section' && over.data.current?.type === 'section') {
      addToHistory()
      setState((prev) => {
        const oldIndex = prev.sections.findIndex((s) => s.id === active.id)
        const newIndex = prev.sections.findIndex((s) => s.id === over.id)
        return {
          ...prev,
          sections: arrayMove(prev.sections, oldIndex, newIndex),
        }
      })
      return
    }

    // Handle widget reordering within same column
    if (active.data.current?.type === 'widget' && over.data.current?.type === 'widget') {
      addToHistory()
      setState((prev) => {
        const activeWidget = findWidget(prev.sections, active.id as string)
        const overWidget = findWidget(prev.sections, over.id as string)
        
        if (!activeWidget || !overWidget) return prev
        
        // Only reorder if in same column
        if (activeWidget.columnId === overWidget.columnId && activeWidget.sectionId === overWidget.sectionId) {
          return {
            ...prev,
            sections: prev.sections.map((section) => {
              if (section.id !== activeWidget.sectionId) return section
              
              return {
                ...section,
                columns: section.columns.map((col) => {
                  if (col.id !== activeWidget.columnId) return col
                  
                  const oldIndex = col.widgets.findIndex((w) => w.id === active.id)
                  const newIndex = col.widgets.findIndex((w) => w.id === over.id)
                  
                  return {
                    ...col,
                    widgets: arrayMove(col.widgets, oldIndex, newIndex),
                  }
                }),
              }
            }),
          }
        }
        
        return prev
      })
      return
    }

    // Handle widget drop into column
    if (over.data.current?.type === 'column') {
      const columnId = over.data.current.columnId
      const sectionId = over.data.current.sectionId

      // New widget from panel
      if (active.data.current?.widgetType) {
        handleAddWidget(active.data.current.widgetType, columnId, sectionId)
      }
      // Move existing widget to different column
      else if (active.data.current?.type === 'widget') {
        const activeWidget = findWidget(state.sections, active.id as string)
        if (activeWidget) {
          // Only move if to different column
          if (activeWidget.columnId !== columnId || activeWidget.sectionId !== sectionId) {
            addToHistory()
            setState((prev) => {
              // Remove from old location
              const newSections = prev.sections.map((section) => ({
                ...section,
                columns: section.columns.map((col) => ({
                  ...col,
                  widgets: col.widgets.filter((w) => w.id !== active.id),
                })),
              }))
              
              // Add to new location
              return {
                ...prev,
                sections: newSections.map((section) => {
                  if (section.id !== sectionId) return section
                  return {
                    ...section,
                    columns: section.columns.map((col) => {
                      if (col.id !== columnId) return col
                      return {
                        ...col,
                        widgets: [...col.widgets, activeWidget.widget],
                      }
                    }),
                  }
                }),
              }
            })
          }
        }
      }
    }
  }

  if (readOnly) {
    // TODO: Implement read-only view
    return <div>Read-only view</div>
  }

  // Get active widget definition for drag overlay
  const getActiveWidget = () => {
    if (!activeId) return null
    
    // Check if dragging a new widget from panel
    if (activeId.toString().startsWith('new-widget-')) {
      const widgetType = activeId.toString().replace('new-widget-', '')
      const definition = getWidgetDefinition(widgetType as WidgetType)
      return definition
    }
    
    return null
  }

  const activeWidget = getActiveWidget()

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="fixed inset-0 z-50 bg-white flex flex-col" dir="rtl">
        <EditorHeader
          title={title || 'עורך ויזואלי'}
          viewport={state.viewport}
          onViewportChange={setViewport}
          onSave={onSave}
          onClose={onClose}
          onUndo={undo}
          onRedo={redo}
          canUndo={state.history.past.length > 0}
          canRedo={state.history.future.length > 0}
          isSaving={isSaving}
        />

        <div className="flex flex-1 overflow-hidden">
          {/* Right: Widgets Panel */}
          <WidgetsPanel onAddSection={handleAddSection} />

          {/* Center: Canvas */}
          <Canvas
            sections={state.sections}
            selection={state.selection}
            viewport={state.viewport}
            onSelectSection={(id) => setSelection({ type: 'section', id })}
            onSelectColumn={(id, sectionId) => setSelection({ type: 'column', id, sectionId })}
            onSelectWidget={(id, columnId, sectionId) => setSelection({ type: 'widget', id, columnId, sectionId })}
            onDeleteSection={handleDeleteSection}
            onDeleteWidget={handleDeleteWidget}
            onDuplicateSection={handleDuplicateSection}
          />

          {/* Left: Properties Panel */}
          <PropertiesPanel
            selection={state.selection}
            sections={state.sections}
            viewport={state.viewport}
            onUpdate={handleUpdate}
          />
        </div>
      </div>

      {/* Drag Overlay */}
      <DragOverlay dropAnimation={null}>
        {activeWidget && (() => {
          const IconComponent = (Icons as any)[activeWidget.icon]
          return (
            <div className="flex flex-col items-center gap-2 p-4 bg-white border-2 border-primary rounded-lg shadow-2xl scale-110 animate-pulse">
              {IconComponent && (
                <IconComponent className="w-8 h-8 text-primary" />
              )}
              <span className="text-sm font-bold text-primary">{activeWidget.label}</span>
            </div>
          )
        })()}
      </DragOverlay>
    </DndContext>
  )
}

