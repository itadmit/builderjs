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
  width?: number // ברירת מחדל: חלוקה שווה
  styles?: WidgetStyles
}

export interface Section {
  id: string
  type: 'section'
  columns: Column[]
  columnCount: 1 | 2 | 3 | 4
  gap?: number
  styles: WidgetStyles
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
  
  // Dimensions
  width?: string
  height?: string
  maxWidth?: string
  
  // Display
  display?: string
  justifyContent?: string
  alignItems?: string
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

