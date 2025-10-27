// Constants for the visual editor

import { WidgetType } from './types'

export interface WidgetDefinition {
  type: WidgetType
  label: string
  icon: any // React component
  category: 'basic' | 'media' | 'form' | 'layout'
  defaultContent: any
  defaultStyles: any
}

export const WIDGET_DEFINITIONS: WidgetDefinition[] = [
  {
    type: 'heading',
    label: 'כותרת',
    icon: 'Heading',
    category: 'basic',
    defaultContent: 'כותרת חדשה',
    defaultStyles: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      textAlign: 'right',
      color: '#1a1a1a',
      marginBottom: 16,
    },
  },
  {
    type: 'text',
    label: 'טקסט',
    icon: 'Type',
    category: 'basic',
    defaultContent: 'הוסף טקסט כאן...',
    defaultStyles: {
      fontSize: '1rem',
      lineHeight: '1.6',
      textAlign: 'right',
      color: '#4a5568',
      marginBottom: 16,
    },
  },
  {
    type: 'button',
    label: 'כפתור',
    icon: 'MousePointerClick',
    category: 'basic',
    defaultContent: {
      text: 'לחץ כאן',
      url: '#',
      openInNewTab: false,
    },
    defaultStyles: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#ffffff',
      backgroundColor: '#6C63FF',
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 24,
      paddingRight: 24,
      borderRadius: 8,
      textAlign: 'center',
    },
  },
  {
    type: 'image',
    label: 'תמונה',
    icon: 'Image',
    category: 'media',
    defaultContent: {
      url: 'https://via.placeholder.com/800x400',
      alt: 'תמונה',
      link: '',
    },
    defaultStyles: {
      width: '100%',
      borderRadius: 8,
      marginBottom: 16,
    },
  },
  {
    type: 'video',
    label: 'וידאו',
    icon: 'Video',
    category: 'media',
    defaultContent: {
      url: '',
      type: 'youtube', // youtube, vimeo, or direct
    },
    defaultStyles: {
      width: '100%',
      marginBottom: 16,
    },
  },
  {
    type: 'spacer',
    label: 'רווח',
    icon: 'MoveVertical',
    category: 'layout',
    defaultContent: null,
    defaultStyles: {
      height: '40px',
    },
  },
  {
    type: 'divider',
    label: 'קו מפריד',
    icon: 'Minus',
    category: 'layout',
    defaultContent: null,
    defaultStyles: {
      borderWidth: 1,
      borderColor: '#e2e8f0',
      marginTop: 16,
      marginBottom: 16,
    },
  },
  {
    type: 'form',
    label: 'טופס',
    icon: 'FileText',
    category: 'form',
    defaultContent: {
      fields: ['name', 'email', 'phone', 'message'],
      submitText: 'שלח',
    },
    defaultStyles: {
      maxWidth: '600px',
      marginBottom: 16,
    },
  },
  {
    type: 'icon',
    label: 'אייקון',
    icon: 'Star',
    category: 'basic',
    defaultContent: {
      icon: '⭐',
      size: 'medium',
    },
    defaultStyles: {
      fontSize: '3rem',
      textAlign: 'center',
      marginBottom: 16,
    },
  },
  {
    type: 'container',
    label: 'עמודות',
    icon: 'Columns',
    category: 'layout',
    defaultContent: {
      columns: 2, // מספר עמודות (2 או 3)
      gap: 16, // רווח בין העמודות
      items: [
        { content: 'עמודה 1' },
        { content: 'עמודה 2' },
      ],
    },
    defaultStyles: {
      marginBottom: 16,
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
]

export const FONT_SIZES = [
  { label: 'קטן מאוד', value: '0.75rem' },
  { label: 'קטן', value: '0.875rem' },
  { label: 'רגיל', value: '1rem' },
  { label: 'בינוני', value: '1.125rem' },
  { label: 'גדול', value: '1.25rem' },
  { label: 'גדול מאוד', value: '1.5rem' },
  { label: 'ענק', value: '2rem' },
  { label: 'ענק מאוד', value: '2.5rem' },
  { label: 'כותרת ראשית', value: '3rem' },
]

export const FONT_WEIGHTS = [
  { label: 'דק', value: '300' },
  { label: 'רגיל', value: '400' },
  { label: 'בינוני', value: '500' },
  { label: 'מודגש', value: '600' },
  { label: 'מודגש מאוד', value: '700' },
  { label: 'עבה', value: '800' },
]

export const TEXT_ALIGNS = [
  { label: 'ימין', value: 'right' },
  { label: 'מרכז', value: 'center' },
  { label: 'שמאל', value: 'left' },
]

export const SPACING_PRESETS = [
  { label: 'אין', value: 0 },
  { label: 'קטן', value: 8 },
  { label: 'בינוני', value: 16 },
  { label: 'גדול', value: 24 },
  { label: 'גדול מאוד', value: 32 },
  { label: 'ענק', value: 48 },
]

export const COLOR_PRESETS = [
  '#1a1a1a',
  '#4a5568',
  '#718096',
  '#a0aec0',
  '#e2e8f0',
  '#ffffff',
  '#6C63FF',
  '#4C51BF',
  '#ed8936',
  '#f56565',
  '#48bb78',
  '#38b2ac',
]

