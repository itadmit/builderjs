'use client'

import { ViewportMode } from '../types'
import { X, Save, Undo, Redo, Monitor, Tablet, Smartphone, Eye } from 'lucide-react'

interface EditorHeaderProps {
  title: string
  viewport: ViewportMode
  onViewportChange: (mode: ViewportMode) => void
  onSave?: () => void
  onClose?: () => void
  onUndo: () => void
  onRedo: () => void
  canUndo: boolean
  canRedo: boolean
  isSaving?: boolean
}

export default function EditorHeader({
  title,
  viewport,
  onViewportChange,
  onSave,
  onClose,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  isSaving,
}: EditorHeaderProps) {
  return (
    <div className="h-16 border-b bg-white flex items-center justify-between px-6 flex-shrink-0">
      {/* Left */}
      <div className="flex items-center gap-4">
        {onClose && (
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
            title="סגור"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>

      {/* Center - Viewport Switcher */}
      <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => onViewportChange('desktop')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            viewport === 'desktop'
              ? 'bg-white shadow-sm text-primary'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          title="מחשב"
        >
          <Monitor className="w-4 h-4" />
          <span className="text-sm font-medium">מחשב</span>
        </button>
        <button
          onClick={() => onViewportChange('tablet')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            viewport === 'tablet'
              ? 'bg-white shadow-sm text-primary'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          title="טאבלט"
        >
          <Tablet className="w-4 h-4" />
          <span className="text-sm font-medium">טאבלט</span>
        </button>
        <button
          onClick={() => onViewportChange('mobile')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            viewport === 'mobile'
              ? 'bg-white shadow-sm text-primary'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          title="מובייל"
        >
          <Smartphone className="w-4 h-4" />
          <span className="text-sm font-medium">מובייל</span>
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          title="בטל (Ctrl+Z)"
        >
          <Undo className="w-5 h-5" />
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          title="בצע שוב (Ctrl+Y)"
        >
          <Redo className="w-5 h-5" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-2" />

        {onSave && (
          <button
            onClick={onSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            <span className="font-medium">{isSaving ? 'שומר...' : 'שמור'}</span>
          </button>
        )}
      </div>
    </div>
  )
}

