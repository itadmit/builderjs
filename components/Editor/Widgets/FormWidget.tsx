'use client'

import { Widget, FormContent, ViewportMode } from '../types'
import { useState } from 'react'

interface FormWidgetProps {
  widget: Widget<FormContent>
  viewport: ViewportMode
}

export default function FormWidget({ widget, viewport }: FormWidgetProps) {
  const { fields, submitText, successMessage, redirectUrl } = widget.content
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSuccess(true)
    setIsSubmitting(false)

    if (redirectUrl) {
      setTimeout(() => {
        window.location.href = redirectUrl
      }, 2000)
    }
  }

  if (isSuccess) {
    return (
      <div className="widget-form p-6 bg-green-50 border-2 border-green-200 rounded-lg text-center">
        <p className="text-green-800 font-medium">{successMessage || 'הטופס נשלח בהצלחה!'}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="widget-form space-y-4">
      {fields.map((field) => {
        const commonProps = {
          id: field.id,
          name: field.id,
          required: field.required,
          placeholder: field.placeholder,
          className: 'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          value: formData[field.id] || '',
          onChange: (e: any) => setFormData({ ...formData, [field.id]: e.target.value }),
        }

        return (
          <div key={field.id}>
            <label htmlFor={field.id} className="block text-sm font-medium mb-1">
              {field.label}
              {field.required && <span className="text-red-500 mr-1">*</span>}
            </label>

            {field.type === 'textarea' ? (
              <textarea {...commonProps} rows={4} />
            ) : field.type === 'select' ? (
              <select {...commonProps}>
                <option value="">בחר אפשרות</option>
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input type={field.type} {...commonProps} />
            )}
          </div>
        )
      })}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? 'שולח...' : submitText}
      </button>
    </form>
  )
}
