import { WidgetDefinition, WidgetType } from '../types'

export const WIDGET_DEFINITIONS: WidgetDefinition[] = [
  // ============= BASIC =============
  {
    type: 'heading',
    label: 'כותרת',
    icon: 'Heading',
    category: 'basic',
    defaultContent: {
      text: 'כותרת חדשה',
      tag: 'h2',
    },
    defaultStyles: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#1a1a1a',
      textAlign: 'right',
      marginBottom: 20,
    },
  },
  {
    type: 'text',
    label: 'טקסט',
    icon: 'Type',
    category: 'basic',
    defaultContent: {
      text: 'הוסף טקסט כאן...',
    },
    defaultStyles: {
      fontSize: '1rem',
      lineHeight: '1.6',
      color: '#4a5568',
      textAlign: 'right',
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
      paddingTop: 14,
      paddingBottom: 14,
      paddingLeft: 32,
      paddingRight: 32,
      borderRadius: 8,
      textAlign: 'center',
      display: 'inline-block',
      cursor: 'pointer',
    },
  },
  {
    type: 'icon',
    label: 'אייקון',
    icon: 'Star',
    category: 'basic',
    defaultContent: {
      icon: '⭐',
    },
    defaultStyles: {
      fontSize: '3rem',
      textAlign: 'center',
      marginBottom: 16,
    },
  },

  // ============= MEDIA =============
  {
    type: 'image',
    label: 'תמונה',
    icon: 'Image',
    category: 'media',
    defaultContent: {
      url: 'https://via.placeholder.com/800x400',
      alt: 'תמונה',
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
      type: 'youtube',
      url: '',
    },
    defaultStyles: {
      width: '100%',
      marginBottom: 16,
    },
  },

  // ============= INTERACTIVE =============
  {
    type: 'accordion',
    label: 'אקורדיון',
    icon: 'ChevronDown',
    category: 'interactive',
    defaultContent: {
      items: [
        { id: '1', title: 'פריט 1', content: 'תוכן פריט 1', isOpen: true },
        { id: '2', title: 'פריט 2', content: 'תוכן פריט 2', isOpen: false },
        { id: '3', title: 'פריט 3', content: 'תוכן פריט 3', isOpen: false },
      ],
      allowMultiple: false,
      icon: 'chevron',
    },
    defaultStyles: {
      marginBottom: 16,
    },
  },
  {
    type: 'tabs',
    label: 'טאבים',
    icon: 'PanelTop',
    category: 'interactive',
    defaultContent: {
      items: [
        { id: '1', title: 'טאב 1', content: 'תוכן טאב 1' },
        { id: '2', title: 'טאב 2', content: 'תוכן טאב 2' },
        { id: '3', title: 'טאב 3', content: 'תוכן טאב 3' },
      ],
      activeTab: '1',
    },
    defaultStyles: {
      marginBottom: 16,
    },
  },
  {
    type: 'counter',
    label: 'מונה',
    icon: 'Hash',
    category: 'interactive',
    defaultContent: {
      start: 0,
      end: 100,
      duration: 2000,
      suffix: '+',
    },
    defaultStyles: {
      fontSize: '3rem',
      fontWeight: '700',
      color: '#6C63FF',
      textAlign: 'center',
      marginBottom: 16,
    },
  },
  {
    type: 'progress',
    label: 'מד התקדמות',
    icon: 'Gauge',
    category: 'interactive',
    defaultContent: {
      value: 75,
      label: 'התקדמות',
      showPercentage: true,
    },
    defaultStyles: {
      marginBottom: 16,
    },
  },
  {
    type: 'social-icons',
    label: 'אייקוני רשתות',
    icon: 'Share2',
    category: 'interactive',
    defaultContent: {
      icons: [
        { platform: 'facebook', url: 'https://facebook.com' },
        { platform: 'instagram', url: 'https://instagram.com' },
        { platform: 'twitter', url: 'https://twitter.com' },
      ],
      style: 'rounded',
      size: 'medium',
    },
    defaultStyles: {
      textAlign: 'center',
      marginBottom: 16,
    },
  },
  {
    type: 'testimonial',
    label: 'המלצה',
    icon: 'Quote',
    category: 'interactive',
    defaultContent: {
      text: 'זו המלצה מעולה על המוצר או השירות!',
      author: 'שם הלקוח',
      role: 'תפקיד',
      rating: 5,
    },
    defaultStyles: {
      padding: 24,
      backgroundColor: '#f7fafc',
      borderRadius: 12,
      marginBottom: 16,
    },
  },

  // ============= LAYOUT =============
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
      borderTopWidth: 1,
      borderColor: '#e2e8f0',
      borderStyle: 'solid',
      marginTop: 16,
      marginBottom: 16,
    },
  },

  // ============= FORM =============
  {
    type: 'form',
    label: 'טופס',
    icon: 'FileText',
    category: 'form',
    defaultContent: {
      fields: [
        {
          id: '1',
          type: 'text',
          label: 'שם מלא',
          placeholder: 'הכנס שם...',
          required: true,
        },
        {
          id: '2',
          type: 'email',
          label: 'אימייל',
          placeholder: 'example@email.com',
          required: true,
        },
        {
          id: '3',
          type: 'tel',
          label: 'טלפון',
          placeholder: '050-1234567',
          required: false,
        },
        {
          id: '4',
          type: 'textarea',
          label: 'הודעה',
          placeholder: 'כתוב הודעה...',
          required: false,
        },
      ],
      submitText: 'שלח',
      successMessage: 'הטופס נשלח בהצלחה!',
    },
    defaultStyles: {
      maxWidth: '600px',
      marginBottom: 16,
    },
  },
]

export function getWidgetDefinition(type: WidgetType): WidgetDefinition | undefined {
  return WIDGET_DEFINITIONS.find((def) => def.type === type)
}

export function getWidgetsByCategory(category: WidgetDefinition['category']): WidgetDefinition[] {
  return WIDGET_DEFINITIONS.filter((def) => def.category === category)
}

