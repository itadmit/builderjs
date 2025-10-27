import {
  Section,
  Column,
  Widget,
  WidgetStyles,
  ViewportMode,
  SectionLayout,
  SectionTemplate,
  WidgetType,
} from '../types'

// ============= ID GENERATION =============

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// ============= SECTION HELPERS =============

export function createSection(
  columnCount: Section['columnCount'] = 1,
  layout?: SectionLayout
): Section {
  const columns: Column[] = []

  // Create columns based on count
  for (let i = 0; i < columnCount; i++) {
    columns.push(createColumn())
  }

  return {
    id: generateId(),
    type: 'section',
    columns,
    columnCount,
    gap: 20,
    layout: layout || 'equal',
    styles: {
      paddingTop: 60,
      paddingBottom: 60,
      paddingLeft: 20,
      paddingRight: 20,
    },
    advanced: {},
  }
}

export function createColumn(): Column {
  return {
    id: generateId(),
    widgets: [],
    styles: {},
    advanced: {},
  }
}

export function duplicateSection(section: Section): Section {
  return {
    ...section,
    id: generateId(),
    columns: section.columns.map((col) => duplicateColumn(col)),
  }
}

export function duplicateColumn(column: Column): Column {
  return {
    ...column,
    id: generateId(),
    widgets: column.widgets.map((w) => duplicateWidget(w)),
  }
}

export function duplicateWidget(widget: Widget): Widget {
  return {
    ...widget,
    id: generateId(),
  }
}

// ============= COLUMN WIDTH CALCULATION =============

export function getColumnWidths(section: Section): string {
  if (!section.layout || section.layout === 'equal') {
    return `repeat(${section.columnCount}, 1fr)`
  }

  const layoutMap: Record<string, string> = {
    '30-70': '30fr 70fr',
    '70-30': '70fr 30fr',
    '25-75': '25fr 75fr',
    '75-25': '75fr 25fr',
    '33-66': '33fr 66fr',
    '66-33': '66fr 33fr',
    '25-25-50': '25fr 25fr 50fr',
    '50-25-25': '50fr 25fr 25fr',
    '25-50-25': '25fr 50fr 25fr',
  }

  return layoutMap[section.layout] || `repeat(${section.columnCount}, 1fr)`
}

// ============= STYLE CONVERSION =============

export function stylesToCSS(
  styles: WidgetStyles,
  viewport: ViewportMode = 'desktop'
): React.CSSProperties {
  const css: React.CSSProperties = {}

  // Typography
  if (styles.fontSize) css.fontSize = styles.fontSize
  if (styles.fontWeight) css.fontWeight = styles.fontWeight
  if (styles.lineHeight) css.lineHeight = styles.lineHeight
  if (styles.textAlign) css.textAlign = styles.textAlign
  if (styles.color) css.color = styles.color
  if (styles.textDecoration) css.textDecoration = styles.textDecoration
  if (styles.textTransform) css.textTransform = styles.textTransform
  if (styles.letterSpacing) css.letterSpacing = styles.letterSpacing

  // Spacing
  if (styles.marginTop !== undefined) css.marginTop = `${styles.marginTop}px`
  if (styles.marginBottom !== undefined)
    css.marginBottom = `${styles.marginBottom}px`
  if (styles.marginLeft !== undefined) css.marginLeft = `${styles.marginLeft}px`
  if (styles.marginRight !== undefined)
    css.marginRight = `${styles.marginRight}px`

  if (styles.paddingTop !== undefined) css.paddingTop = `${styles.paddingTop}px`
  if (styles.paddingBottom !== undefined)
    css.paddingBottom = `${styles.paddingBottom}px`
  if (styles.paddingLeft !== undefined)
    css.paddingLeft = `${styles.paddingLeft}px`
  if (styles.paddingRight !== undefined)
    css.paddingRight = `${styles.paddingRight}px`

  // Background
  if (styles.backgroundColor) css.backgroundColor = styles.backgroundColor
  if (styles.backgroundImage) css.backgroundImage = styles.backgroundImage
  if (styles.backgroundSize) css.backgroundSize = styles.backgroundSize
  if (styles.backgroundPosition)
    css.backgroundPosition = styles.backgroundPosition
  if (styles.backgroundRepeat) css.backgroundRepeat = styles.backgroundRepeat

  // Border
  if (styles.borderWidth !== undefined) {
    css.borderWidth = `${styles.borderWidth}px`
  } else {
    if (styles.borderTopWidth !== undefined)
      css.borderTopWidth = `${styles.borderTopWidth}px`
    if (styles.borderRightWidth !== undefined)
      css.borderRightWidth = `${styles.borderRightWidth}px`
    if (styles.borderBottomWidth !== undefined)
      css.borderBottomWidth = `${styles.borderBottomWidth}px`
    if (styles.borderLeftWidth !== undefined)
      css.borderLeftWidth = `${styles.borderLeftWidth}px`
  }

  if (styles.borderColor) css.borderColor = styles.borderColor
  if (styles.borderStyle) css.borderStyle = styles.borderStyle

  if (styles.borderRadius !== undefined) {
    css.borderRadius = `${styles.borderRadius}px`
  } else {
    if (styles.borderTopLeftRadius !== undefined)
      css.borderTopLeftRadius = `${styles.borderTopLeftRadius}px`
    if (styles.borderTopRightRadius !== undefined)
      css.borderTopRightRadius = `${styles.borderTopRightRadius}px`
    if (styles.borderBottomLeftRadius !== undefined)
      css.borderBottomLeftRadius = `${styles.borderBottomLeftRadius}px`
    if (styles.borderBottomRightRadius !== undefined)
      css.borderBottomRightRadius = `${styles.borderBottomRightRadius}px`
  }

  // Shadow
  if (styles.boxShadow) css.boxShadow = styles.boxShadow
  if (styles.textShadow) css.textShadow = styles.textShadow

  // Dimensions
  if (styles.width) css.width = styles.width
  if (styles.maxWidth) css.maxWidth = styles.maxWidth
  if (styles.minWidth) css.minWidth = styles.minWidth
  if (styles.height) css.height = styles.height
  if (styles.maxHeight) css.maxHeight = styles.maxHeight
  if (styles.minHeight) css.minHeight = styles.minHeight

  // Position & Display
  if (styles.display) css.display = styles.display
  if (styles.position) css.position = styles.position
  if (styles.top) css.top = styles.top
  if (styles.right) css.right = styles.right
  if (styles.bottom) css.bottom = styles.bottom
  if (styles.left) css.left = styles.left
  if (styles.zIndex !== undefined) css.zIndex = styles.zIndex

  // Flexbox
  if (styles.flexDirection) css.flexDirection = styles.flexDirection
  if (styles.justifyContent) css.justifyContent = styles.justifyContent
  if (styles.alignItems) css.alignItems = styles.alignItems
  if (styles.gap !== undefined) css.gap = `${styles.gap}px`

  // Transform
  if (styles.transform) css.transform = styles.transform
  if (styles.transition) css.transition = styles.transition

  // Overflow
  if (styles.overflow) css.overflow = styles.overflow

  // Cursor
  if (styles.cursor) css.cursor = styles.cursor

  // Opacity
  if (styles.opacity !== undefined) css.opacity = styles.opacity

  return css
}

// ============= RESPONSIVE HELPERS =============

export function getEffectiveStyles(
  widget: Widget,
  viewport: ViewportMode
): WidgetStyles {
  if (!widget.responsiveStyles) {
    return widget.styles
  }

  const base = widget.responsiveStyles.desktop
  const overrides =
    viewport === 'tablet'
      ? widget.responsiveStyles.tablet
      : viewport === 'mobile'
      ? widget.responsiveStyles.mobile
      : {}

  return { ...base, ...overrides }
}

export function shouldHide(widget: Widget, viewport: ViewportMode): boolean {
  const visibility = widget.advanced?.visibility
  if (!visibility) return false

  if (viewport === 'desktop' && visibility.hideOnDesktop) return true
  if (viewport === 'tablet' && visibility.hideOnTablet) return true
  if (viewport === 'mobile' && visibility.hideOnMobile) return true

  return false
}

// ============= SECTION TEMPLATES =============

export const SECTION_TEMPLATES: SectionTemplate[] = [
  {
    id: '1-col',
    label: 'עמודה אחת',
    icon: 'Square',
    columnCount: 1,
    layout: 'equal',
  },
  {
    id: '2-col',
    label: '2 עמודות',
    icon: 'Columns',
    columnCount: 2,
    layout: 'equal',
  },
  {
    id: '3-col',
    label: '3 עמודות',
    icon: 'Columns',
    columnCount: 3,
    layout: 'equal',
  },
  {
    id: '4-col',
    label: '4 עמודות',
    icon: 'Columns',
    columnCount: 4,
    layout: 'equal',
  },
  {
    id: '30-70',
    label: '30% / 70%',
    icon: 'Columns',
    columnCount: 2,
    layout: '30-70',
  },
  {
    id: '70-30',
    label: '70% / 30%',
    icon: 'Columns',
    columnCount: 2,
    layout: '70-30',
  },
  {
    id: '25-75',
    label: '25% / 75%',
    icon: 'Columns',
    columnCount: 2,
    layout: '25-75',
  },
  {
    id: '75-25',
    label: '75% / 25%',
    icon: 'Columns',
    columnCount: 2,
    layout: '75-25',
  },
  {
    id: '25-25-50',
    label: '25% / 25% / 50%',
    icon: 'Columns',
    columnCount: 3,
    layout: '25-25-50',
  },
  {
    id: '25-50-25',
    label: '25% / 50% / 25%',
    icon: 'Columns',
    columnCount: 3,
    layout: '25-50-25',
  },
]

// ============= FIND HELPERS =============

export function findSection(
  sections: Section[],
  sectionId: string
): Section | null {
  return sections.find((s) => s.id === sectionId) || null
}

export function findColumn(
  sections: Section[],
  columnId: string
): { section: Section; column: Column } | null {
  for (const section of sections) {
    const column = section.columns.find((c) => c.id === columnId)
    if (column) {
      return { section, column }
    }
  }
  return null
}

export function findWidget(
  sections: Section[],
  widgetId: string
): { section: Section; column: Column; widget: Widget } | null {
  for (const section of sections) {
    for (const column of section.columns) {
      const widget = column.widgets.find((w) => w.id === widgetId)
      if (widget) {
        return { section, column, widget }
      }
    }
  }
  return null
}

// ============= MIGRATION =============

// Convert old flat widget structure to new section-based structure
export function migrateOldStructure(oldWidgets: any[]): Section[] {
  if (!oldWidgets || oldWidgets.length === 0) {
    return []
  }

  // Put all old widgets in a single column section
  const section = createSection(1)
  section.columns[0].widgets = oldWidgets.map((w) => ({
    ...w,
    id: w.id || generateId(),
    advanced: {},
  }))

  return [section]
}

