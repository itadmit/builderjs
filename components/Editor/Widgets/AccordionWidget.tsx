'use client'

import { Widget, AccordionContent, ViewportMode } from '../types'
import { ChevronDown, Plus, Minus } from 'lucide-react'
import { useState } from 'react'

interface AccordionWidgetProps {
  widget: Widget<AccordionContent>
  viewport: ViewportMode
}

export default function AccordionWidget({ widget, viewport }: AccordionWidgetProps) {
  const { items, allowMultiple, icon } = widget.content
  const [openItems, setOpenItems] = useState<string[]>(
    items.filter((item) => item.isOpen).map((item) => item.id)
  )

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      )
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]))
    }
  }

  const getIcon = (isOpen: boolean) => {
    if (icon === 'plus') {
      return isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />
    }
    return <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
  }

  return (
    <div className="widget-accordion space-y-2">
      {items.map((item) => {
        const isOpen = openItems.includes(item.id)
        return (
          <div key={item.id} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-4 py-3 flex items-center justify-between text-right hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium">{item.title}</span>
              {getIcon(isOpen)}
            </button>
            {isOpen && (
              <div className="px-4 py-3 border-t bg-gray-50/50">
                <p className="whitespace-pre-wrap">{item.content}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
