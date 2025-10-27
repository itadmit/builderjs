'use client'

import { PanelProps } from '../../types'
import { findWidget, findSection } from '../../utils'

export default function StyleTab({ selection, sections, viewport, onUpdate }: PanelProps) {
  const getStyles = () => {
    if (selection.type === 'section') {
      const section = findSection(sections, selection.id!)
      return section?.styles || {}
    }
    if (selection.type === 'widget') {
      const result = findWidget(sections, selection.id!)
      return result?.widget.styles || {}
    }
    return {}
  }

  const styles = getStyles()

  const updateStyle = (key: string, value: any) => {
    onUpdate({ styles: { ...styles, [key]: value } })
  }

  return (
    <div className="p-4 space-y-6">
      {/* Typography */}
      {(selection.type === 'widget') && (
        <div className="space-y-4">
          <h4 className="font-semibold text-sm border-b pb-2">טיפוגרפיה</h4>
          
          <div className="space-y-2">
            <label className="text-xs font-medium">גודל גופן</label>
            <select
              value={styles.fontSize || '1rem'}
              onChange={(e) => updateStyle('fontSize', e.target.value)}
              className="w-full px-2 py-1.5 border rounded text-sm"
            >
              <option value="0.75rem">קטן מאוד</option>
              <option value="0.875rem">קטן</option>
              <option value="1rem">רגיל</option>
              <option value="1.25rem">בינוני</option>
              <option value="1.5rem">גדול</option>
              <option value="2rem">גדול מאוד</option>
              <option value="2.5rem">ענק</option>
              <option value="3rem">ענק מאוד</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium">משקל</label>
            <select
              value={styles.fontWeight || '400'}
              onChange={(e) => updateStyle('fontWeight', e.target.value)}
              className="w-full px-2 py-1.5 border rounded text-sm"
            >
              <option value="300">דק</option>
              <option value="400">רגיל</option>
              <option value="500">בינוני</option>
              <option value="600">מודגש</option>
              <option value="700">מודגש מאוד</option>
              <option value="800">עבה</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium">יישור</label>
            <div className="flex gap-2">
              {[
                { value: 'right', label: 'ימין' },
                { value: 'center', label: 'מרכז' },
                { value: 'left', label: 'שמאל' },
              ].map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => updateStyle('textAlign', value)}
                  className={`flex-1 px-2 py-1.5 rounded text-xs border ${
                    styles.textAlign === value
                      ? 'bg-primary text-white border-primary'
                      : 'border-gray-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium">צבע טקסט</label>
            <input
              type="color"
              value={styles.color || '#000000'}
              onChange={(e) => updateStyle('color', e.target.value)}
              className="w-full h-10 rounded border"
            />
          </div>
        </div>
      )}

      {/* Background */}
      <div className="space-y-4">
        <h4 className="font-semibold text-sm border-b pb-2">רקע</h4>
        
        <div className="space-y-2">
          <label className="text-xs font-medium">צבע רקע</label>
          <input
            type="color"
            value={styles.backgroundColor || '#ffffff'}
            onChange={(e) => updateStyle('backgroundColor', e.target.value)}
            className="w-full h-10 rounded border"
          />
        </div>
      </div>

      {/* Spacing */}
      <div className="space-y-4">
        <h4 className="font-semibold text-sm border-b pb-2">ריווח</h4>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs">Padding Top</label>
            <input
              type="number"
              value={styles.paddingTop || 0}
              onChange={(e) => updateStyle('paddingTop', parseInt(e.target.value))}
              className="w-full px-2 py-1 border rounded text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs">Padding Bottom</label>
            <input
              type="number"
              value={styles.paddingBottom || 0}
              onChange={(e) => updateStyle('paddingBottom', parseInt(e.target.value))}
              className="w-full px-2 py-1 border rounded text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs">Padding Right</label>
            <input
              type="number"
              value={styles.paddingRight || 0}
              onChange={(e) => updateStyle('paddingRight', parseInt(e.target.value))}
              className="w-full px-2 py-1 border rounded text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs">Padding Left</label>
            <input
              type="number"
              value={styles.paddingLeft || 0}
              onChange={(e) => updateStyle('paddingLeft', parseInt(e.target.value))}
              className="w-full px-2 py-1 border rounded text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs">Margin Top</label>
            <input
              type="number"
              value={styles.marginTop || 0}
              onChange={(e) => updateStyle('marginTop', parseInt(e.target.value))}
              className="w-full px-2 py-1 border rounded text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs">Margin Bottom</label>
            <input
              type="number"
              value={styles.marginBottom || 0}
              onChange={(e) => updateStyle('marginBottom', parseInt(e.target.value))}
              className="w-full px-2 py-1 border rounded text-sm"
            />
          </div>
        </div>
      </div>

      {/* Border */}
      <div className="space-y-4">
        <h4 className="font-semibold text-sm border-b pb-2">גבול</h4>
        
        <div className="space-y-2">
          <label className="text-xs font-medium">עובי גבול (px)</label>
          <input
            type="number"
            value={styles.borderWidth || 0}
            onChange={(e) => updateStyle('borderWidth', parseInt(e.target.value))}
            className="w-full px-2 py-1 border rounded text-sm"
            min="0"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium">צבע גבול</label>
          <input
            type="color"
            value={styles.borderColor || '#000000'}
            onChange={(e) => updateStyle('borderColor', e.target.value)}
            className="w-full h-10 rounded border"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium">עיגול פינות (px)</label>
          <input
            type="number"
            value={styles.borderRadius || 0}
            onChange={(e) => updateStyle('borderRadius', parseInt(e.target.value))}
            className="w-full px-2 py-1 border rounded text-sm"
            min="0"
          />
        </div>
      </div>

      <p className="text-xs text-gray-500 italic">
        💡 לשליטה מלאה במצב responsive - עבור ללשונית מתקדם
      </p>
    </div>
  )
}

