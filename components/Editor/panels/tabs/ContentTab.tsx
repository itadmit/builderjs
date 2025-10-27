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
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">טקסט חלופי</label>
              <input
                type="text"
                value={widget.content.alt || ''}
                onChange={(e) => onUpdate({ content: { ...widget.content, alt: e.target.value } })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="תיאור התמונה"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">קישור (אופציונלי)</label>
              <input
                type="text"
                value={widget.content.link || ''}
                onChange={(e) => onUpdate({ content: { ...widget.content, link: e.target.value } })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="https://"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">כיתוב (אופציונלי)</label>
              <input
                type="text"
                value={widget.content.caption || ''}
                onChange={(e) => onUpdate({ content: { ...widget.content, caption: e.target.value } })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="כיתוב לתמונה"
              />
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={widget.content.lightbox || false}
                onChange={(e) => onUpdate({ content: { ...widget.content, lightbox: e.target.checked } })}
              />
              <span className="text-sm">פתח בגדול בלחיצה</span>
            </label>
          </>
        )}

        {widget.type === 'video' && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">סוג וידאו</label>
              <select
                value={widget.content.type || 'youtube'}
                onChange={(e) => onUpdate({ content: { ...widget.content, type: e.target.value } })}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="youtube">YouTube</option>
                <option value="vimeo">Vimeo</option>
                <option value="direct">קישור ישיר</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">URL וידאו</label>
              <input
                type="text"
                value={widget.content.url || ''}
                onChange={(e) => onUpdate({ content: { ...widget.content, url: e.target.value } })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={widget.content.autoplay || false}
                  onChange={(e) => onUpdate({ content: { ...widget.content, autoplay: e.target.checked } })}
                />
                <span className="text-sm">הפעלה אוטומטית</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={widget.content.muted || false}
                  onChange={(e) => onUpdate({ content: { ...widget.content, muted: e.target.checked } })}
                />
                <span className="text-sm">השתק</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={widget.content.loop || false}
                  onChange={(e) => onUpdate({ content: { ...widget.content, loop: e.target.checked } })}
                />
                <span className="text-sm">לולאה</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={widget.content.controls !== false}
                  onChange={(e) => onUpdate({ content: { ...widget.content, controls: e.target.checked } })}
                />
                <span className="text-sm">הצג פקדים</span>
              </label>
            </div>
          </>
        )}

        {widget.type === 'icon' && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">אייקון (אימוג'י או טקסט)</label>
              <input
                type="text"
                value={widget.content.icon || '⭐'}
                onChange={(e) => onUpdate({ content: { ...widget.content, icon: e.target.value } })}
                className="w-full px-3 py-2 border rounded-lg text-4xl text-center"
                placeholder="⭐"
              />
            </div>
            <p className="text-xs text-gray-500">
              השתמש באימוג'י או בטקסט קצר
            </p>
          </>
        )}

        {widget.type === 'accordion' && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">סגנון אייקון</label>
              <select
                value={widget.content.icon || 'chevron'}
                onChange={(e) => onUpdate({ content: { ...widget.content, icon: e.target.value } })}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="chevron">חץ</option>
                <option value="plus">פלוס/מינוס</option>
              </select>
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={widget.content.allowMultiple || false}
                onChange={(e) => onUpdate({ content: { ...widget.content, allowMultiple: e.target.checked } })}
              />
              <span className="text-sm">אפשר פתיחה של מספר פריטים</span>
            </label>
            <div className="space-y-3 mt-4">
              <label className="text-sm font-medium">פריטים:</label>
              {(widget.content.items || []).map((item: any, index: number) => (
                <div key={item.id} className="p-3 border rounded-lg space-y-2">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const newItems = [...widget.content.items]
                      newItems[index] = { ...item, title: e.target.value }
                      onUpdate({ content: { ...widget.content, items: newItems } })
                    }}
                    className="w-full px-3 py-2 border rounded-lg font-medium"
                    placeholder="כותרת"
                  />
                  <textarea
                    value={item.content}
                    onChange={(e) => {
                      const newItems = [...widget.content.items]
                      newItems[index] = { ...item, content: e.target.value }
                      onUpdate({ content: { ...widget.content, items: newItems } })
                    }}
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={3}
                    placeholder="תוכן"
                  />
                  <button
                    onClick={() => {
                      const newItems = widget.content.items.filter((_: any, i: number) => i !== index)
                      onUpdate({ content: { ...widget.content, items: newItems } })
                    }}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    מחק פריט
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newItems = [...(widget.content.items || []), {
                    id: `item-${Date.now()}`,
                    title: 'פריט חדש',
                    content: 'תוכן הפריט',
                    isOpen: false
                  }]
                  onUpdate({ content: { ...widget.content, items: newItems } })
                }}
                className="w-full px-3 py-2 border-2 border-dashed border-primary rounded-lg text-primary hover:bg-primary/5 transition-colors"
              >
                + הוסף פריט
              </button>
            </div>
          </>
        )}

        {widget.type === 'tabs' && (
          <>
            <div className="space-y-3">
              <label className="text-sm font-medium">לשוניות:</label>
              {(widget.content.tabs || []).map((tab: any, index: number) => (
                <div key={tab.id} className="p-3 border rounded-lg space-y-2">
                  <input
                    type="text"
                    value={tab.title}
                    onChange={(e) => {
                      const newTabs = [...widget.content.tabs]
                      newTabs[index] = { ...tab, title: e.target.value }
                      onUpdate({ content: { ...widget.content, tabs: newTabs } })
                    }}
                    className="w-full px-3 py-2 border rounded-lg font-medium"
                    placeholder="כותרת לשונית"
                  />
                  <textarea
                    value={tab.content}
                    onChange={(e) => {
                      const newTabs = [...widget.content.tabs]
                      newTabs[index] = { ...tab, content: e.target.value }
                      onUpdate({ content: { ...widget.content, tabs: newTabs } })
                    }}
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={3}
                    placeholder="תוכן"
                  />
                  <button
                    onClick={() => {
                      const newTabs = widget.content.tabs.filter((_: any, i: number) => i !== index)
                      onUpdate({ content: { ...widget.content, tabs: newTabs } })
                    }}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    מחק לשונית
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newTabs = [...(widget.content.tabs || []), {
                    id: `tab-${Date.now()}`,
                    title: 'לשונית חדשה',
                    content: 'תוכן הלשונית',
                  }]
                  onUpdate({ content: { ...widget.content, tabs: newTabs } })
                }}
                className="w-full px-3 py-2 border-2 border-dashed border-primary rounded-lg text-primary hover:bg-primary/5 transition-colors"
              >
                + הוסף לשונית
              </button>
            </div>
          </>
        )}

        {widget.type === 'counter' && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">מספר יעד</label>
              <input
                type="number"
                value={widget.content.endValue || 100}
                onChange={(e) => onUpdate({ content: { ...widget.content, endValue: parseInt(e.target.value) || 0 } })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">משך אנימציה (שניות)</label>
              <input
                type="number"
                value={widget.content.duration || 2}
                onChange={(e) => onUpdate({ content: { ...widget.content, duration: parseFloat(e.target.value) || 2 } })}
                className="w-full px-3 py-2 border rounded-lg"
                step="0.1"
                min="0.5"
                max="10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">קידומת (אופציונלי)</label>
              <input
                type="text"
                value={widget.content.prefix || ''}
                onChange={(e) => onUpdate({ content: { ...widget.content, prefix: e.target.value } })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="$"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">סיומת (אופציונלי)</label>
              <input
                type="text"
                value={widget.content.suffix || ''}
                onChange={(e) => onUpdate({ content: { ...widget.content, suffix: e.target.value } })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="+"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">כותרת (אופציונלי)</label>
              <input
                type="text"
                value={widget.content.title || ''}
                onChange={(e) => onUpdate({ content: { ...widget.content, title: e.target.value } })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="לקוחות מרוצים"
              />
            </div>
          </>
        )}

        {widget.type === 'progress' && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">כותרת</label>
              <input
                type="text"
                value={widget.content.title || ''}
                onChange={(e) => onUpdate({ content: { ...widget.content, title: e.target.value } })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="שם הכישור"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">אחוז: {widget.content.percentage || 0}%</label>
              <input
                type="range"
                value={widget.content.percentage || 0}
                onChange={(e) => onUpdate({ content: { ...widget.content, percentage: parseInt(e.target.value) } })}
                className="w-full"
                min="0"
                max="100"
              />
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={widget.content.showPercentage !== false}
                onChange={(e) => onUpdate({ content: { ...widget.content, showPercentage: e.target.checked } })}
              />
              <span className="text-sm">הצג אחוז</span>
            </label>
          </>
        )}

        {widget.type === 'social-icons' && (
          <>
            <div className="space-y-3">
              <label className="text-sm font-medium">רשתות חברתיות:</label>
              {(widget.content.icons || []).map((icon: any, index: number) => (
                <div key={index} className="p-3 border rounded-lg space-y-2">
                  <select
                    value={icon.platform}
                    onChange={(e) => {
                      const newIcons = [...widget.content.icons]
                      newIcons[index] = { ...icon, platform: e.target.value }
                      onUpdate({ content: { ...widget.content, icons: newIcons } })
                    }}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="facebook">Facebook</option>
                    <option value="instagram">Instagram</option>
                    <option value="twitter">Twitter</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="youtube">YouTube</option>
                    <option value="tiktok">TikTok</option>
                    <option value="whatsapp">WhatsApp</option>
                  </select>
                  <input
                    type="text"
                    value={icon.url}
                    onChange={(e) => {
                      const newIcons = [...widget.content.icons]
                      newIcons[index] = { ...icon, url: e.target.value }
                      onUpdate({ content: { ...widget.content, icons: newIcons } })
                    }}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="https://"
                  />
                  <button
                    onClick={() => {
                      const newIcons = widget.content.icons.filter((_: any, i: number) => i !== index)
                      onUpdate({ content: { ...widget.content, icons: newIcons } })
                    }}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    מחק
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newIcons = [...(widget.content.icons || []), {
                    platform: 'facebook',
                    url: 'https://facebook.com'
                  }]
                  onUpdate({ content: { ...widget.content, icons: newIcons } })
                }}
                className="w-full px-3 py-2 border-2 border-dashed border-primary rounded-lg text-primary hover:bg-primary/5 transition-colors"
              >
                + הוסף רשת חברתית
              </button>
            </div>
          </>
        )}

        {widget.type === 'testimonial' && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">תוכן המלצה</label>
              <textarea
                value={widget.content.quote || ''}
                onChange={(e) => onUpdate({ content: { ...widget.content, quote: e.target.value } })}
                className="w-full px-3 py-2 border rounded-lg"
                rows={4}
                placeholder="המלצה מדהימה..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">שם</label>
              <input
                type="text"
                value={widget.content.name || ''}
                onChange={(e) => onUpdate({ content: { ...widget.content, name: e.target.value } })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="יוחנן כהן"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">תפקיד / חברה</label>
              <input
                type="text"
                value={widget.content.position || ''}
                onChange={(e) => onUpdate({ content: { ...widget.content, position: e.target.value } })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="מנכ״ל, חברה בע״מ"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">תמונה (URL)</label>
              <input
                type="text"
                value={widget.content.image || ''}
                onChange={(e) => onUpdate({ content: { ...widget.content, image: e.target.value } })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="https://"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">דירוג (כוכבים)</label>
              <input
                type="number"
                value={widget.content.rating || 5}
                onChange={(e) => onUpdate({ content: { ...widget.content, rating: parseInt(e.target.value) || 5 } })}
                className="w-full px-3 py-2 border rounded-lg"
                min="1"
                max="5"
              />
            </div>
          </>
        )}

        {widget.type === 'form' && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">טקסט כפתור</label>
              <input
                type="text"
                value={widget.content.submitText || 'שלח'}
                onChange={(e) => onUpdate({ content: { ...widget.content, submitText: e.target.value } })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">הודעת הצלחה</label>
              <input
                type="text"
                value={widget.content.successMessage || 'הטופס נשלח בהצלחה!'}
                onChange={(e) => onUpdate({ content: { ...widget.content, successMessage: e.target.value } })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">קישור להפנייה אחרי שליחה (אופציונלי)</label>
              <input
                type="text"
                value={widget.content.redirectUrl || ''}
                onChange={(e) => onUpdate({ content: { ...widget.content, redirectUrl: e.target.value } })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="https://"
              />
            </div>
            <div className="space-y-3 mt-4">
              <label className="text-sm font-medium">שדות:</label>
              {(widget.content.fields || []).map((field: any, index: number) => (
                <div key={field.id} className="p-3 border rounded-lg space-y-2">
                  <input
                    type="text"
                    value={field.label}
                    onChange={(e) => {
                      const newFields = [...widget.content.fields]
                      newFields[index] = { ...field, label: e.target.value }
                      onUpdate({ content: { ...widget.content, fields: newFields } })
                    }}
                    className="w-full px-3 py-2 border rounded-lg font-medium"
                    placeholder="תווית שדה"
                  />
                  <select
                    value={field.type}
                    onChange={(e) => {
                      const newFields = [...widget.content.fields]
                      newFields[index] = { ...field, type: e.target.value }
                      onUpdate({ content: { ...widget.content, fields: newFields } })
                    }}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="text">טקסט</option>
                    <option value="email">אימייל</option>
                    <option value="tel">טלפון</option>
                    <option value="textarea">טקסט ארוך</option>
                    <option value="select">בחירה מרשימה</option>
                  </select>
                  <input
                    type="text"
                    value={field.placeholder || ''}
                    onChange={(e) => {
                      const newFields = [...widget.content.fields]
                      newFields[index] = { ...field, placeholder: e.target.value }
                      onUpdate({ content: { ...widget.content, fields: newFields } })
                    }}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="טקסט placeholder"
                  />
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={field.required || false}
                      onChange={(e) => {
                        const newFields = [...widget.content.fields]
                        newFields[index] = { ...field, required: e.target.checked }
                        onUpdate({ content: { ...widget.content, fields: newFields } })
                      }}
                    />
                    <span className="text-sm">שדה חובה</span>
                  </label>
                  <button
                    onClick={() => {
                      const newFields = widget.content.fields.filter((_: any, i: number) => i !== index)
                      onUpdate({ content: { ...widget.content, fields: newFields } })
                    }}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    מחק שדה
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newFields = [...(widget.content.fields || []), {
                    id: `field-${Date.now()}`,
                    label: 'שדה חדש',
                    type: 'text',
                    placeholder: '',
                    required: false
                  }]
                  onUpdate({ content: { ...widget.content, fields: newFields } })
                }}
                className="w-full px-3 py-2 border-2 border-dashed border-primary rounded-lg text-primary hover:bg-primary/5 transition-colors"
              >
                + הוסף שדה
              </button>
            </div>
          </>
        )}

        {!['heading', 'text', 'button', 'image', 'video', 'icon', 'accordion', 'tabs', 'counter', 'progress', 'social-icons', 'testimonial', 'form', 'spacer', 'divider'].includes(widget.type) && (
          <p className="text-sm text-gray-500">
            אין הגדרות תוכן זמינות לווידג'ט זה
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="p-4 text-sm text-gray-500">
      בחר אלמנט לעריכה
    </div>
  )
}

