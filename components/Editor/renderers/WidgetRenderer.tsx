'use client'

import { Widget, ViewportMode } from '../types'
import { getEffectiveStyles, stylesToCSS } from '../utils'
import dynamic from 'next/dynamic'

// Dynamic imports for widgets
const HeadingWidget = dynamic(() => import('../widgets/HeadingWidget'))
const TextWidget = dynamic(() => import('../widgets/TextWidget'))
const ButtonWidget = dynamic(() => import('../widgets/ButtonWidget'))
const ImageWidget = dynamic(() => import('../widgets/ImageWidget'))
const VideoWidget = dynamic(() => import('../widgets/VideoWidget'))
const SpacerWidget = dynamic(() => import('../widgets/SpacerWidget'))
const DividerWidget = dynamic(() => import('../widgets/DividerWidget'))
const IconWidget = dynamic(() => import('../widgets/IconWidget'))
const AccordionWidget = dynamic(() => import('../widgets/AccordionWidget'))
const TabsWidget = dynamic(() => import('../widgets/TabsWidget'))
const CounterWidget = dynamic(() => import('../widgets/CounterWidget'))
const ProgressWidget = dynamic(() => import('../widgets/ProgressWidget'))
const SocialIconsWidget = dynamic(() => import('../widgets/SocialIconsWidget'))
const TestimonialWidget = dynamic(() => import('../widgets/TestimonialWidget'))
const FormWidget = dynamic(() => import('../widgets/FormWidget'))

interface WidgetRendererProps {
  widget: Widget
  isSelected: boolean
  onClick: () => void
  viewport: ViewportMode
}

export default function WidgetRenderer({
  widget,
  isSelected,
  onClick,
  viewport,
}: WidgetRendererProps) {
  // Get effective styles for current viewport
  const effectiveStyles = getEffectiveStyles(widget, viewport)
  const style = stylesToCSS(effectiveStyles, viewport)

  // Add custom class and ID from advanced settings
  const customClass = widget.advanced?.customClass || ''
  const customId = widget.advanced?.customId || ''

  // Add entrance animation class
  const animationClass =
    widget.advanced?.entranceAnimation && widget.advanced.entranceAnimation !== 'none'
      ? `animate-${widget.advanced.entranceAnimation}`
      : ''

  const containerClass = `
    widget-container
    ${customClass}
    ${animationClass}
    ${isSelected ? 'widget-selected ring-2 ring-blue-500 ring-offset-2' : ''}
    transition-all
    hover:ring-2 hover:ring-blue-300
    cursor-pointer
  `.trim()

  // Common props for all widgets
  const commonProps = {
    widget,
    viewport,
  }

  // Render appropriate widget component
  const renderWidget = () => {
    switch (widget.type) {
      case 'heading':
        return <HeadingWidget {...commonProps} />
      case 'text':
        return <TextWidget {...commonProps} />
      case 'button':
        return <ButtonWidget {...commonProps} />
      case 'image':
        return <ImageWidget {...commonProps} />
      case 'video':
        return <VideoWidget {...commonProps} />
      case 'spacer':
        return <SpacerWidget {...commonProps} />
      case 'divider':
        return <DividerWidget {...commonProps} />
      case 'icon':
        return <IconWidget {...commonProps} />
      case 'accordion':
        return <AccordionWidget {...commonProps} />
      case 'tabs':
        return <TabsWidget {...commonProps} />
      case 'counter':
        return <CounterWidget {...commonProps} />
      case 'progress':
        return <ProgressWidget {...commonProps} />
      case 'social-icons':
        return <SocialIconsWidget {...commonProps} />
      case 'testimonial':
        return <TestimonialWidget {...commonProps} />
      case 'form':
        return <FormWidget {...commonProps} />
      default:
        return (
          <div className="p-4 bg-red-100 text-red-600 rounded">
            Widget type "{widget.type}" not implemented
          </div>
        )
    }
  }

  return (
    <div
      id={customId}
      className={containerClass}
      style={style}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
    >
      {renderWidget()}
    </div>
  )
}

