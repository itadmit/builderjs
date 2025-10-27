'use client'

import { PanelProps } from '../../types'
import { findWidget } from '../../utils'

export default function AdvancedTab({ selection, sections, viewport, onUpdate }: PanelProps) {
  if (selection.type !== 'widget') {
    return (
      <div className="p-4">
        <p className="text-sm text-gray-500">
          הגדרות מתקדמות זמינות רק לווידג'טים
        </p>
      </div>
    )
  }

  const result = findWidget(sections, selection.id!)
  if (!result) return <div className="p-4">Widget not found</div>
  
  const { widget } = result
  const advanced = widget.advanced || {}

  const updateAdvanced = (key: string, value: any) => {
    onUpdate({ advanced: { ...advanced, [key]: value } })
  }

  const updateVisibility = (key: string, value: boolean) => {
    updateAdvanced('visibility', { ...advanced.visibility, [key]: value })
  }

  return (
    <div className="p-4 space-y-6">
      {/* HTML Attributes */}
      <div className="space-y-4">
        <h4 className="font-semibold text-sm border-b pb-2">תכונות HTML</h4>
        
        <div className="space-y-2">
          <label className="text-xs font-medium">ID מותאם אישית</label>
          <input
            type="text"
            value={advanced.customId || ''}
            onChange={(e) => updateAdvanced('customId', e.target.value)}
            className="w-full px-2 py-1.5 border rounded text-sm"
            placeholder="my-element"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium">Class מותאם אישית</label>
          <input
            type="text"
            value={advanced.customClass || ''}
            onChange={(e) => updateAdvanced('customClass', e.target.value)}
            className="w-full px-2 py-1.5 border rounded text-sm"
            placeholder="my-class another-class"
          />
        </div>
      </div>

      {/* Visibility */}
      <div className="space-y-4">
        <h4 className="font-semibold text-sm border-b pb-2">הסתרה לפי מכשיר</h4>
        
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={advanced.visibility?.hideOnDesktop || false}
            onChange={(e) => updateVisibility('hideOnDesktop', e.target.checked)}
          />
          <span className="text-sm">הסתר במחשב</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={advanced.visibility?.hideOnTablet || false}
            onChange={(e) => updateVisibility('hideOnTablet', e.target.checked)}
          />
          <span className="text-sm">הסתר בטאבלט</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={advanced.visibility?.hideOnMobile || false}
            onChange={(e) => updateVisibility('hideOnMobile', e.target.checked)}
          />
          <span className="text-sm">הסתר במובייל</span>
        </label>
      </div>

      {/* Animation */}
      <div className="space-y-4">
        <h4 className="font-semibold text-sm border-b pb-2">אנימציה</h4>
        
        <div className="space-y-2">
          <label className="text-xs font-medium">אנימציית כניסה</label>
          <select
            value={advanced.entranceAnimation || 'none'}
            onChange={(e) => updateAdvanced('entranceAnimation', e.target.value)}
            className="w-full px-2 py-1.5 border rounded text-sm"
          >
            <option value="none">ללא</option>
            <option value="fadeIn">Fade In</option>
            <option value="slideUp">Slide Up</option>
            <option value="slideDown">Slide Down</option>
            <option value="slideLeft">Slide Left</option>
            <option value="slideRight">Slide Right</option>
            <option value="zoomIn">Zoom In</option>
            <option value="zoomOut">Zoom Out</option>
          </select>
        </div>

        {advanced.entranceAnimation && advanced.entranceAnimation !== 'none' && (
          <>
            <div className="space-y-2">
              <label className="text-xs font-medium">משך (ms)</label>
              <input
                type="number"
                value={advanced.animationDuration || 500}
                onChange={(e) => updateAdvanced('animationDuration', parseInt(e.target.value))}
                className="w-full px-2 py-1.5 border rounded text-sm"
                min="0"
                step="100"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium">עיכוב (ms)</label>
              <input
                type="number"
                value={advanced.animationDelay || 0}
                onChange={(e) => updateAdvanced('animationDelay', parseInt(e.target.value))}
                className="w-full px-2 py-1.5 border rounded text-sm"
                min="0"
                step="100"
              />
            </div>
          </>
        )}
      </div>

      <div className="bg-blue-50 p-3 rounded-lg text-xs text-gray-700">
        <p className="font-medium mb-1">💡 טיפ:</p>
        <p>
          השתמש ב-ID ו-Class מותאמים אישית כדי להוסיף CSS או JavaScript חיצוני
        </p>
      </div>
    </div>
  )
}

