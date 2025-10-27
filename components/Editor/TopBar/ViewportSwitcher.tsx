'use client'

import { Monitor, Smartphone } from 'lucide-react'
import { ViewportMode } from '../types'

interface ViewportSwitcherProps {
  mode: ViewportMode
  onChange: (mode: ViewportMode) => void
}

export default function ViewportSwitcher({ mode, onChange }: ViewportSwitcherProps) {
  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => onChange('desktop')}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${
          mode === 'desktop'
            ? 'bg-white shadow-sm text-primary'
            : 'text-gray-600 hover:text-gray-900'
        }`}
        title="תצוגת מחשב"
      >
        <Monitor className="w-4 h-4" />
        <span className="text-sm font-medium">מחשב</span>
      </button>
      <button
        onClick={() => onChange('mobile')}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${
          mode === 'mobile'
            ? 'bg-white shadow-sm text-primary'
            : 'text-gray-600 hover:text-gray-900'
        }`}
        title="תצוגת מובייל"
      >
        <Smartphone className="w-4 h-4" />
        <span className="text-sm font-medium">מובייל</span>
      </button>
    </div>
  )
}

