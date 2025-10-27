'use client'

import { useState, useEffect, useRef } from 'react'
import { Widget, WidgetType, EditorState } from './types'
import { WIDGET_DEFINITIONS } from './constants'
import { generateId } from './utils'
import Canvas from './Canvas/Canvas'
import WidgetsPanel from './Sidebar/WidgetsPanelצד'
import ContentPanel from './Sidebar/ContentPanel'
import StylePanelResponsive from './Sidebar/StylePanelResponsive'
import EditorHeader from './TopBar/EditorHeader'
import { useEditorHistory } from './hooks/useEditorHistory'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'

interface VisualEditorProps {
  initialValue: any
  onChange: (value: any) => void
  readOnly?: boolean
  onClose?: () => void
  onSave?: () => void
  title?: string
  isSaving?: boolean
}

export default function VisualEditor({
  initialValue,
  onChange,
  readOnly = false,
  onClose,
  onSave,
  title,
  isSaving = false,
}: VisualEditorProps) {
  const [state, setState] = useState<EditorState>({
    widgets: [],
    selectedWidgetId: null,
    mode: 'edit',
    viewportMode: 'desktop',
  })

  // Initialize history hook
  const {
    currentWidgets,
    addToHistory,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useEditorHistory(initialValue?.widgets || [])

  // Track if we should save to history
  const shouldSaveToHistory = useRef(true)
  const isInitialized = useRef(false)

  // Load initial data only once
  useEffect(() => {
    if (initialValue?.widgets && !isInitialized.current) {
      setState((prev) => ({
        ...prev,
        widgets: initialValue.widgets,
      }))
      isInitialized.current = true
    }
  }, [initialValue])

  // Update widgets from history
  useEffect(() => {
    if (shouldSaveToHistory.current && isInitialized.current) {
      setState((prev) => {
        // Prevent update if widgets are the same
        if (JSON.stringify(prev.widgets) === JSON.stringify(currentWidgets)) {
          return prev
        }
        return {
          ...prev,
          widgets: currentWidgets,
        }
      })
    }
  }, [currentWidgets])

  // Save changes - debounced to prevent infinite loops
  useEffect(() => {
    if (isInitialized.current) {
      onChange({ widgets: state.widgets })
    }
  }, [state.widgets])

  const handleAddWidget = (type: WidgetType) => {
    const definition = WIDGET_DEFINITIONS.find((w) => w.type === type)
    if (!definition) return

    const newWidget: Widget = {
      id: generateId(),
      type,
      content: definition.defaultContent,
      styles: definition.defaultStyles,
    }

    const newWidgets = [...state.widgets, newWidget]
    setState((prev) => ({
      ...prev,
      widgets: newWidgets,
      selectedWidgetId: newWidget.id,
    }))
    addToHistory(newWidgets)
  }

  const handleSelectWidget = (widgetId: string | null) => {
    setState((prev) => ({
      ...prev,
      selectedWidgetId: widgetId,
    }))
  }

  const handleUpdateWidget = (widgetId: string, updates: Partial<Widget>) => {
    const newWidgets = state.widgets.map((w) =>
      w.id === widgetId ? { ...w, ...updates } : w
    )
    setState((prev) => ({
      ...prev,
      widgets: newWidgets,
    }))
    addToHistory(newWidgets)
  }

  const handleReorderWidgets = (widgets: Widget[]) => {
    setState((prev) => ({
      ...prev,
      widgets,
    }))
    addToHistory(widgets)
  }

  const handleDeleteWidget = (widgetId: string) => {
    const newWidgets = state.widgets.filter((w) => w.id !== widgetId)
    setState((prev) => ({
      ...prev,
      widgets: newWidgets,
      selectedWidgetId: prev.selectedWidgetId === widgetId ? null : prev.selectedWidgetId,
    }))
    addToHistory(newWidgets)
  }

  const handleClearAll = () => {
    if (confirm('האם אתה בטוח שברצונך למחוק את כל האלמנטים?')) {
      setState((prev) => ({
        ...prev,
        widgets: [],
        selectedWidgetId: null,
      }))
      addToHistory([])
    }
  }

  const handleViewportChange = (viewportMode: ViewportMode) => {
    setState((prev) => ({
      ...prev,
      viewportMode,
    }))
  }

  const selectedWidget = state.widgets.find((w) => w.id === state.selectedWidgetId) || null

  if (readOnly) {
    // Read-only mode for public pages
    return (
      <div className="max-w-4xl mx-auto p-4">
        {state.widgets.map((widget) => {
          const WidgetComponent = require(`./Widgets/${widget.type.charAt(0).toUpperCase() + widget.type.slice(1)}Widget`).default
          return (
            <WidgetComponent
              key={widget.id}
              widget={widget}
              isSelected={false}
              onClick={() => {}}
            />
          )
        })}
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col" dir="rtl">
      {/* Header */}
      <EditorHeader
        title={title || 'עורך ויזואלי'}
        onClose={onClose}
        onSave={onSave}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={undo}
        onRedo={redo}
        isSaving={isSaving}
        viewportMode={state.viewportMode}
        onViewportChange={handleViewportChange}
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Right Sidebar - Widgets Panel */}
        <div className="w-72 border-l bg-gray-50 flex flex-col flex-shrink-0 overflow-y-auto">
          <div className="p-4 border-b bg-white sticky top-0 z-10">
            <h2 className="text-lg font-semibold">אלמנטים</h2>
          </div>
          <WidgetsPanel onAddWidget={handleAddWidget} />
        </div>

        {/* Center - Canvas */}
        <div className={`flex-1 flex justify-center items-start bg-gray-100 overflow-y-auto ${
          state.viewportMode === 'mobile' ? 'p-4' : ''
        }`}>
          <div className={`${
            state.viewportMode === 'mobile' 
              ? 'w-[375px] min-h-screen bg-white shadow-2xl' 
              : 'w-full'
          }`}>
            <Canvas
              widgets={state.widgets}
              selectedWidgetId={state.selectedWidgetId}
              onSelectWidget={handleSelectWidget}
              onReorderWidgets={handleReorderWidgets}
              onDeleteWidget={handleDeleteWidget}
              viewportMode={state.viewportMode}
            />
          </div>
        </div>

        {/* Left Sidebar - Properties Panel */}
        <div className="w-72 border-r bg-gray-50 flex flex-col flex-shrink-0">
          <div className="p-4 border-b bg-white flex justify-between items-center sticky top-0 z-10">
            <h2 className="text-lg font-semibold">מאפיינים</h2>
            {state.widgets.length > 0 && (
              <Button
                onClick={handleClearAll}
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs"
              >
                נקה הכל
              </Button>
            )}
          </div>

          <Tabs defaultValue="content" className="flex-1 flex flex-col overflow-hidden">
            <TabsList className="mx-4 mt-2">
              <TabsTrigger value="content" className="flex-1">תוכן</TabsTrigger>
              <TabsTrigger value="style" className="flex-1">עיצוב</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="flex-1 overflow-y-auto mt-0">
              <ContentPanel widget={selectedWidget} onUpdateWidget={handleUpdateWidget} />
            </TabsContent>

            <TabsContent value="style" className="flex-1 overflow-y-auto mt-0">
              <StylePanelResponsive 
                widget={selectedWidget} 
                viewportMode={state.viewportMode}
                onUpdateWidget={handleUpdateWidget} 
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
