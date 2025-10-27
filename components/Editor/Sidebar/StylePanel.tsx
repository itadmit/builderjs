'use client'

import { Widget } from '../types'
import {
  FONT_SIZES,
  FONT_WEIGHTS,
  TEXT_ALIGNS,
  SPACING_PRESETS,
  COLOR_PRESETS,
} from '../constants'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'

interface StylePanelProps {
  widget: Widget | null
  onUpdateWidget: (widgetId: string, updates: Partial<Widget>) => void
}

export default function StylePanel({ widget, onUpdateWidget }: StylePanelProps) {
  if (!widget) {
    return (
      <div className="h-full flex items-center justify-center p-4 text-center text-gray-500">
        <div>
          <p className="text-lg mb-2">בחר אלמנט</p>
          <p className="text-sm">לחץ על אלמנט בעמוד כדי לערוך את העיצוב שלו</p>
        </div>
      </div>
    )
  }

  const updateStyle = (key: string, value: any) => {
    onUpdateWidget(widget.id, {
      styles: {
        ...widget.styles,
        [key]: value,
      },
    })
  }

  return (
    <div className="h-full overflow-y-auto p-4 space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-2">עיצוב</h3>
        <p className="text-sm text-gray-600 mb-4">
          התאם את עיצוב האלמנט
        </p>
      </div>

      {/* Typography Section */}
      {(widget.type === 'heading' || widget.type === 'text' || widget.type === 'button') && (
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-700 pb-2 border-b">
            טיפוגרפיה
          </h4>

          <div className="space-y-2">
            <Label>גודל גופן</Label>
            <select
              value={widget.styles.fontSize || '1rem'}
              onChange={(e) => updateStyle('fontSize', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            >
              {FONT_SIZES.map((size) => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label>עובי גופן</Label>
            <select
              value={widget.styles.fontWeight || '400'}
              onChange={(e) => updateStyle('fontWeight', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            >
              {FONT_WEIGHTS.map((weight) => (
                <option key={weight.value} value={weight.value}>
                  {weight.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label>יישור</Label>
            <div className="grid grid-cols-3 gap-2">
              {TEXT_ALIGNS.map((align) => (
                <button
                  key={align.value}
                  onClick={() => updateStyle('textAlign', align.value)}
                  className={`px-3 py-2 border rounded-lg text-sm transition-colors ${
                    widget.styles.textAlign === align.value
                      ? 'bg-primary text-white border-primary'
                      : 'hover:border-primary'
                  }`}
                >
                  {align.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>צבע טקסט</Label>
            <div className="grid grid-cols-6 gap-2 mb-2">
              {COLOR_PRESETS.map((color) => (
                <button
                  key={color}
                  onClick={() => updateStyle('color', color)}
                  className={`w-8 h-8 rounded border-2 ${
                    widget.styles.color === color
                      ? 'border-primary scale-110'
                      : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <Input
              type="text"
              value={widget.styles.color || '#000000'}
              onChange={(e) => updateStyle('color', e.target.value)}
              placeholder="#000000"
            />
          </div>
        </div>
      )}

      {/* Background Section */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-700 pb-2 border-b">
          רקע
        </h4>

        <div className="space-y-2">
          <Label>צבע רקע</Label>
          <div className="grid grid-cols-6 gap-2 mb-2">
            {COLOR_PRESETS.map((color) => (
              <button
                key={color}
                onClick={() => updateStyle('backgroundColor', color)}
                className={`w-8 h-8 rounded border-2 ${
                  widget.styles.backgroundColor === color
                    ? 'border-primary scale-110'
                    : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <Input
            type="text"
            value={widget.styles.backgroundColor || ''}
            onChange={(e) => updateStyle('backgroundColor', e.target.value)}
            placeholder="שקוף"
          />
        </div>
      </div>

      {/* Spacing Section */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-700 pb-2 border-b">
          רווחים
        </h4>

        <div className="space-y-3">
          <div>
            <Label className="text-xs">מרווח חיצוני (Margin)</Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <Input
                type="number"
                placeholder="למעלה"
                value={widget.styles.marginTop || ''}
                onChange={(e) =>
                  updateStyle('marginTop', parseInt(e.target.value) || 0)
                }
              />
              <Input
                type="number"
                placeholder="למטה"
                value={widget.styles.marginBottom || ''}
                onChange={(e) =>
                  updateStyle('marginBottom', parseInt(e.target.value) || 0)
                }
              />
            </div>
          </div>

          <div>
            <Label className="text-xs">מרווח פנימי (Padding)</Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <Input
                type="number"
                placeholder="למעלה"
                value={widget.styles.paddingTop || ''}
                onChange={(e) =>
                  updateStyle('paddingTop', parseInt(e.target.value) || 0)
                }
              />
              <Input
                type="number"
                placeholder="למטה"
                value={widget.styles.paddingBottom || ''}
                onChange={(e) =>
                  updateStyle('paddingBottom', parseInt(e.target.value) || 0)
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Border Section */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-700 pb-2 border-b">
          מסגרת
        </h4>

        <div className="space-y-2">
          <Label>רדיוס פינות</Label>
          <Input
            type="number"
            value={widget.styles.borderRadius || 0}
            onChange={(e) =>
              updateStyle('borderRadius', parseInt(e.target.value) || 0)
            }
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <Label>עובי מסגרת</Label>
          <Input
            type="number"
            value={widget.styles.borderWidth || 0}
            onChange={(e) =>
              updateStyle('borderWidth', parseInt(e.target.value) || 0)
            }
            placeholder="0"
          />
        </div>

        {widget.styles.borderWidth && widget.styles.borderWidth > 0 && (
          <div className="space-y-2">
            <Label>צבע מסגרת</Label>
            <Input
              type="text"
              value={widget.styles.borderColor || '#e2e8f0'}
              onChange={(e) => updateStyle('borderColor', e.target.value)}
              placeholder="#e2e8f0"
            />
          </div>
        )}
      </div>

      {/* Delete Button - Removed, handled by canvas */}
    </div>
  )
}

