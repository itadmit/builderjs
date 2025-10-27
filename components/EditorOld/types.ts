// Types for the visual editor

export type WidgetType = 
  | 'heading' 
  | 'text' 
  | 'button' 
  | 'image' 
  | 'video'
  | 'spacer'
  | 'divider'
  | 'form'
  | 'icon'

export type LayoutType = 'section'

export interface Widget {
  id: string
  type: WidgetType
  content: any
  styles: WidgetStyles
  responsiveStyles?: ResponsiveStyles
}

export interface Column {
  id: string
  widgets: Widget[]
  width?: number // Percentage (e.g., 50 for 50%)
  styles?: WidgetStyles
}

export interface Section {
  id: string
  type: 'section'
  columns: Column[]
  columnCount: 1 | 2 | 3 | 4 | 5 | 6
  gap?: number // Gap between columns in pixels
  styles: WidgetStyles
  layout?: 'default' | '30-70' | '70-30' | '25-75' | '75-25' | '33-66' | '66-33' // Predefined layouts
}

// Type union for all possible items in the editor
export type EditorItem = Section

export interface WidgetStyles {
  // Typography
  fontSize?: string
  fontWeight?: string
  lineHeight?: string
  textAlign?: 'right' | 'center' | 'left'
  color?: string
  
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
  
  // Border
  borderWidth?: number
  borderColor?: string
  borderRadius?: number
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none'
  
  // Dimensions
  width?: string
  height?: string
  maxWidth?: string
  minHeight?: string
  
  // Display
  display?: string
  justifyContent?: string
  alignItems?: string
  
  // Visibility
  hideOnDesktop?: boolean
  hideOnMobile?: boolean
}

export interface ResponsiveStyles {
  desktop: WidgetStyles
  mobile?: Partial<WidgetStyles> // Only stores overrides
}

export type ViewportMode = 'desktop' | 'mobile'

export interface EditorState {
  sections: Section[]
  selectedId: string | null // Can be section, column, or widget ID
  selectedType: 'section' | 'column' | 'widget' | null
  mode: 'edit' | 'preview'
  viewportMode: ViewportMode
}

// Helper type for selection
export interface EditorSelection {
  id: string
  type: 'section' | 'column' | 'widget'
  sectionId?: string
  columnId?: string
}

