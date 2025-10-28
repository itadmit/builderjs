'use client'

import { PanelProps } from '../../types'
import { findWidget, findSection } from '../../utils'
import { useState } from 'react'

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
  
  // Parse fontSize to get value and unit
  const parseFontSize = (fontSize: string | number = '16px') => {
    const str = String(fontSize)
    const match = str.match(/^(\d+(?:\.\d+)?)(px|em|rem)?$/)
    if (match) {
      return {
        value: parseFloat(match[1]),
        unit: match[2] || 'px'
      }
    }
    return { value: 16, unit: 'px' }
  }

  const fontSizeData = parseFontSize(styles.fontSize)
  const [fontUnit, setFontUnit] = useState(fontSizeData.unit)
  
  // Parse minHeight to get value and unit
  const parseMinHeight = (minHeight: string | number = '0px') => {
    const str = String(minHeight)
    const match = str.match(/^(\d+(?:\.\d+)?)(px|vh)?$/)
    if (match) {
      return {
        value: parseFloat(match[1]),
        unit: match[2] || 'px'
      }
    }
    return { value: 0, unit: 'px' }
  }
  
  const minHeightData = parseMinHeight(styles.minHeight)
  const [minHeightUnit, setMinHeightUnit] = useState(minHeightData.unit)

  const updateStyle = (key: string, value: any) => {
    onUpdate({ styles: { ...styles, [key]: value } })
  }
  
  const updateFontSize = (value: number) => {
    updateStyle('fontSize', `${value}${fontUnit}`)
  }
  
  const changeFontUnit = (newUnit: string) => {
    setFontUnit(newUnit)
    const currentValue = parseFontSize(styles.fontSize).value
    // Convert between units
    let newValue = currentValue
    if (fontUnit === 'px' && newUnit === 'em') {
      newValue = currentValue / 16
    } else if (fontUnit === 'em' && newUnit === 'px') {
      newValue = currentValue * 16
    }
    updateStyle('fontSize', `${newValue}${newUnit}`)
  }

  return (
    <div className="p-4 space-y-6">
      {/* Typography */}
      {(selection.type === 'widget') && (
        <div className="space-y-4">
          <h4 className="font-semibold text-sm border-b pb-2">טיפוגרפיה</h4>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium">גודל גופן</label>
              <div className="flex gap-1">
                {['px', 'em', 'rem'].map((unit) => (
                  <button
                    key={unit}
                    onClick={() => changeFontUnit(unit)}
                    className={`px-2 py-0.5 text-xs rounded border ${
                      fontUnit === unit
                        ? 'bg-primary text-white border-primary'
                        : 'border-gray-300 hover:border-primary'
                    }`}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                value={fontSizeData.value}
                onChange={(e) => updateFontSize(parseFloat(e.target.value) || 0)}
                className="w-20 px-2 py-1.5 border rounded text-sm"
                min="0"
                step={fontUnit === 'px' ? '1' : '0.1'}
              />
              <input
                type="range"
                value={fontSizeData.value}
                onChange={(e) => updateFontSize(parseFloat(e.target.value))}
                className="flex-1"
                min={fontUnit === 'px' ? '8' : '0.5'}
                max={fontUnit === 'px' ? '100' : '6'}
                step={fontUnit === 'px' ? '1' : '0.1'}
              />
              <span className="text-xs text-gray-500 w-12">{fontSizeData.value}{fontUnit}</span>
            </div>
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
        
        {/* Background Type Selector for Section */}
        {selection.type === 'section' && (
          <div className="space-y-2">
            <label className="text-xs font-medium">סוג רקע</label>
            <div className="flex gap-2">
              {[
                { value: 'color', label: 'צבע' },
                { value: 'image', label: 'תמונה' },
                { value: 'video', label: 'וידאו' },
              ].map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => updateStyle('backgroundType', value)}
                  className={`flex-1 px-3 py-1.5 rounded text-xs border ${
                    (styles.backgroundType || 'color') === value
                      ? 'bg-primary text-white border-primary'
                      : 'border-gray-300 hover:border-primary'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Color Background */}
        {(selection.type !== 'section' || !styles.backgroundType || styles.backgroundType === 'color') && (
          <div className="space-y-2">
            <label className="text-xs font-medium">צבע רקע</label>
            <input
              type="color"
              value={styles.backgroundColor || '#ffffff'}
              onChange={(e) => updateStyle('backgroundColor', e.target.value)}
              className="w-full h-10 rounded border"
            />
          </div>
        )}
        
        {/* Image Background */}
        {selection.type === 'section' && styles.backgroundType === 'image' && (
          <>
            <div className="space-y-2">
              <label className="text-xs font-medium">URL תמונה</label>
              <input
                type="text"
                value={styles.backgroundImage || ''}
                onChange={(e) => updateStyle('backgroundImage', e.target.value)}
                className="w-full px-3 py-2 border rounded text-sm"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">מיקום</label>
              <select
                value={styles.backgroundPosition || 'center center'}
                onChange={(e) => updateStyle('backgroundPosition', e.target.value)}
                className="w-full px-2 py-1.5 border rounded text-sm"
              >
                <option value="center center">מרכז</option>
                <option value="top center">למעלה במרכז</option>
                <option value="bottom center">למטה במרכז</option>
                <option value="center left">מרכז שמאל</option>
                <option value="center right">מרכז ימין</option>
                <option value="top left">למעלה שמאל</option>
                <option value="top right">למעלה ימין</option>
                <option value="bottom left">למטה שמאל</option>
                <option value="bottom right">למטה ימין</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">גודל</label>
              <select
                value={styles.backgroundSize || 'cover'}
                onChange={(e) => updateStyle('backgroundSize', e.target.value)}
                className="w-full px-2 py-1.5 border rounded text-sm"
              >
                <option value="cover">כיסוי מלא (Cover)</option>
                <option value="contain">התאמה (Contain)</option>
                <option value="auto">אוטומטי</option>
                <option value="100% 100%">מתיחה 100%</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">חזרה</label>
              <select
                value={styles.backgroundRepeat || 'no-repeat'}
                onChange={(e) => updateStyle('backgroundRepeat', e.target.value)}
                className="w-full px-2 py-1.5 border rounded text-sm"
              >
                <option value="no-repeat">ללא</option>
                <option value="repeat">חזרה</option>
                <option value="repeat-x">חזרה אופקית</option>
                <option value="repeat-y">חזרה אנכית</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">שכבת צבע (Overlay)</label>
              <input
                type="color"
                value={styles.backgroundOverlay || '#00000000'}
                onChange={(e) => updateStyle('backgroundOverlay', e.target.value)}
                className="w-full h-10 rounded border"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">שקיפות Overlay: {((styles.backgroundOverlayOpacity || 0) * 100).toFixed(0)}%</label>
              <input
                type="range"
                value={styles.backgroundOverlayOpacity || 0}
                onChange={(e) => updateStyle('backgroundOverlayOpacity', parseFloat(e.target.value))}
                className="w-full"
                min="0"
                max="1"
                step="0.01"
              />
            </div>
          </>
        )}
        
        {/* Video Background */}
        {selection.type === 'section' && styles.backgroundType === 'video' && (
          <>
            <div className="space-y-2">
              <label className="text-xs font-medium">URL וידאו</label>
              <input
                type="text"
                value={styles.backgroundVideo || ''}
                onChange={(e) => updateStyle('backgroundVideo', e.target.value)}
                className="w-full px-3 py-2 border rounded text-sm"
                placeholder="https://example.com/video.mp4"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={styles.backgroundVideoLoop !== false}
                  onChange={(e) => updateStyle('backgroundVideoLoop', e.target.checked)}
                />
                <span className="text-xs">לולאה</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={styles.backgroundVideoMuted !== false}
                  onChange={(e) => updateStyle('backgroundVideoMuted', e.target.checked)}
                />
                <span className="text-xs">השתק</span>
              </label>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">תמונת חלופית (Fallback)</label>
              <input
                type="text"
                value={styles.backgroundVideoFallback || ''}
                onChange={(e) => updateStyle('backgroundVideoFallback', e.target.value)}
                className="w-full px-3 py-2 border rounded text-sm"
                placeholder="https://example.com/fallback.jpg"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">שכבת צבע (Overlay)</label>
              <input
                type="color"
                value={styles.backgroundOverlay || '#00000000'}
                onChange={(e) => updateStyle('backgroundOverlay', e.target.value)}
                className="w-full h-10 rounded border"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">שקיפות Overlay: {((styles.backgroundOverlayOpacity || 0) * 100).toFixed(0)}%</label>
              <input
                type="range"
                value={styles.backgroundOverlayOpacity || 0}
                onChange={(e) => updateStyle('backgroundOverlayOpacity', parseFloat(e.target.value))}
                className="w-full"
                min="0"
                max="1"
                step="0.01"
              />
            </div>
          </>
        )}
      </div>

      {/* Alignment for Section/Column */}
      {(selection.type === 'section' || selection.type === 'column') && (
        <div className="space-y-4">
          <h4 className="font-semibold text-sm border-b pb-2">מיקום</h4>
          
          <div className="space-y-2">
            <label className="text-xs font-medium">יישור תוכן בסקשן</label>
            <div className="flex gap-2">
              {[
                { value: 'flex-start', label: 'למעלה', icon: '↑' },
                { value: 'center', label: 'מרכז', icon: '↕' },
                { value: 'flex-end', label: 'למטה', icon: '↓' },
              ].map(({ value, label, icon }) => (
                <button
                  key={value}
                  onClick={() => updateStyle('alignItems', value)}
                  className={`flex-1 px-2 py-2 rounded text-xs border flex flex-col items-center gap-1 ${
                    styles.alignItems === value
                      ? 'bg-primary text-white border-primary'
                      : 'border-gray-300 hover:border-primary'
                  }`}
                >
                  <span className="text-lg">{icon}</span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium">יישור טקסט</label>
            <div className="flex gap-2">
              {[
                { value: 'right', label: 'ימין' },
                { value: 'center', label: 'מרכז' },
                { value: 'left', label: 'שמאל' },
                { value: 'justify', label: 'מוצדק' },
              ].map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => updateStyle('textAlign', value)}
                  className={`flex-1 px-2 py-1.5 rounded text-xs border ${
                    styles.textAlign === value
                      ? 'bg-primary text-white border-primary'
                      : 'border-gray-300 hover:border-primary'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Dimensions for Section */}
      {selection.type === 'section' && (
        <div className="space-y-4">
          <h4 className="font-semibold text-sm border-b pb-2">מימדים</h4>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium">גובה מינימום</label>
              <div className="flex gap-1">
                {['px', 'vh'].map((unit) => (
                  <button
                    key={unit}
                    onClick={() => {
                      setMinHeightUnit(unit)
                      const currentValue = parseMinHeight(styles.minHeight).value
                      updateStyle('minHeight', `${currentValue}${unit}`)
                    }}
                    className={`px-2 py-0.5 text-xs rounded border ${
                      minHeightUnit === unit
                        ? 'bg-primary text-white border-primary'
                        : 'border-gray-300 hover:border-primary'
                    }`}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                value={minHeightData.value}
                onChange={(e) => updateStyle('minHeight', `${parseFloat(e.target.value) || 0}${minHeightUnit}`)}
                className="w-20 px-2 py-1.5 border rounded text-sm"
                min="0"
                step={minHeightUnit === 'vh' ? '1' : '10'}
              />
              <input
                type="range"
                value={minHeightData.value}
                onChange={(e) => updateStyle('minHeight', `${parseFloat(e.target.value)}${minHeightUnit}`)}
                className="flex-1"
                min="0"
                max={minHeightUnit === 'vh' ? '100' : '1000'}
                step={minHeightUnit === 'vh' ? '1' : '10'}
              />
              <span className="text-xs text-gray-500 w-16">{minHeightData.value}{minHeightUnit}</span>
            </div>
          </div>
        </div>
      )}

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

