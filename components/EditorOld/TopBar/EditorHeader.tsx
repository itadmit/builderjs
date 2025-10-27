'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft, Undo2, Redo2, Eye, Save } from 'lucide-react'
import Link from 'next/link'
import ViewportSwitcher from './ViewportSwitcher'
import { ViewportMode } from '../types'

interface EditorHeaderProps {
  onClose?: () => void
  onSave?: () => void
  onPreview?: () => void
  canUndo?: boolean
  canRedo?: boolean
  onUndo?: () => void
  onRedo?: () => void
  isSaving?: boolean
  title?: string
  saveDisabled?: boolean
  viewportMode?: ViewportMode
  onViewportChange?: (mode: ViewportMode) => void
}

export default function EditorHeader({
  onClose,
  onSave,
  onPreview,
  canUndo = false,
  canRedo = false,
  onUndo,
  onRedo,
  isSaving = false,
  title = 'עורך ויזואלי',
  saveDisabled = false,
  viewportMode = 'desktop',
  onViewportChange,
}: EditorHeaderProps) {
  return (
    <div className="h-16 border-b bg-white flex items-center justify-between px-4 flex-shrink-0">
      {/* Right Side - Back Button & Title */}
      <div className="flex items-center gap-4">
        {onClose && (
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            חזרה
          </Button>
        )}
        <h1 className="text-xl font-bold">{title}</h1>
      </div>

      {/* Center - Viewport Switcher & Undo/Redo */}
      <div className="flex items-center gap-4">
        {onViewportChange && (
          <ViewportSwitcher mode={viewportMode} onChange={onViewportChange} />
        )}
        <div className="flex items-center gap-2 border-r pr-4">
          <Button
            onClick={onUndo}
            disabled={!canUndo}
            variant="ghost"
            size="sm"
            title="בטל פעולה (Ctrl+Z)"
          >
            <Undo2 className="w-4 h-4" />
          </Button>
          <Button
            onClick={onRedo}
            disabled={!canRedo}
            variant="ghost"
            size="sm"
            title="בצע שוב (Ctrl+Y)"
          >
            <Redo2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Left Side - Actions */}
      <div className="flex items-center gap-2">
        {onPreview && (
          <Button
            onClick={onPreview}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Eye className="w-4 h-4" />
            תצוגה מקדימה
          </Button>
        )}
        {onSave && (
          <Button
            onClick={onSave}
            disabled={isSaving || saveDisabled}
            size="sm"
            className="gap-2"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'שומר...' : 'שמור'}
          </Button>
        )}
      </div>
    </div>
  )
}

