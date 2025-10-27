'use client'

import { Widget } from '../types'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface ContentPanelProps {
  widget: Widget | null
  onUpdateWidget: (widgetId: string, updates: Partial<Widget>) => void
}

export default function ContentPanel({ widget, onUpdateWidget }: ContentPanelProps) {
  if (!widget) {
    return (
      <div className="h-full flex items-center justify-center p-4 text-center text-gray-500">
        <div>
          <p className="text-lg mb-2">בחר אלמנט</p>
          <p className="text-sm">לחץ על אלמנט בעמוד כדי לערוך את התוכן שלו</p>
        </div>
      </div>
    )
  }

  const updateContent = (updates: any) => {
    onUpdateWidget(widget.id, {
      content: typeof widget.content === 'object' ? { ...widget.content, ...updates } : updates,
    })
  }

  const updateDirectContent = (value: any) => {
    onUpdateWidget(widget.id, { content: value })
  }

  return (
    <div className="h-full overflow-y-auto p-4 space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-2">תוכן</h3>
        <p className="text-sm text-gray-600 mb-4">
          ערוך את תוכן האלמנט
        </p>
      </div>

      {/* Heading Widget */}
      {widget.type === 'heading' && (
        <div className="space-y-2">
          <Label>טקסט הכותרת</Label>
          <Input
            value={widget.content || ''}
            onChange={(e) => updateDirectContent(e.target.value)}
            placeholder="כותרת..."
          />
        </div>
      )}

      {/* Text Widget */}
      {widget.type === 'text' && (
        <div className="space-y-2">
          <Label>תוכן הטקסט</Label>
          <Textarea
            value={widget.content || ''}
            onChange={(e) => updateDirectContent(e.target.value)}
            placeholder="טקסט..."
            rows={6}
          />
        </div>
      )}

      {/* Button Widget */}
      {widget.type === 'button' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>טקסט הכפתור</Label>
            <Input
              value={widget.content?.text || ''}
              onChange={(e) => updateContent({ text: e.target.value })}
              placeholder="לחץ כאן"
            />
          </div>
          <div className="space-y-2">
            <Label>קישור</Label>
            <Input
              value={widget.content?.url || ''}
              onChange={(e) => updateContent({ url: e.target.value })}
              placeholder="https://..."
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="newTab"
              checked={widget.content?.openInNewTab || false}
              onChange={(e) => updateContent({ openInNewTab: e.target.checked })}
              className="rounded"
            />
            <Label htmlFor="newTab" className="cursor-pointer">
              פתח בכרטיסייה חדשה
            </Label>
          </div>
        </div>
      )}

      {/* Image Widget */}
      {widget.type === 'image' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>כתובת התמונה (URL)</Label>
            <Input
              value={widget.content?.url || ''}
              onChange={(e) => updateContent({ url: e.target.value })}
              placeholder="https://..."
            />
          </div>
          <div className="space-y-2">
            <Label>טקסט חלופי (ALT)</Label>
            <Input
              value={widget.content?.alt || ''}
              onChange={(e) => updateContent({ alt: e.target.value })}
              placeholder="תיאור התמונה"
            />
          </div>
          <div className="space-y-2">
            <Label>קישור (אופציונלי)</Label>
            <Input
              value={widget.content?.link || ''}
              onChange={(e) => updateContent({ link: e.target.value })}
              placeholder="https://..."
            />
          </div>
          {widget.content?.url && (
            <div className="border rounded-lg p-2">
              <img
                src={widget.content.url}
                alt="תצוגה מקדימה"
                className="w-full h-auto rounded"
              />
            </div>
          )}
        </div>
      )}

      {/* Video Widget */}
      {widget.type === 'video' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>קישור לוידאו</Label>
            <Input
              value={widget.content?.url || ''}
              onChange={(e) => updateContent({ url: e.target.value })}
              placeholder="https://youtube.com/watch?v=..."
            />
            <p className="text-xs text-gray-500">
              תומך ב-YouTube, Vimeo או קישור ישיר
            </p>
          </div>
        </div>
      )}

      {/* Form Widget */}
      {widget.type === 'form' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>טקסט כפתור השליחה</Label>
            <Input
              value={widget.content?.submitText || 'שלח'}
              onChange={(e) => updateContent({ submitText: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>שדות הטופס</Label>
            <div className="space-y-2">
              {['name', 'email', 'phone', 'message'].map((field) => (
                <div key={field} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`field-${field}`}
                    checked={widget.content?.fields?.includes(field) || false}
                    onChange={(e) => {
                      const currentFields = widget.content?.fields || []
                      const newFields = e.target.checked
                        ? [...currentFields, field]
                        : currentFields.filter((f: string) => f !== field)
                      updateContent({ fields: newFields })
                    }}
                    className="rounded"
                  />
                  <Label htmlFor={`field-${field}`} className="cursor-pointer">
                    {field === 'name' && 'שם'}
                    {field === 'email' && 'אימייל'}
                    {field === 'phone' && 'טלפון'}
                    {field === 'message' && 'הודעה'}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Icon Widget */}
      {widget.type === 'icon' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>אייקון (אימוג'י)</Label>
            <Input
              value={widget.content?.icon || '⭐'}
              onChange={(e) => updateContent({ icon: e.target.value })}
              placeholder="⭐"
            />
            <p className="text-xs text-gray-500">
              הדבק אימוג'י או סמל
            </p>
          </div>
        </div>
      )}

      {/* Spacer Widget */}
      {widget.type === 'spacer' && (
        <div className="space-y-2">
          <Label>גובה הרווח (px)</Label>
          <Input
            type="number"
            value={parseInt(widget.styles.height || '40') || 40}
            onChange={(e) => {
              onUpdateWidget(widget.id, {
                styles: { ...widget.styles, height: `${e.target.value}px` },
              })
            }}
            min="10"
            max="200"
          />
        </div>
      )}

      {/* Container/Columns Widget */}
      {widget.type === 'container' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>מספר עמודות</Label>
            <div className="flex gap-2">
              {[2, 3, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    const currentItems = widget.content?.items || []
                    const newItems = Array.from({ length: num }, (_, i) => 
                      currentItems[i] || { content: `עמודה ${i + 1}` }
                    )
                    updateContent({ columns: num, items: newItems })
                  }}
                  className={`flex-1 px-4 py-2 rounded-lg border-2 transition-colors ${
                    (widget.content?.columns || 2) === num
                      ? 'border-primary bg-primary text-white'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>רווח בין עמודות (px)</Label>
            <Input
              type="number"
              value={widget.content?.gap || 16}
              onChange={(e) => updateContent({ gap: parseInt(e.target.value) || 16 })}
              min="0"
              max="64"
            />
          </div>

          <div className="space-y-3">
            <Label>תוכן העמודות</Label>
            {(widget.content?.items || []).map((item: any, index: number) => (
              <div key={index} className="space-y-3 p-4 bg-white border-2 border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold text-gray-700">
                    עמודה {index + 1}
                  </Label>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-xs text-gray-600">תוכן</Label>
                  <Textarea
                    value={item.content || ''}
                    onChange={(e) => {
                      const newItems = [...(widget.content?.items || [])]
                      newItems[index] = { ...newItems[index], content: e.target.value }
                      updateContent({ items: newItems })
                    }}
                    placeholder={`הכנס טקסט, רשימות, או תוכן מעוצב...\n\nדוגמה:\n✓ יתרון 1\n✓ יתרון 2\n✓ יתרון 3`}
                    rows={5}
                    className="text-sm font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs text-gray-600">יישור טקסט</Label>
                    <select
                      value={item.textAlign || 'right'}
                      onChange={(e) => {
                        const newItems = [...(widget.content?.items || [])]
                        newItems[index] = { ...newItems[index], textAlign: e.target.value }
                        updateContent({ items: newItems })
                      }}
                      className="w-full px-2 py-1 text-xs border rounded"
                    >
                      <option value="right">ימין</option>
                      <option value="center">מרכז</option>
                      <option value="left">שמאל</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs text-gray-600">צבע רקע</Label>
                    <Input
                      type="color"
                      value={item.backgroundColor || '#ffffff'}
                      onChange={(e) => {
                        const newItems = [...(widget.content?.items || [])]
                        newItems[index] = { ...newItems[index], backgroundColor: e.target.value }
                        updateContent({ items: newItems })
                      }}
                      className="h-8 p-1"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-blue-50 rounded-lg text-xs text-gray-700">
            <p className="font-medium mb-1">💡 טיפ:</p>
            <p>
              במצב מובייל, העמודות יוצגו אחת מתחת לשנייה אוטומטית
            </p>
          </div>
        </div>
      )}

      {/* Divider Widget */}
      {widget.type === 'divider' && (
        <div className="space-y-2">
          <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-700">
            <p>
              קו מפריד אינו מכיל תוכן. השתמש בלשונית "עיצוב" לשינוי עובי, צבע וריווחים.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

