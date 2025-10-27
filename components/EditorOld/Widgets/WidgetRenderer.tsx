'use client'

import { Widget, ViewportMode } from '../types'
import HeadingWidget from './HeadingWidget'
import TextWidget from './TextWidget'
import ButtonWidget from './ButtonWidget'
import ImageWidget from './ImageWidget'
import VideoWidget from './VideoWidget'
import SpacerWidget from './SpacerWidget'
import DividerWidget from './DividerWidget'
import FormWidget from './FormWidget'
import IconWidget from './IconWidget'
import ContainerWidget from './ContainerWidget'

interface WidgetRendererProps {
  widget: Widget
  isSelected: boolean
  onClick: () => void
  viewportMode?: ViewportMode
}

export default function WidgetRenderer({ widget, isSelected, onClick, viewportMode = 'desktop' }: WidgetRendererProps) {
  const widgetProps = { widget, isSelected, onClick, viewportMode }

  switch (widget.type) {
    case 'heading':
      return <HeadingWidget {...widgetProps} />
    case 'text':
      return <TextWidget {...widgetProps} />
    case 'button':
      return <ButtonWidget {...widgetProps} />
    case 'image':
      return <ImageWidget {...widgetProps} />
    case 'video':
      return <VideoWidget {...widgetProps} />
    case 'spacer':
      return <SpacerWidget {...widgetProps} />
    case 'divider':
      return <DividerWidget {...widgetProps} />
    case 'form':
      return <FormWidget {...widgetProps} />
    case 'icon':
      return <IconWidget {...widgetProps} />
    case 'container':
      return <ContainerWidget {...widgetProps} />
    default:
      return (
        <div onClick={onClick} className="p-4 bg-red-100 text-red-600">
          Widget type "{widget.type}" not implemented
        </div>
      )
  }
}

