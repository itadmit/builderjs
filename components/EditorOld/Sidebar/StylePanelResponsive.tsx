'use client'

import { Widget, ViewportMode } from '../types'
import {
  FONT_SIZES,
  FONT_WEIGHTS,
  TEXT_ALIGNS,
  COLOR_PRESETS,
} from '../constants'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import MobileIndicator from './MobileIndicator'
import { hasMobileOverride } from '../utils'

interface StylePanelResponsiveProps {
  widget: Widget | null
  viewportMode: ViewportMode
  onUpdateWidget: (widgetId: string, updates: Partial<Widget>) => void
}

export default function StylePanelResponsive({
  widget,
  viewportMode,
  onUpdateWidget,
}: StylePanelResponsiveProps) {
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

  // Initialize responsive styles if not exists
  if (!widget.responsiveStyles) {
    widget.responsiveStyles = {
      desktop: { ...widget.styles },
      mobile: {},
    }
  }

  const updateStyle = (key: string, value: any) => {
    const currentResponsive = widget.responsiveStyles || {
      desktop: { ...widget.styles },
      mobile: {},
    }

    if (viewportMode === 'desktop') {
      // Update desktop styles
      onUpdateWidget(widget.id, {
        responsiveStyles: {
          ...currentResponsive,
          desktop: {
            ...currentResponsive.desktop,
            [key]: value,
          },
        },
      })
    } else {
      // Update mobile overrides
      onUpdateWidget(widget.id, {
        responsiveStyles: {
          ...currentResponsive,
          mobile: {
            ...(currentResponsive.mobile || {}),
            [key]: value,
          },
        },
      })
    }
  }

  const getCurrentValue = (key: string) => {
    const responsive = widget.responsiveStyles
    if (!responsive) return widget.styles[key as keyof typeof widget.styles]

    if (viewportMode === 'mobile' && responsive.mobile?.[key as keyof typeof responsive.mobile] !== undefined) {
      return responsive.mobile[key as keyof typeof responsive.mobile]
    }
    return responsive.desktop[key as keyof typeof responsive.desktop]
  }

  return (
    <div className="h-full overflow-y-auto p-4 space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-2">עיצוב</h3>
        <p className="text-sm text-gray-600 mb-4">
          {viewportMode === 'mobile' 
            ? 'עריכת סגנונות למובייל (ברירת מחדל מהמחשב)'
            : 'עריכת סגנונות למחשב'}
        </p>
      </div>

      {/* Typography Section */}
      {(widget.type === 'heading' || widget.type === 'text' || widget.type === 'button') && (
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-700 pb-2 border-b">
            טיפוגרפיה
          </h4>

          <div className="space-y-2">
            <Label className="flex items-center">
              גודל גופן
              <MobileIndicator hasMobileValue={viewportMode === 'mobile' && hasMobileOverride(widget, 'fontSize')} />
            </Label>
            <select
              value={getCurrentValue('fontSize') || '1rem'}
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
            <Label className="flex items-center">
              עובי גופן
              <MobileIndicator hasMobileValue={viewportMode === 'mobile' && hasMobileOverride(widget, 'fontWeight')} />
            </Label>
            <select
              value={getCurrentValue('fontWeight') || '400'}
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
            <Label className="flex items-center">
              יישור
              <MobileIndicator hasMobileValue={viewportMode === 'mobile' && hasMobileOverride(widget, 'textAlign')} />
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {TEXT_ALIGNS.map((align) => (
                <button
                  key={align.value}
                  onClick={() => updateStyle('textAlign', align.value)}
                  className={`px-3 py-2 border rounded-lg text-sm transition-colors ${
                    getCurrentValue('textAlign') === align.value
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
            <Label className="flex items-center">
              צבע טקסט
              <MobileIndicator hasMobileValue={viewportMode === 'mobile' && hasMobileOverride(widget, 'color')} />
            </Label>
            <div className="grid grid-cols-6 gap-2 mb-2">
              {COLOR_PRESETS.map((color) => (
                <button
                  key={color}
                  onClick={() => updateStyle('color', color)}
                  className={`w-8 h-8 rounded border-2 ${
                    getCurrentValue('color') === color
                      ? 'border-primary scale-110'
                      : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <Input
              type="text"
              value={getCurrentValue('color') || '#000000'}
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
          <Label className="flex items-center">
            צבע רקע
            <MobileIndicator hasMobileValue={viewportMode === 'mobile' && hasMobileOverride(widget, 'backgroundColor')} />
          </Label>
          <div className="grid grid-cols-6 gap-2 mb-2">
            {COLOR_PRESETS.map((color) => (
              <button
                key={color}
                onClick={() => updateStyle('backgroundColor', color)}
                className={`w-8 h-8 rounded border-2 ${
                  getCurrentValue('backgroundColor') === color
                    ? 'border-primary scale-110'
                    : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <Input
            type="text"
            value={getCurrentValue('backgroundColor') || ''}
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
            <Label className="text-xs flex items-center">
              מרווח חיצוני (Margin)
              <MobileIndicator hasMobileValue={viewportMode === 'mobile' && (hasMobileOverride(widget, 'marginTop') || hasMobileOverride(widget, 'marginBottom'))} />
            </Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <Input
                type="number"
                placeholder="למעלה"
                value={getCurrentValue('marginTop') || ''}
                onChange={(e) => updateStyle('marginTop', parseInt(e.target.value) || 0)}
              />
              <Input
                type="number"
                placeholder="למטה"
                value={getCurrentValue('marginBottom') || ''}
                onChange={(e) => updateStyle('marginBottom', parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          <div>
            <Label className="text-xs flex items-center">
              מרווח פנימי (Padding)
              <MobileIndicator hasMobileValue={viewportMode === 'mobile' && (hasMobileOverride(widget, 'paddingTop') || hasMobileOverride(widget, 'paddingBottom'))} />
            </Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <Input
                type="number"
                placeholder="למעלה"
                value={getCurrentValue('paddingTop') || ''}
                onChange={(e) => updateStyle('paddingTop', parseInt(e.target.value) || 0)}
              />
              <Input
                type="number"
                placeholder="למטה"
                value={getCurrentValue('paddingBottom') || ''}
                onChange={(e) => updateStyle('paddingBottom', parseInt(e.target.value) || 0)}
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
          <Label className="flex items-center">
            רדיוס פינות
            <MobileIndicator hasMobileValue={viewportMode === 'mobile' && hasMobileOverride(widget, 'borderRadius')} />
          </Label>
          <Input
            type="number"
            value={getCurrentValue('borderRadius') || 0}
            onChange={(e) => updateStyle('borderRadius', parseInt(e.target.value) || 0)}
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <Label className="flex items-center">
            עובי מסגרת
            <MobileIndicator hasMobileValue={viewportMode === 'mobile' && hasMobileOverride(widget, 'borderWidth')} />
          </Label>
          <Input
            type="number"
            value={getCurrentValue('borderWidth') || 0}
            onChange={(e) => updateStyle('borderWidth', parseInt(e.target.value) || 0)}
            placeholder="0"
          />
        </div>

        {getCurrentValue('borderWidth') && getCurrentValue('borderWidth') > 0 && (
          <div className="space-y-2">
            <Label className="flex items-center">
              צבע מסגרת
              <MobileIndicator hasMobileValue={viewportMode === 'mobile' && hasMobileOverride(widget, 'borderColor')} />
            </Label>
            <Input
              type="text"
              value={getCurrentValue('borderColor') || '#e2e8f0'}
              onChange={(e) => updateStyle('borderColor', e.target.value)}
              placeholder="#e2e8f0"
            />
          </div>
        )}
      </div>
    </div>
  )
}

