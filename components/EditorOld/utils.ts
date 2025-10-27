// Utility functions for the visual editor

import { Widget, WidgetStyles, ViewportMode, Section, Column } from './types'

export function generateId(): string {
  return `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Create a new section with columns
export function createSection(columnCount: 1 | 2 | 3 | 4 | 5 | 6 = 1, layout?: Section['layout']): Section {
  const columns: Column[] = []
  
  for (let i = 0; i < columnCount; i++) {
    columns.push({
      id: generateId(),
      widgets: [],
      styles: {},
    })
  }

  return {
    id: generateId(),
    type: 'section',
    columns,
    columnCount,
    gap: 20,
    layout,
    styles: {
      paddingTop: 40,
      paddingBottom: 40,
      paddingLeft: 20,
      paddingRight: 20,
    },
  }
}

// Duplicate a section
export function duplicateSection(section: Section): Section {
  return {
    ...section,
    id: generateId(),
    columns: section.columns.map(col => ({
      ...col,
      id: generateId(),
      widgets: col.widgets.map(w => cloneWidget(w)),
    })),
  }
}

// Get effective styles for a widget based on viewport mode
export function getEffectiveStyles(widget: Widget, viewportMode: ViewportMode): WidgetStyles {
  // If no responsive styles, use legacy styles
  if (!widget.responsiveStyles) {
    return widget.styles
  }

  const desktopStyles = widget.responsiveStyles.desktop
  const mobileOverrides = widget.responsiveStyles.mobile || {}

  // For desktop, just return desktop styles
  if (viewportMode === 'desktop') {
    return desktopStyles
  }

  // For mobile, merge desktop with mobile overrides
  return { ...desktopStyles, ...mobileOverrides }
}

// Check if a style property has mobile override
export function hasMobileOverride(widget: Widget, property: keyof WidgetStyles): boolean {
  if (!widget.responsiveStyles?.mobile) return false
  return widget.responsiveStyles.mobile[property] !== undefined
}

export function stylesToCSS(styles: WidgetStyles): React.CSSProperties {
  const css: React.CSSProperties = {}

  if (styles.fontSize) css.fontSize = styles.fontSize
  if (styles.fontWeight) css.fontWeight = styles.fontWeight
  if (styles.lineHeight) css.lineHeight = styles.lineHeight
  if (styles.textAlign) css.textAlign = styles.textAlign
  if (styles.color) css.color = styles.color

  if (styles.marginTop !== undefined) css.marginTop = `${styles.marginTop}px`
  if (styles.marginBottom !== undefined) css.marginBottom = `${styles.marginBottom}px`
  if (styles.marginLeft !== undefined) css.marginLeft = `${styles.marginLeft}px`
  if (styles.marginRight !== undefined) css.marginRight = `${styles.marginRight}px`

  if (styles.paddingTop !== undefined) css.paddingTop = `${styles.paddingTop}px`
  if (styles.paddingBottom !== undefined) css.paddingBottom = `${styles.paddingBottom}px`
  if (styles.paddingLeft !== undefined) css.paddingLeft = `${styles.paddingLeft}px`
  if (styles.paddingRight !== undefined) css.paddingRight = `${styles.paddingRight}px`

  if (styles.backgroundColor) css.backgroundColor = styles.backgroundColor
  if (styles.backgroundImage) css.backgroundImage = `url(${styles.backgroundImage})`

  if (styles.borderWidth !== undefined) css.borderWidth = `${styles.borderWidth}px`
  if (styles.borderColor) css.borderColor = styles.borderColor
  if (styles.borderRadius !== undefined) css.borderRadius = `${styles.borderRadius}px`

  if (styles.width) css.width = styles.width
  if (styles.height) css.height = styles.height
  if (styles.maxWidth) css.maxWidth = styles.maxWidth

  if (styles.display) css.display = styles.display
  if (styles.justifyContent) css.justifyContent = styles.justifyContent
  if (styles.alignItems) css.alignItems = styles.alignItems

  return css
}

export function getYouTubeEmbedUrl(url: string): string {
  const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/)
  return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : ''
}

export function getVimeoEmbedUrl(url: string): string {
  const videoId = url.match(/vimeo\.com\/(\d+)/)
  return videoId ? `https://player.vimeo.com/video/${videoId[1]}` : ''
}

export function cloneWidget(widget: Widget): Widget {
  return {
    ...widget,
    id: generateId(),
    content: typeof widget.content === 'object' ? { ...widget.content } : widget.content,
    styles: { ...widget.styles },
  }
}

export function exportWidgetsToHTML(widgets: Widget[]): string {
  // This would be used to export the page as HTML
  // For now, we'll store as JSON
  return JSON.stringify({ widgets }, null, 2)
}

export function importWidgetsFromJSON(json: string): Widget[] {
  try {
    const parsed = JSON.parse(json)
    return parsed.widgets || []
  } catch {
    return []
  }
}

