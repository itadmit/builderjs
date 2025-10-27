/**
 * Visual Editor Types
 * Architecture: Section → Column → Widget (like Elementor)
 */

// ============= WIDGET TYPES =============

export type WidgetType =
  | 'heading'
  | 'text'
  | 'button'
  | 'image'
  | 'video'
  | 'spacer'
  | 'divider'
  | 'icon'
  | 'accordion'
  | 'tabs'
  | 'counter'
  | 'progress'
  | 'social-icons'
  | 'testimonial'
  | 'form'

// ============= STYLE SYSTEM =============

export interface WidgetStyles {
  // Typography
  fontSize?: string
  fontWeight?: string
  lineHeight?: string
  textAlign?: 'right' | 'center' | 'left' | 'justify'
  color?: string
  textDecoration?: 'none' | 'underline' | 'line-through'
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
  letterSpacing?: string

  // Spacing
  marginTop?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
  paddingTop?: number
  paddingBottom?: number
  paddingLeft?: number
  paddingRight?: number

  // Background
  backgroundColor?: string
  backgroundImage?: string
  backgroundSize?: 'cover' | 'contain' | 'auto'
  backgroundPosition?: string
  backgroundRepeat?: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y'

  // Border
  borderWidth?: number
  borderTopWidth?: number
  borderRightWidth?: number
  borderBottomWidth?: number
  borderLeftWidth?: number
  borderColor?: string
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'double' | 'none'
  borderRadius?: number
  borderTopLeftRadius?: number
  borderTopRightRadius?: number
  borderBottomLeftRadius?: number
  borderBottomRightRadius?: number

  // Shadow
  boxShadow?: string
  textShadow?: string

  // Dimensions
  width?: string
  maxWidth?: string
  minWidth?: string
  height?: string
  maxHeight?: string
  minHeight?: string

  // Position & Display
  display?: 'block' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'none'
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'
  top?: string
  right?: string
  bottom?: string
  left?: string
  zIndex?: number

  // Flexbox
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'
  gap?: number

  // Transform
  transform?: string
  transition?: string

  // Overflow
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto'

  // Cursor
  cursor?: 'pointer' | 'default' | 'text' | 'move' | 'not-allowed'

  // Opacity
  opacity?: number

  // Custom CSS
  customCSS?: string
}

// ============= RESPONSIVE SYSTEM =============

export type ViewportMode = 'desktop' | 'tablet' | 'mobile'

export interface ResponsiveStyles {
  desktop: WidgetStyles
  tablet?: Partial<WidgetStyles>
  mobile?: Partial<WidgetStyles>
}

export interface VisibilitySettings {
  hideOnDesktop?: boolean
  hideOnTablet?: boolean
  hideOnMobile?: boolean
}

// ============= ADVANCED SETTINGS =============

export interface AdvancedSettings {
  // HTML Attributes
  customId?: string
  customClass?: string
  customAttributes?: Record<string, string>

  // Visibility
  visibility?: VisibilitySettings

  // Animation
  entranceAnimation?: 'none' | 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'zoomIn' | 'zoomOut'
  animationDuration?: number // milliseconds
  animationDelay?: number // milliseconds

  // Behavior
  sticky?: boolean
  stickyOffset?: number
}

// ============= WIDGET INTERFACE =============

export interface Widget<T = any> {
  id: string
  type: WidgetType
  content: T // Widget-specific content
  styles: WidgetStyles
  responsiveStyles?: ResponsiveStyles
  advanced?: AdvancedSettings
}

// ============= WIDGET CONTENT TYPES =============

export interface HeadingContent {
  text: string
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export interface TextContent {
  text: string
  html?: string // For rich text
}

export interface ButtonContent {
  text: string
  url: string
  openInNewTab?: boolean
  icon?: string
  iconPosition?: 'left' | 'right'
}

export interface ImageContent {
  url: string
  alt: string
  link?: string
  caption?: string
  lightbox?: boolean
}

export interface VideoContent {
  type: 'youtube' | 'vimeo' | 'direct'
  url: string
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  controls?: boolean
}

export interface AccordionItem {
  id: string
  title: string
  content: string
  isOpen?: boolean
}

export interface AccordionContent {
  items: AccordionItem[]
  allowMultiple?: boolean
  icon?: 'plus' | 'arrow' | 'chevron'
}

export interface TabItem {
  id: string
  title: string
  icon?: string
  content: string
}

export interface TabsContent {
  items: TabItem[]
  activeTab?: string
}

export interface CounterContent {
  start: number
  end: number
  duration: number // milliseconds
  prefix?: string
  suffix?: string
  separator?: string
}

export interface ProgressContent {
  value: number // 0-100
  label?: string
  showPercentage?: boolean
}

export interface SocialIcon {
  platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'youtube' | 'whatsapp' | 'telegram' | 'tiktok' | 'pinterest'
  url: string
}

export interface SocialIconsContent {
  icons: SocialIcon[]
  style: 'default' | 'rounded' | 'square' | 'circle'
  size: 'small' | 'medium' | 'large'
}

export interface TestimonialContent {
  text: string
  author: string
  role?: string
  image?: string
  rating?: number
}

export interface FormField {
  id: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio'
  label: string
  placeholder?: string
  required?: boolean
  options?: string[] // For select, checkbox, radio
}

export interface FormContent {
  fields: FormField[]
  submitText: string
  successMessage?: string
  redirectUrl?: string
}

// ============= COLUMN & SECTION =============

export interface Column {
  id: string
  widgets: Widget[]
  width?: number // Percentage (for custom layouts)
  styles?: WidgetStyles
  advanced?: AdvancedSettings
}

export interface Section {
  id: string
  type: 'section'
  columns: Column[]
  columnCount: 1 | 2 | 3 | 4 | 5 | 6
  gap?: number
  layout?: SectionLayout
  styles: WidgetStyles
  advanced?: AdvancedSettings
}

export type SectionLayout =
  | 'equal' // Equal width columns
  | '30-70'
  | '70-30'
  | '25-75'
  | '75-25'
  | '33-66'
  | '66-33'
  | '25-25-50'
  | '50-25-25'
  | '25-50-25'
  | 'custom' // Custom widths

// ============= EDITOR STATE =============

export type SelectionType = 'section' | 'column' | 'widget' | null

export interface EditorSelection {
  type: SelectionType
  id: string | null
  sectionId?: string
  columnId?: string
}

export interface EditorState {
  sections: Section[]
  selection: EditorSelection
  viewport: ViewportMode
  mode: 'edit' | 'preview'
  history: {
    past: Section[][]
    future: Section[][]
  }
}

// ============= WIDGET DEFINITION =============

export interface WidgetDefinition {
  type: WidgetType
  label: string
  icon: string // Lucide icon name
  category: 'basic' | 'media' | 'interactive' | 'layout' | 'form'
  defaultContent: any
  defaultStyles: WidgetStyles
}

// ============= SECTION TEMPLATES =============

export interface SectionTemplate {
  id: string
  label: string
  icon: string
  columnCount: Section['columnCount']
  layout?: SectionLayout
  preview?: string
}

// ============= DRAG & DROP =============

export type DragType = 'section' | 'column' | 'widget' | 'new-widget' | 'new-section'

export interface DragData {
  type: DragType
  id?: string
  widgetType?: WidgetType
  sectionTemplate?: SectionTemplate
  sourceColumnId?: string
  sourceSectionId?: string
}

// ============= EDITOR PROPS =============

export interface EditorValue {
  sections: Section[]
}

export interface VisualEditorProps {
  initialValue?: EditorValue
  onChange: (value: EditorValue) => void
  onSave?: () => void
  onClose?: () => void
  title?: string
  isSaving?: boolean
  readOnly?: boolean
}

// ============= PANEL TYPES =============

export type PanelTab = 'content' | 'style' | 'advanced'

export interface PanelProps {
  selection: EditorSelection
  sections: Section[]
  viewport: ViewportMode
  onUpdate: (updates: Partial<Section> | Partial<Column> | Partial<Widget>) => void
}

