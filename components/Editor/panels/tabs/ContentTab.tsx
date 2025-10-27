'use client'

import { PanelProps } from '../../types'
import { findWidget, findSection, findColumn } from '../../utils'

export default function ContentTab({ selection, sections, viewport, onUpdate }: PanelProps) {
  if (selection.type === 'section') {
    const section = findSection(sections, selection.id!)
    if (!section) return <div className="p-4">Section not found</div>

    return (
      <div className="p-4 space-y-4">
        <h3 className="font-semibold">הגדרות סקשן</h3>
        <div className="space-y-2">
          <label className="text-sm font-medium">רווח בין עמודות (px)</label>
          <input
            type="number"
            value={section.gap || 20}
            onChange={(e) => onUpdate({ gap: parseInt(e.target.value) || 20 })}
            className="w-full px-3 py-2 border rounded-lg"
            min="0"
            max="100"
          />
        </div>
      </div>
    )
  }

  if (selection.type === 'widget') {
    const result = findWidget(sections, selection.id!)
    if (!result) return <div className="p-4">Widget not found</div>
    
    const { widget } = result

    return (
      <div className="p-4 space-y-4">
        <h3 className="font-semibold">עריכת תוכן - {widget.type}</h3>
        
        {widget.type === 'heading' && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">טקסט</label>
              <input
                type="text"
                value={widget.content.text || ''}
                onChange={(e) => onUpdate({ content: { ...widget.content, text: e.target.value } })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">תג HTML</label>
              <select
                value={widget.content.tag || 'h2'}
                onChange={(e) => onUpdate({ content: { ...widget.content, tag: e.target.value } })}
                className="w-full px-3 py-2 border rounded-lg"
              >
                {['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map(tag => (
                  <option key={tag} value={tag}>{tag.toUpperCase()}</option>
                ))}
              </select>
            </div>
          </>
        )}

        {widget.type === 'text' && (
          <div className="space-y-2">
            <label className="text-sm font-medium">טקסט</label>
            <textarea
              value={widget.content.text || ''}
              onChange={(e) => onUpdate({ content: { ...widget.content, text: e.target.value } })}
              className="w-full px-3 py-2 border rounded-lg"
              rows={6}
            />
          </div>
        )}

        {widget.type === 'button' && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">טקסט הכפתור</label>
              <input
                type="text"
                value={widget.content.text || ''}
                onChange={(e) => onUpdate({ content: { ...widget.content, text: e.target.value } })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">קישור</label>
              <input
                type="text"
                value={widget.content.url || ''}
                onChange={(e) => onUpdate({ content: { ...widget.content, url: e.target.value } })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="https://"
              />
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={widget.content.openInNewTab || false}
                onChange={(e) => onUpdate({ content: { ...widget.content, openInNewTab: e.target.checked } })}
              />
              <span className="text-sm">פתח בכרטיסייה חדשה</span>
            </label>
          </>
        )}

        {widget.type === 'image' && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">URL תמונה</label>
              <input
                type="text"
                value={widget.content.url || ''}
                onChange={(e) => onUpdate({ content: { ...widget.content, url: e.target.value } })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">טקסט חלופי</label>
              <input
                type="text"
                value={widget.content.alt || ''}
                onChange={(e) => onUpdate({ content: { ...widget.content, alt: e.target.value } })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </>
        )}

        <p className="text-xs text-gray-500 mt-4">
          לעריכה מלאה של כל סוגי התוכן - פנה ללשונית עיצוב ומתקדם
        </p>
      </div>
    )
  }

  return (
    <div className="p-4 text-sm text-gray-500">
      בחר אלמנט לעריכה
    </div>
  )
}

